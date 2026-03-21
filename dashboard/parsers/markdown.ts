import { readFile } from "fs/promises";
import { join } from "path";

const ROOT = join(import.meta.dir, "..", "..");

async function readMd(relativePath: string): Promise<string | null> {
  try {
    return await readFile(join(ROOT, relativePath), "utf-8");
  } catch {
    return null;
  }
}

// ── Daily Brief ──

export interface DailyBrief {
  lastRun: string | null;
  jobsScanned: number | null;
  trackerUpdated: string | null;
  newJobs: { role: string; company: string; tier: string; fit: string; explanation: string; link: string }[];
  trackerUpdates: string[];
  top3: string[];
  raw: string;
}

export async function parseDailyBrief(): Promise<DailyBrief | null> {
  const md = await readMd("dispatch/daily-brief.md");
  if (!md) return null;

  const lastRunMatch = md.match(/\*\*last_run:\*\*\s*(.+)/);
  const scannedMatch = md.match(/\*\*jobs_scanned:\*\*\s*(\d+)/);
  const trackerMatch = md.match(/\*\*tracker_updated:\*\*\s*(.+)/);

  // Parse new jobs
  const newJobsSection = md.match(/## 🔥 New.*?\n([\s\S]*?)(?=\n## |$)/);
  const newJobs: DailyBrief["newJobs"] = [];
  if (newJobsSection) {
    const jobPattern = /- \*\*(.+?)\*\* at \*\*(.+?)\*\*\s*\((.+?)\)\s*—\s*Fit:\s*(.+?)\n\s*(.+?)\n\s*(https?:\/\/\S+)?/g;
    let m;
    while ((m = jobPattern.exec(newJobsSection[1])) !== null) {
      newJobs.push({ role: m[1], company: m[2], tier: m[3], fit: m[4].trim(), explanation: m[5].trim(), link: m[6] || "" });
    }
  }

  // Parse tracker updates
  const updatesSection = md.match(/## 📋 Tracker Updates\n([\s\S]*?)(?=\n## |$)/);
  const trackerUpdates: string[] = [];
  if (updatesSection) {
    for (const line of updatesSection[1].split("\n")) {
      const trimmed = line.replace(/^-\s*/, "").trim();
      if (trimmed) trackerUpdates.push(trimmed);
    }
  }

  // Parse top 3
  const top3Section = md.match(/## 📌 Top 3.*?\n([\s\S]*?)(?=\n## |$)/);
  const top3: string[] = [];
  if (top3Section) {
    for (const line of top3Section[1].split("\n")) {
      const trimmed = line.replace(/^\d+\.\s*/, "").trim();
      if (trimmed) top3.push(trimmed);
    }
  }

  return {
    lastRun: lastRunMatch?.[1]?.trim() || null,
    jobsScanned: scannedMatch ? parseInt(scannedMatch[1]) : null,
    trackerUpdated: trackerMatch?.[1]?.trim() || null,
    newJobs,
    trackerUpdates,
    top3,
    raw: md,
  };
}

// ── Job Tracker ──

export interface Job {
  rank: number;
  role: string;
  company: string;
  tier: string;
  location: string;
  posted: string;
  status: string;
  strategyFit: string;
  resumeFit: string;
  overallScore: string;
  applied: string;
  nextStep: string;
  link: string;
}

export interface JobTracker {
  lastUpdated: string | null;
  activeJobs: Job[];
  watchlist: { company: string; program: string; expected: string; start: string; likelihood: string; action: string }[];
  expired: { dateClosed: string; company: string; role: string; notes: string }[];
  applicationLog: { date: string; company: string; role: string; status: string; notes: string }[];
}

function parseStars(s: string): string {
  // Extract star rating or just return raw
  const starMatch = s.match(/(★+☆*)/);
  return starMatch ? starMatch[1] : s;
}

export async function parseJobTracker(): Promise<JobTracker | null> {
  const md = await readMd("Files/Job Tracker/job_tracker.md");
  if (!md) return null;

  const lastUpdatedMatch = md.match(/Last updated:\s*(.+)/i) || md.match(/\*\*Last updated:\*\*\s*(.+)/i);

  // Parse active jobs
  const activeJobs: Job[] = [];
  const jobBlockPattern = /### (\d+)\.\s*(.+?)\s*—\s*(.+?)\s*\((.+?)\)\s*\n([\s\S]*?)(?=\n### \d+\.|$)/g;

  // Get the active jobs section
  const activeSection = md.match(/## (?:Active Jobs|🎯 Active Jobs).*?\n([\s\S]*?)(?=\n## (?:Watchlist|Expired|Application)|$)/i);
  const searchText = activeSection ? activeSection[1] : md;

  let m;
  while ((m = jobBlockPattern.exec(searchText)) !== null) {
    const fields = m[5];
    const get = (label: string) => {
      const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`, "i");
      const match = fields.match(re);
      return match ? match[1].trim() : "";
    };
    activeJobs.push({
      rank: parseInt(m[1]),
      role: m[2].trim(),
      company: m[3].trim(),
      tier: m[4].trim(),
      location: get("Location"),
      posted: get("Posted"),
      status: get("Status"),
      strategyFit: get("Strategy Fit"),
      resumeFit: get("Resume Fit"),
      overallScore: get("Overall Score"),
      applied: get("Applied"),
      nextStep: get("Next step"),
      link: get("Link"),
    });
  }

  // Parse watchlist table
  const watchlist: JobTracker["watchlist"] = [];
  const watchSection = md.match(/## (?:📡 )?Watchlist.*?\n([\s\S]*?)(?=\n## |$)/i);
  if (watchSection) {
    const rows = watchSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
    for (const row of rows.slice(1)) { // skip header
      const cols = row.split("|").map(c => c.trim()).filter(Boolean);
      if (cols.length >= 6) {
        watchlist.push({ company: cols[0], program: cols[1], expected: cols[2], start: cols[3], likelihood: cols[4], action: cols[5] });
      }
    }
  }

  // Parse expired table
  const expired: JobTracker["expired"] = [];
  const expiredSection = md.match(/## (?:🗄️ )?Expired.*?\n([\s\S]*?)(?=\n## |$)/i);
  if (expiredSection) {
    const rows = expiredSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
    for (const row of rows.slice(1)) {
      const cols = row.split("|").map(c => c.trim()).filter(Boolean);
      if (cols.length >= 4) {
        expired.push({ dateClosed: cols[0], company: cols[1], role: cols[2], notes: cols[3] });
      }
    }
  }

  // Parse application log table
  const applicationLog: JobTracker["applicationLog"] = [];
  const appSection = md.match(/## (?:📝 )?Application Log.*?\n([\s\S]*?)(?=\n## |$)/i);
  if (appSection) {
    const rows = appSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
    for (const row of rows.slice(1)) {
      const cols = row.split("|").map(c => c.trim()).filter(Boolean);
      if (cols.length >= 5) {
        applicationLog.push({ date: cols[0], company: cols[1], role: cols[2], status: cols[3], notes: cols[4] });
      }
    }
  }

  return { lastUpdated: lastUpdatedMatch?.[1]?.trim() || null, activeJobs, watchlist, expired, applicationLog };
}

// ── Progress ──

export interface Progress {
  currentStreak: number;
  longestStreak: number;
  lastActive: string;
  thisWeekTasks: string;
  allTimeTasks: string;
  pillars: { pillar: string; level: number; blocks: string }[];
  hasData: boolean;
}

export async function parseProgress(): Promise<Progress | null> {
  const md = await readMd("memory/progress.md");
  if (!md) return null;

  const currentStreak = parseInt(md.match(/Current:\s*(\d+)/)?.[1] || "0");
  const longestStreak = parseInt(md.match(/Longest:\s*(\d+)/)?.[1] || "0");
  const lastActive = md.match(/Last active:\s*(.+)/)?.[1]?.trim() || "—";
  const thisWeekTasks = md.match(/This week:\s*(.+)/)?.[1]?.trim() || "0/0";
  const allTimeTasks = md.match(/All time:\s*(.+)/)?.[1]?.trim() || "0/0";

  // Parse pillar table
  const pillars: Progress["pillars"] = [];
  const pillarSection = md.match(/## Pillar Levels\n([\s\S]*?)(?=\n## |$)/);
  if (pillarSection) {
    const rows = pillarSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
    for (const row of rows.slice(1)) {
      const cols = row.split("|").map(c => c.trim()).filter(Boolean);
      if (cols.length >= 3) {
        pillars.push({ pillar: cols[0], level: parseInt(cols[1]) || 0, blocks: cols[2] });
      }
    }
  }

  const hasData = currentStreak > 0 || longestStreak > 0 || pillars.some(p => p.level > 0);

  return { currentStreak, longestStreak, lastActive, thisWeekTasks, allTimeTasks, pillars, hasData };
}

// ── Crash Course / Interview Context ──

export interface CrashCourse {
  active: boolean;
  company: string | null;
  role: string | null;
  interviewDate: string | null;
  daysRemaining: number | null;
  prepChecklist: { task: string; done: boolean }[];
  prepProgress: { week: string; focus: string; target: string; status: string }[];
}

export async function parseCrashCourse(): Promise<CrashCourse> {
  const md = await readMd("memory/interview-context.md");
  if (!md) return { active: false, company: null, role: null, interviewDate: null, daysRemaining: null, prepChecklist: [], prepProgress: [] };

  const statusMatch = md.match(/Status:\s*(.+)/i) || md.match(/\*\*Status:\*\*\s*(.+)/i);
  const status = statusMatch?.[1]?.trim().toLowerCase() || "";
  const isActive = status.includes("active") && !status.includes("inactive") && !status.includes("general");

  const companyMatch = md.match(/Target company:\s*(.+)/i) || md.match(/\*\*Target company:\*\*\s*(.+)/i);
  const roleMatch = md.match(/Target role:\s*(.+)/i) || md.match(/\*\*Target role:\*\*\s*(.+)/i);
  const dateMatch = md.match(/Interview date:\s*(.+)/i) || md.match(/\*\*Interview date:\*\*\s*(.+)/i);

  const company = companyMatch?.[1]?.trim() || null;
  const role = roleMatch?.[1]?.trim() || null;
  const interviewDateStr = dateMatch?.[1]?.trim() || null;

  let daysRemaining: number | null = null;
  if (interviewDateStr && interviewDateStr !== "—" && interviewDateStr.toLowerCase() !== "tbd") {
    const d = new Date(interviewDateStr);
    if (!isNaN(d.getTime())) {
      daysRemaining = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    }
  }

  // Parse prep checklist
  const prepChecklist: CrashCourse["prepChecklist"] = [];
  const checklistSection = md.match(/## Prep Checklist\n([\s\S]*?)(?=\n## |$)/);
  if (checklistSection) {
    for (const line of checklistSection[1].split("\n")) {
      const checkMatch = line.match(/- \[(x| )\]\s*(.+)/i);
      if (checkMatch) {
        prepChecklist.push({ task: checkMatch[2].trim(), done: checkMatch[1].toLowerCase() === "x" });
      }
    }
  }

  // Parse prep progress table
  const prepProgress: CrashCourse["prepProgress"] = [];
  const progressSection = md.match(/## Prep Progress\n([\s\S]*?)(?=\n## |$)/);
  if (progressSection) {
    const rows = progressSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
    for (const row of rows.slice(1)) {
      const cols = row.split("|").map(c => c.trim()).filter(Boolean);
      if (cols.length >= 4) {
        prepProgress.push({ week: cols[0], focus: cols[1], target: cols[2], status: cols[3] });
      }
    }
  }

  return { active: isActive, company, role, interviewDate: interviewDateStr, daysRemaining, prepChecklist, prepProgress };
}

// ── Interview Panel ──

export interface InterviewPanel {
  active: boolean;
  planType: string;
  company: string | null;
  role: string | null;
  interviewDate: string | null;
  daysRemaining: number | null;
  readinessTier: string;
  skillRequirements: { skill: string; jdPriority: string; currentLevel: string; gap: string }[];
  prepChecklist: { task: string; done: boolean }[];
  mockCount: number;
  winCount: number;
  questionTypeCoverage: { type: string; covered: boolean; wins: number }[];
}

export async function parseInterviewPanel(): Promise<InterviewPanel> {
  const inactive: InterviewPanel = {
    active: false, planType: "learning", company: null, role: null,
    interviewDate: null, daysRemaining: null, readinessTier: "N/A",
    skillRequirements: [], prepChecklist: [], mockCount: 0, winCount: 0,
    questionTypeCoverage: [],
  };

  // Get plan type
  const planMd = await readMd("memory/current-plan.md");
  const planTypeMatch = planMd?.match(/Plan type:\s*(.+)/i);
  const planType = planTypeMatch?.[1]?.trim() || "learning";

  // Get interview context — read BEFORE the plan type gate so we can check Status
  const ctxMd = await readMd("memory/interview-context.md");

  // Show panel if plan type is job_search/interview_prep, OR if interview-context has active status
  const statusMatch = ctxMd?.match(/\*\*Status:\*\*\s*(.+)/i) || ctxMd?.match(/Status:\s*(.+)/i);
  const status = statusMatch?.[1]?.trim().toLowerCase() || "";
  const hasActivePrep = status.includes("active");

  if (planType === "learning" && !hasActivePrep) return inactive;
  const companyMatch = ctxMd?.match(/\*\*Target company:\*\*\s*(.+)/i) || ctxMd?.match(/Target company:\s*(.+)/i);
  const roleMatch = ctxMd?.match(/\*\*Target role:\*\*\s*(.+)/i) || ctxMd?.match(/Target role:\s*(.+)/i);
  const dateMatch = ctxMd?.match(/\*\*Interview date:\*\*\s*(.+)/i) || ctxMd?.match(/Interview date:\s*(.+)/i);

  const company = companyMatch?.[1]?.trim() || null;
  const role = roleMatch?.[1]?.trim() || null;
  const interviewDateStr = dateMatch?.[1]?.trim() || null;

  let daysRemaining: number | null = null;
  if (interviewDateStr && interviewDateStr !== "—" && interviewDateStr.toLowerCase() !== "tbd") {
    const d = new Date(interviewDateStr);
    if (!isNaN(d.getTime())) {
      daysRemaining = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    }
  }

  // Parse skill requirements table
  const skillRequirements: InterviewPanel["skillRequirements"] = [];
  if (ctxMd) {
    const reqSection = ctxMd.match(/## Skill Requirements\n([\s\S]*?)(?=\n## |$)/);
    if (reqSection) {
      const rows = reqSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
      for (const row of rows.slice(1)) {
        const cols = row.split("|").map(c => c.trim()).filter(Boolean);
        if (cols.length >= 4) {
          skillRequirements.push({ skill: cols[0], jdPriority: cols[1], currentLevel: cols[2], gap: cols[3] });
        }
      }
    }
  }

  // Parse prep checklist
  const prepChecklist: InterviewPanel["prepChecklist"] = [];
  if (ctxMd) {
    const checklistSection = ctxMd.match(/## Prep Checklist\n([\s\S]*?)(?=\n## |$)/);
    if (checklistSection) {
      for (const line of checklistSection[1].split("\n")) {
        const checkMatch = line.match(/- \[(x| )\]\s*(.+)/i);
        if (checkMatch) {
          prepChecklist.push({ task: checkMatch[2].trim(), done: checkMatch[1].toLowerCase() === "x" });
        }
      }
    }
  }

  // Count wins (headings that have **S:** in their content block)
  const winsMd = await readMd("memory/win-log/wins.md");
  let winCount = 0;
  if (winsMd) {
    const winBlocks = winsMd.split(/\n## /).slice(1);
    for (const block of winBlocks) {
      if (block.includes("**S:**")) winCount++;
    }
  }

  // Count mocks from mistake-journal (## YYYY-MM-DD headings)
  const mistakeMd = await readMd("memory/mistake-journal.md");
  let mockCount = 0;
  if (mistakeMd) {
    const mockMatches = mistakeMd.match(/^## \d{4}-\d{2}-\d{2}/gm);
    mockCount = mockMatches?.length || 0;
  }

  // Parse interview mapping for question type coverage
  const questionTypes = ["Leadership", "Technical", "Failure", "Collaboration", "Problem-Solving", "Growth"];
  const mappingMd = await readMd("memory/win-log/interview-mapping.md");
  const questionTypeCoverage: InterviewPanel["questionTypeCoverage"] = [];
  for (const qt of questionTypes) {
    let covered = false;
    let wins = 0;
    if (mappingMd) {
      const typeSection = mappingMd.match(new RegExp(`## ${qt}[\\s\\S]*?(?=\\n## |$)`, "i"));
      if (typeSection) {
        const entries = typeSection[0].match(/^- /gm);
        wins = entries?.length || 0;
        covered = wins > 0;
      }
    }
    questionTypeCoverage.push({ type: qt, covered, wins });
  }

  // Calculate readiness tier (guideline-based, not rigid formula)
  const checklistDone = prepChecklist.filter(t => t.done).length;
  const checklistTotal = prepChecklist.length;
  const largeGaps = skillRequirements.filter(r => r.gap.toLowerCase().includes("large")).length;
  const coveredTypes = questionTypeCoverage.filter(q => q.covered).length;

  let readinessTier = "Unprepared";
  if (winCount >= 5 && mockCount >= 2 && largeGaps === 0 && coveredTypes >= 4) {
    readinessTier = "Ready";
  } else if (winCount >= 3 && mockCount >= 1 && largeGaps <= 1) {
    readinessTier = "Almost There";
  } else if (winCount >= 1 || mockCount >= 1 || checklistDone >= 2) {
    readinessTier = "Partially Ready";
  }

  return {
    active: true, planType, company, role, interviewDate: interviewDateStr,
    daysRemaining, readinessTier, skillRequirements, prepChecklist,
    mockCount, winCount, questionTypeCoverage,
  };
}

// ── Per-Job Prep Briefing ──

export interface CompanyBriefing {
  company: string;
  expectations: string[];
  bestStories: { title: string; questionType: string }[];
  weakSpots: string[];
  realQuestions: { question: string; type: string }[];
  researchDone: { item: string; status: string }[];
}

export interface PrepBriefing {
  companies: CompanyBriefing[];
  topMistakePatterns: string[];
  gapAnalysis: string[];
  strugglingConcepts: string[];
}

export async function parsePrepBriefing(): Promise<PrepBriefing> {
  const empty: PrepBriefing = { companies: [], topMistakePatterns: [], gapAnalysis: [], strugglingConcepts: [] };

  const ctxMd = await readMd("memory/interview-context.md");
  if (!ctxMd) return empty;

  // Parse per-company expectations from "## Company-Specific Expectations"
  const companies: CompanyBriefing[] = [];
  const companySection = ctxMd.match(/## Company-Specific Expectations\n([\s\S]*?)(?=\n## [^#]|$)/);
  if (companySection) {
    const companyBlocks = companySection[1].split(/\n### /).slice(1);
    for (const block of companyBlocks) {
      const lines = block.split("\n");
      const companyName = lines[0].replace(/\s*—.*/, "").trim();
      const expectations = lines.slice(1)
        .map(l => l.replace(/^- /, "").trim())
        .filter(l => l.length > 0);

      companies.push({
        company: companyName,
        expectations,
        bestStories: [],
        weakSpots: [],
        realQuestions: [],
        researchDone: [],
      });
    }
  }

  // Parse company research sections
  const researchSection = ctxMd.match(/## Company Research\n([\s\S]*?)(?=\n## [^#]|$)/);
  if (researchSection) {
    const researchBlocks = researchSection[1].split(/\n### /).slice(1);
    for (const block of researchBlocks) {
      const lines = block.split("\n");
      const companyName = lines[0].trim();
      const company = companies.find(c => c.company.toLowerCase().startsWith(companyName.toLowerCase()));
      if (company) {
        for (const line of lines.slice(1)) {
          const itemMatch = line.match(/- \*\*(.+?):\*\*\s*\[(.+?)\]/);
          if (itemMatch) {
            company.researchDone.push({ item: itemMatch[1], status: itemMatch[2] });
          }
        }
      }
    }
  }

  // Match best stories per company from interview-mapping
  const mappingMd = await readMd("memory/win-log/interview-mapping.md");
  if (mappingMd) {
    const questionTypes = ["Leadership", "Technical", "Failure", "Collaboration", "Initiative", "Conflict Resolution"];
    for (const qt of questionTypes) {
      const section = mappingMd.match(new RegExp(`## ${qt}[\\s\\S]*?(?=\\n## |$)`, "i"));
      if (section) {
        const entries = section[0].match(/^- \*\*(.+?)\*\*/gm);
        if (entries) {
          for (const entry of entries) {
            const titleMatch = entry.match(/\*\*(.+?)\*\*/);
            if (titleMatch) {
              // Add to all companies — these are universal stories
              for (const company of companies) {
                company.bestStories.push({ title: titleMatch[1], questionType: qt });
              }
            }
          }
        }
      }
    }
  }

  // Parse gap analysis from interview-mapping
  const gapAnalysis: string[] = [];
  if (mappingMd) {
    const gapSection = mappingMd.match(/## Gap Analysis\n([\s\S]*?)(?=\n## |$)/);
    if (gapSection) {
      for (const line of gapSection[1].split("\n")) {
        const trimmed = line.replace(/^- /, "").trim();
        if (trimmed.length > 0 && !trimmed.startsWith("<!--")) {
          gapAnalysis.push(trimmed);
        }
      }
    }
  }

  // Parse mistake patterns from mistake-journal
  const topMistakePatterns: string[] = [];
  const mistakeMd = await readMd("memory/mistake-journal.md");
  if (mistakeMd) {
    // Find recurring patterns (entries with "recurring" in Pattern field)
    const patternMatches = mistakeMd.match(/\*\*What would've been better:\*\*\s*(.+)/g);
    if (patternMatches) {
      for (const p of patternMatches.slice(0, 5)) {
        const cleaned = p.replace(/\*\*What would've been better:\*\*\s*/, "").trim();
        topMistakePatterns.push(cleaned);
      }
    }
    // Also check for Category patterns
    const categoryMatches = mistakeMd.match(/\*\*Category:\*\*\s*(.+)/g);
    if (categoryMatches && topMistakePatterns.length === 0) {
      const counts: Record<string, number> = {};
      for (const c of categoryMatches) {
        const cat = c.replace(/\*\*Category:\*\*\s*/, "").trim();
        counts[cat] = (counts[cat] || 0) + 1;
      }
      for (const [cat, count] of Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3)) {
        topMistakePatterns.push(`${cat} (${count}x)`);
      }
    }
  }

  // Parse real interview questions per company
  const realQMd = await readMd("memory/real-interview-questions.md");
  if (realQMd) {
    const qBlocks = realQMd.split(/\n## /).slice(1);
    for (const block of qBlocks) {
      const headerLine = block.split("\n")[0];
      const companyMatch = headerLine.match(/^(.+?)\s*—/);
      if (companyMatch) {
        const companyName = companyMatch[1].trim();
        const company = companies.find(c => c.company.toLowerCase().startsWith(companyName.toLowerCase()));
        if (company) {
          let currentType = "";
          for (const line of block.split("\n").slice(1)) {
            if (line.startsWith("### ")) {
              currentType = line.replace("### ", "").trim();
            } else if (line.startsWith("- ")) {
              company.realQuestions.push({ question: line.replace("- ", "").trim(), type: currentType });
            }
          }
        }
      }
    }
  }

  // Parse struggling concepts from SRS
  const strugglingConcepts: string[] = [];
  const srsMd = await readMd("memory/spaced-repetition.md");
  if (srsMd) {
    const activeSection = srsMd.match(/## Active Review Items\n([\s\S]*?)(?=\n## |$)/);
    if (activeSection) {
      const rows = activeSection[1].split("\n").filter(r => r.includes("|") && !r.match(/^[\s|:-]+$/));
      for (const row of rows.slice(1)) {
        const cols = row.split("|").map(c => c.trim()).filter(Boolean);
        if (cols.length >= 5) {
          const concept = cols[0];
          const consecutiveCorrect = parseInt(cols[4]) || 0;
          if (concept && consecutiveCorrect === 0) {
            strugglingConcepts.push(concept);
          }
        }
      }
    }
  }

  return { companies, topMistakePatterns, gapAnalysis, strugglingConcepts };
}

// ── User Profile ──

export interface UserProfile {
  name: string;
  role: string;
  dreamCareer: string;
}

export async function parseUserProfile(): Promise<UserProfile | null> {
  const md = await readMd("memory/user-profile.md");
  if (!md) return null;

  const nameMatch = md.match(/(?:\*\*)?Name:(?:\*\*)?\s*(.+)/i);
  const roleMatch = md.match(/(?:\*\*)?Current role:(?:\*\*)?\s*(.+)/i);
  const dreamMatch = md.match(/(?:\*\*)?Target role:(?:\*\*)?\s*(.+)/i);

  return {
    name: nameMatch?.[1]?.trim() || "User",
    role: roleMatch?.[1]?.trim() || "",
    dreamCareer: dreamMatch?.[1]?.trim() || "",
  };
}

// ── Config ──

export interface Config {
  scanTime: string;
  timezone: string;
  telegramBriefTime: string;
}

export async function parseConfig(): Promise<Config | null> {
  try {
    const raw = await readFile(join(ROOT, "dispatch/config.json"), "utf-8");
    const data = JSON.parse(raw);
    return {
      scanTime: data.scan_time || "05:00",
      timezone: data.timezone || "Europe/Amsterdam",
      telegramBriefTime: data.telegram_brief_time || "07:30",
    };
  } catch {
    return null;
  }
}

// ── Aggregated Stats ──

export interface Stats {
  totalActiveJobs: number;
  totalExpired: number;
  appliedCount: number;
  responseCount: number;
  responseRate: string;
  actNowCount: number;
}

export async function parseStats(): Promise<Stats> {
  const tracker = await parseJobTracker();
  if (!tracker) return { totalActiveJobs: 0, totalExpired: 0, appliedCount: 0, responseCount: 0, responseRate: "—", actNowCount: 0 };

  const totalActiveJobs = tracker.activeJobs.length;
  const totalExpired = tracker.expired.length;

  const appliedJobs = tracker.activeJobs.filter(j => j.applied.toLowerCase().startsWith("yes"));
  const appliedFromLog = tracker.applicationLog.length;
  const appliedCount = Math.max(appliedJobs.length, appliedFromLog);

  const responseCount = tracker.applicationLog.filter(a => {
    const s = a.status.toLowerCase();
    return s.includes("interview") || s.includes("response") || s.includes("offer") || s.includes("rejected");
  }).length;

  const responseRate = appliedCount > 0 ? `${Math.round((responseCount / appliedCount) * 100)}%` : "—";

  // Act now = high fit (score >= 7) + not yet applied
  const actNowCount = tracker.activeJobs.filter(j => {
    const score = parseFloat(j.overallScore);
    const notApplied = !j.applied.toLowerCase().startsWith("yes");
    return score >= 7 && notApplied;
  }).length;

  return { totalActiveJobs, totalExpired, appliedCount, responseCount, responseRate, actNowCount };
}
