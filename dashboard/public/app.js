const $ = (sel) => document.querySelector(sel);
const REFRESH_INTERVAL = 60_000;

async function fetchJSON(endpoint) {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function isStale(lastRun) {
  if (!lastRun) return true;
  const d = new Date(lastRun);
  if (isNaN(d.getTime())) return true;
  const now = new Date();
  return d.toDateString() !== now.toDateString();
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

// ── Render functions ──

async function renderHeader() {
  const profile = await fetchJSON("/api/profile");
  const name = profile?.name || "User";
  $("#header-name").textContent = `ProngAgent — ${name}`;
  $("#last-refresh").textContent = new Date().toLocaleTimeString();
}

async function renderBrief() {
  const brief = await fetchJSON("/api/brief");
  const el = $("#brief-content");

  if (!brief || brief.error) {
    el.innerHTML = '<p class="empty">No daily brief found.</p>';
    return;
  }

  let html = "";

  // Staleness warning
  if (isStale(brief.lastRun)) {
    html += `<div class="warning-banner">Brief is stale — last run: ${escapeHtml(brief.lastRun || "unknown")}</div>`;
  }

  // Meta line
  html += `<p style="color:#8899aa;font-size:0.85rem;margin-bottom:16px">
    Last run: <span class="mono">${escapeHtml(brief.lastRun || "—")}</span>
    &nbsp;|&nbsp; Jobs scanned: <span class="mono">${brief.jobsScanned ?? "—"}</span>
    &nbsp;|&nbsp; Tracker updated: <span class="mono">${escapeHtml(brief.trackerUpdated || "—")}</span>
  </p>`;

  // Top 3
  if (brief.top3.length > 0) {
    html += '<h3 style="color:#e2b714;margin-bottom:8px">Top 3 — Act on These</h3>';
    html += '<ol class="top3-list">';
    for (const item of brief.top3) {
      html += `<li>${escapeHtml(item)}</li>`;
    }
    html += "</ol>";
  }

  // New jobs
  if (brief.newJobs.length > 0) {
    html += '<h3 style="color:#eee;margin:16px 0 8px">New (posted &lt;48h)</h3>';
    for (const job of brief.newJobs) {
      html += `<div class="new-job">
        <span class="title">${escapeHtml(job.role)}</span> at
        <span class="company">${escapeHtml(job.company)}</span>
        (${escapeHtml(job.tier)}) —
        <span class="fit">Fit: ${escapeHtml(job.fit)}</span>
        <div class="explanation">${escapeHtml(job.explanation)}</div>
      </div>`;
    }
  }

  // Tracker updates
  if (brief.trackerUpdates.length > 0) {
    html += '<h3 style="color:#eee;margin:16px 0 8px">Tracker Updates</h3>';
    html += '<ul class="tracker-updates">';
    for (const u of brief.trackerUpdates) {
      html += `<li>${escapeHtml(u)}</li>`;
    }
    html += "</ul>";
  }

  el.innerHTML = html;
}

async function renderJobs() {
  const jobs = await fetchJSON("/api/jobs");
  const stats = await fetchJSON("/api/stats");
  const el = $("#jobs-content");

  if (!jobs || jobs.error || jobs.activeJobs.length === 0) {
    el.innerHTML = '<p class="empty">No active jobs tracked.</p>';
    return;
  }

  let html = "";

  // Summary
  if (stats) {
    html += `<p class="job-summary">
      <span class="active">${stats.totalActiveJobs} active</span>,
      <span class="applied-count">${stats.appliedCount} applied</span>,
      <span class="act-now-count">${stats.actNowCount} act now</span>
    </p>`;
  }

  // Table
  html += `<div style="overflow-x:auto"><table class="job-table">
    <thead><tr>
      <th>#</th><th>Role</th><th>Company</th><th>Tier</th><th>Score</th><th>Posted</th><th>Status</th><th>Applied</th><th>Next Step</th>
    </tr></thead><tbody>`;

  for (const j of jobs.activeJobs) {
    const score = parseFloat(j.overallScore) || 0;
    const isApplied = j.applied.toLowerCase().startsWith("yes");
    const isActNow = score >= 7 && !isApplied;
    const rowClass = isApplied ? "applied" : isActNow ? "act-now" : "lower";

    html += `<tr class="${rowClass}">
      <td>${j.rank}</td>
      <td>${j.link ? `<a href="${escapeHtml(j.link)}" target="_blank">${escapeHtml(j.role)}</a>` : escapeHtml(j.role)}</td>
      <td>${escapeHtml(j.company)}</td>
      <td>${escapeHtml(j.tier)}</td>
      <td class="score">${escapeHtml(j.overallScore)}</td>
      <td>${escapeHtml(j.posted)}</td>
      <td>${escapeHtml(j.status)}</td>
      <td>${escapeHtml(j.applied)}</td>
      <td>${escapeHtml(j.nextStep)}</td>
    </tr>`;
  }

  html += "</tbody></table></div>";

  // Watchlist
  if (jobs.watchlist.length > 0) {
    html += '<h3 style="color:#eee;margin:20px 0 8px">Watchlist</h3>';
    html += `<div style="overflow-x:auto"><table class="job-table">
      <thead><tr><th>Company</th><th>Program</th><th>Expected</th><th>Start</th><th>Likelihood</th><th>Action</th></tr></thead><tbody>`;
    for (const w of jobs.watchlist) {
      html += `<tr><td>${escapeHtml(w.company)}</td><td>${escapeHtml(w.program)}</td><td>${escapeHtml(w.expected)}</td><td>${escapeHtml(w.start)}</td><td>${escapeHtml(w.likelihood)}</td><td>${escapeHtml(w.action)}</td></tr>`;
    }
    html += "</tbody></table></div>";
  }

  el.innerHTML = html;
}

async function renderProgress() {
  const data = await fetchJSON("/api/progress");
  const section = $("#progress-section");
  const el = $("#progress-content");

  if (!data || data.error || !data.hasData) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  let html = `<div class="progress-stats">
    <div><div class="stat-value">${data.currentStreak}</div><div class="stat-label">Day Streak</div></div>
    <div><div class="stat-value">${data.longestStreak}</div><div class="stat-label">Longest</div></div>
    <div><div class="stat-value">${escapeHtml(data.thisWeekTasks)}</div><div class="stat-label">This Week</div></div>
    <div><div class="stat-value">${escapeHtml(data.allTimeTasks)}</div><div class="stat-label">All Time</div></div>
    <div><div class="stat-value">${escapeHtml(data.lastActive)}</div><div class="stat-label">Last Active</div></div>
  </div>`;

  if (data.pillars.length > 0) {
    for (const p of data.pillars) {
      const pct = Math.min((p.level / 5) * 100, 100);
      html += `<div class="pillar-row">
        <div class="pillar-name">${escapeHtml(p.pillar)}</div>
        <div class="pillar-bar-bg"><div class="pillar-bar-fill" style="width:${pct}%"></div></div>
        <div class="pillar-level">${p.level}/5</div>
      </div>`;
    }
  }

  el.innerHTML = html;
}

async function renderCrashCourse() {
  const data = await fetchJSON("/api/crash-course");
  const section = $("#crash-section");

  if (!data || !data.active) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  const el = $("#crash-content");

  let html = "";

  if (data.daysRemaining !== null) {
    html += `<div class="countdown">${data.daysRemaining} days remaining</div>`;
  }

  html += `<div class="crash-meta">
    <strong>${escapeHtml(data.company || "—")}</strong> — ${escapeHtml(data.role || "—")}
    ${data.interviewDate ? `<br>Interview: ${escapeHtml(data.interviewDate)}` : ""}
  </div>`;

  if (data.prepChecklist.length > 0) {
    const done = data.prepChecklist.filter(t => t.done).length;
    html += `<p style="color:#8899aa;font-size:0.85rem;margin-bottom:8px">${done}/${data.prepChecklist.length} complete</p>`;
    html += '<ul class="checklist">';
    for (const t of data.prepChecklist) {
      html += `<li class="${t.done ? "done" : "pending"}">${escapeHtml(t.task)}</li>`;
    }
    html += "</ul>";
  }

  el.innerHTML = html;
}

async function renderInterview() {
  const data = await fetchJSON("/api/interview");
  const section = $("#interview-section");

  if (!data || !data.active) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  const el = $("#interview-content");

  const tierColors = { "Ready": "#4ecca3", "Almost There": "#e2b714", "Partially Ready": "#e8834a", "Unprepared": "#e74c3c", "N/A": "#8899aa" };
  const tierColor = tierColors[data.readinessTier] || "#8899aa";

  let html = "";

  // Mode label
  const modeLabels = { "interview_prep": "Interview Prep", "job_search": "Job Search", "learning": "General Prep" };
  const modeLabel = modeLabels[data.planType] || "General Prep";
  html += `<p style="color:#8899aa;font-size:0.85rem;margin-bottom:12px">${modeLabel} mode active</p>`;

  // Readiness badge + countdown
  html += '<div style="display:flex;align-items:center;gap:20px;margin-bottom:16px">';
  html += `<div class="readiness-badge" style="background:${tierColor}22;border:1px solid ${tierColor};color:${tierColor}">${escapeHtml(data.readinessTier)}</div>`;
  if (data.daysRemaining !== null) {
    html += `<div class="countdown">${data.daysRemaining} days</div>`;
  }
  html += '</div>';

  // Company/role
  if (data.company || data.role) {
    html += `<div class="crash-meta"><strong>${escapeHtml(data.company || "—")}</strong> — ${escapeHtml(data.role || "—")}`;
    if (data.interviewDate) html += `<br>Interview: ${escapeHtml(data.interviewDate)}`;
    html += '</div>';
  }

  // Skill requirements table
  if (data.skillRequirements.length > 0) {
    html += '<h3 style="color:#eee;margin:16px 0 8px;font-size:0.95rem">Skill Requirements</h3>';
    html += '<div style="overflow-x:auto"><table class="job-table"><thead><tr><th>Skill</th><th>Priority</th><th>Level</th><th>Gap</th></tr></thead><tbody>';
    for (const r of data.skillRequirements) {
      const gapLower = r.gap.toLowerCase();
      const gapClass = gapLower.includes("none") ? "applied" : gapLower.includes("small") ? "act-now" : "lower";
      html += `<tr class="${gapClass}"><td>${escapeHtml(r.skill)}</td><td>${escapeHtml(r.jdPriority)}</td><td>${escapeHtml(r.currentLevel)}</td><td>${escapeHtml(r.gap)}</td></tr>`;
    }
    html += '</tbody></table></div>';
  }

  // Prep checklist
  if (data.prepChecklist.length > 0) {
    const done = data.prepChecklist.filter(t => t.done).length;
    const pct = Math.round((done / data.prepChecklist.length) * 100);
    html += `<h3 style="color:#eee;margin:16px 0 8px;font-size:0.95rem">Prep Checklist — ${done}/${data.prepChecklist.length} (${pct}%)</h3>`;
    html += `<div class="pillar-bar-bg" style="height:8px;margin-bottom:8px"><div class="pillar-bar-fill" style="width:${pct}%"></div></div>`;
    html += '<ul class="checklist">';
    for (const t of data.prepChecklist) {
      html += `<li class="${t.done ? "done" : "pending"}">${escapeHtml(t.task)}</li>`;
    }
    html += '</ul>';
  }

  // Mocks + Wins + Coverage
  html += '<div style="display:flex;gap:32px;margin-top:16px;flex-wrap:wrap">';
  html += `<div><div class="stat-value">${data.mockCount}</div><div class="stat-label">Mocks</div></div>`;
  html += `<div><div class="stat-value">${data.winCount}</div><div class="stat-label">Wins</div></div>`;
  html += '</div>';

  // Question type coverage grid
  if (data.questionTypeCoverage.length > 0) {
    html += '<h3 style="color:#eee;margin:16px 0 8px;font-size:0.95rem">Question Type Coverage</h3>';
    html += '<div class="coverage-grid">';
    for (const q of data.questionTypeCoverage) {
      const color = q.covered ? "#4ecca3" : "#556677";
      html += `<div class="coverage-item" style="border-color:${color}"><span class="coverage-dot" style="background:${color}"></span>${escapeHtml(q.type)} <span class="coverage-count">${q.wins}</span></div>`;
    }
    html += '</div>';
  }

  el.innerHTML = html;
}

async function renderPrepBriefing() {
  const data = await fetchJSON("/api/prep-briefing");
  const section = $("#briefing-section");

  if (!data || (data.companies.length === 0 && data.topMistakePatterns.length === 0 && data.gapAnalysis.length === 0)) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  const el = $("#briefing-content");
  let html = "";

  // Per-company cards
  for (const c of data.companies) {
    html += `<div class="company-briefing">`;
    html += `<h3 class="company-name">${escapeHtml(c.company)}</h3>`;

    // What they test
    if (c.expectations.length > 0) {
      html += '<div class="briefing-block"><span class="briefing-label">What they test</span><ul>';
      for (const e of c.expectations) {
        html += `<li>${escapeHtml(e)}</li>`;
      }
      html += '</ul></div>';
    }

    // Real questions asked (if any)
    if (c.realQuestions.length > 0) {
      html += '<div class="briefing-block"><span class="briefing-label">Questions they\'ve asked before</span><ul>';
      for (const q of c.realQuestions) {
        html += `<li><span style="color:#8899aa">[${escapeHtml(q.type)}]</span> ${escapeHtml(q.question)}</li>`;
      }
      html += '</ul></div>';
    }

    // Research status
    if (c.researchDone.length > 0) {
      html += '<div class="briefing-block"><span class="briefing-label">Research</span><ul>';
      for (const r of c.researchDone) {
        const color = r.status.toLowerCase().includes("found") || r.status.toLowerCase().includes("done") ? "#4ecca3" : "#e2b714";
        html += `<li>${escapeHtml(r.item)}: <span style="color:${color}">${escapeHtml(r.status)}</span></li>`;
      }
      html += '</ul></div>';
    }

    html += '</div>';
  }

  // Cross-company sections
  // Best stories (deduplicated)
  if (data.companies.length > 0 && data.companies[0].bestStories.length > 0) {
    const seen = new Set();
    html += '<div class="briefing-block"><span class="briefing-label">Your strongest stories</span><ul>';
    for (const s of data.companies[0].bestStories) {
      if (!seen.has(s.title)) {
        seen.add(s.title);
        html += `<li><span style="color:#4ecca3">[${escapeHtml(s.questionType)}]</span> ${escapeHtml(s.title)}</li>`;
      }
    }
    html += '</ul></div>';
  }

  // Gap analysis
  if (data.gapAnalysis.length > 0) {
    html += '<div class="briefing-block"><span class="briefing-label">Gaps to fill</span><ul>';
    for (const g of data.gapAnalysis) {
      html += `<li style="color:#e8834a">${escapeHtml(g)}</li>`;
    }
    html += '</ul></div>';
  }

  // Top mistake patterns from mocks
  if (data.topMistakePatterns.length > 0) {
    html += '<div class="briefing-block"><span class="briefing-label">Watch out for (from mocks)</span><ul>';
    for (const m of data.topMistakePatterns) {
      html += `<li style="color:#e74c3c">${escapeHtml(m)}</li>`;
    }
    html += '</ul></div>';
  }

  // Struggling concepts
  if (data.strugglingConcepts.length > 0) {
    html += '<div class="briefing-block"><span class="briefing-label">Concepts that aren\'t sticking</span><ul>';
    for (const s of data.strugglingConcepts) {
      html += `<li style="color:#e2b714">${escapeHtml(s)}</li>`;
    }
    html += '</ul></div>';
  }

  el.innerHTML = html;
}

async function renderFooterStats() {
  const stats = await fetchJSON("/api/stats");
  const el = $("#footer-stats");

  if (!stats) {
    el.innerHTML = '<p class="empty">No stats available.</p>';
    return;
  }

  el.innerHTML = `<div class="footer-stats">
    <div class="footer-stat"><div class="val">${stats.totalActiveJobs}</div><div class="label">Active Jobs</div></div>
    <div class="footer-stat"><div class="val">${stats.totalExpired}</div><div class="label">Expired</div></div>
    <div class="footer-stat"><div class="val">${stats.appliedCount}</div><div class="label">Applied</div></div>
    <div class="footer-stat"><div class="val">${stats.responseRate}</div><div class="label">Response Rate</div></div>
  </div>`;
}

// ── Main ──

async function refresh() {
  await Promise.all([
    renderHeader(),
    renderBrief(),
    renderJobs(),
    renderProgress(),
    renderCrashCourse(),
    renderInterview(),
    renderPrepBriefing(),
    renderFooterStats(),
  ]);
  $("#last-refresh").textContent = new Date().toLocaleTimeString();
}

refresh();
setInterval(refresh, REFRESH_INTERVAL);
