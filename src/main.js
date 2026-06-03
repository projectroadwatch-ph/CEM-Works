const icon = (name) => `<span class="ico" aria-hidden="true">${name}</span>`;
const ribbonTabs = ['File', 'Edit', 'View', 'Project', 'Activities', 'Relationships', 'Schedule', 'Resources', 'Cost', 'Reports', 'Tools', 'Help'];
const ribbonGroups = [
  ['Project', [['▣', 'New Project'], ['▤', 'Open Project'], ['▣', 'Save Project'], ['⇩', 'Export Project']]],
  ['Activities', [['＋', 'New Activity'], ['×', 'Delete Activity'], ['⧉', 'Copy Activity'], ['▥', 'Paste Activity'], ['⇥', 'Indent'], ['⇤', 'Outdent']]],
  ['Relationships', [['🔗', 'Link Activities'], ['⛓', 'Unlink Activities'], ['↦', 'Add Lag'], ['↤', 'Add Lead']]],
  ['Schedule', [['∑', 'Calculate Schedule'], ['↻', 'Update Progress'], ['▰', 'Save Baseline'], ['▱', 'Compare Baseline']]],
  ['Resources', [['☷', 'Assign Resource'], ['▥', 'Resource Usage'], ['▤', 'Resource Histogram']]],
  ['View', [['▦', 'Gantt Chart'], ['⌕', 'Filters'], ['☰', 'Group By'], ['⎙', 'Print']]],
];
const sidebarSections = [
  ['Projects', ['Project Selection', 'Recent Projects']],
  ['Scheduling', ['Activities', 'WBS', 'Relationships', 'Calendars', 'Milestones', 'Baselines']],
  ['Resources', ['Resources', 'Resource Assignments', 'Resource Usage']],
  ['Cost Management', ['Cost Loading', 'Cost Tracking', 'Earned Value', 'S-Curve']],
  ['Analysis', ['Critical Path', 'Delay Analysis', 'Schedule Comparison']],
  ['Reports', ['Schedule Reports', 'Cost Reports', 'Progress Reports']],
  ['Administration', ['Users', 'Roles & Permissions', 'Settings']],
];
const activities = [
  [1, 'CT-001', 'Metro Medical Center Expansion', '0', 0, 408, '01-Jan-2026', '12-Feb-2027', '01-Jan-2026', '', 232, 43, 0, 0, 'In Progress', 'Level of Effort', 48200000, 18840000, true, false, 'Program', 4, 92, 1, 3, 88],
  [2, '1.0', 'Pre-Construction', '1.0', 1, 42, '01-Jan-2026', '11-Feb-2026', '01-Jan-2026', '09-Feb-2026', 0, 100, 3, 2, 'Completed', 'Task Dependent', 890000, 845000, true, false, 'Pre-Construction', 5, 14, 2, 5, 15],
  [3, 'A1000', 'Notice to Proceed', '1.0', 2, 0, '01-Jan-2026', '01-Jan-2026', '01-Jan-2026', '01-Jan-2026', 0, 100, 0, 0, 'Completed', 'Start Milestone', 0, 0, false, true, 'Pre-Construction', 5, 1, 3, 5, 1],
  [4, 'A1010', 'Project Management Plan', '1.0', 2, 12, '02-Jan-2026', '13-Jan-2026', '02-Jan-2026', '12-Jan-2026', 0, 100, 4, 2, 'Completed', 'Task Dependent', 120000, 116000, false, false, 'Pre-Construction', 7, 10, 4, 7, 10],
  [5, 'A1020', 'Permits & Authority Approvals', '1.0', 2, 27, '14-Jan-2026', '10-Feb-2026', '14-Jan-2026', '09-Feb-2026', 0, 100, 2, 1, 'Completed', 'Task Dependent', 330000, 312000, false, false, 'Pre-Construction', 12, 16, 5, 11, 18],
  [6, '2.0', 'Site Preparation', '2.0', 1, 58, '12-Feb-2026', '10-Apr-2026', '12-Feb-2026', '', 5, 91, 0, 0, 'In Progress', 'Task Dependent', 3150000, 2945000, true, false, 'Site Preparation', 21, 18, 6, 20, 17],
  [7, 'A2010', 'Temporary Facilities & Mobilization', '2.0', 2, 20, '12-Feb-2026', '04-Mar-2026', '12-Feb-2026', '03-Mar-2026', 0, 100, 1, 1, 'Completed', 'Resource Dependent', 780000, 760000, false, false, 'Site Preparation', 22, 10, 7, 21, 10],
  [8, 'A2020', 'Demolition and Site Clearing', '2.0', 2, 30, '25-Feb-2026', '26-Mar-2026', '25-Feb-2026', '', 2, 93, 0, 0, 'Delayed', 'Task Dependent', 1240000, 1188000, true, false, 'Site Preparation', 27, 14, 8, 26, 12],
  [9, 'A2030', 'Survey Control and Benchmarks', '2.0', 2, 14, '28-Mar-2026', '10-Apr-2026', '28-Mar-2026', '', 5, 64, 0, 0, 'Critical Delay', 'Task Dependent', 310000, 215000, true, false, 'Site Preparation', 39, 8, 9, 38, 6],
  [10, '3.0', 'Foundation', '3.0', 1, 82, '11-Apr-2026', '30-Jun-2026', '', '', 82, 0, 0, 0, 'Not Started', 'Task Dependent', 9200000, 0, true, false, 'Foundation', 44, 20, 10, 42, 19],
  [11, 'A3010', 'Excavation and Dewatering', '3.0', 2, 28, '11-Apr-2026', '08-May-2026', '', '', 28, 0, 0, 0, 'Not Started', 'Resource Dependent', 1850000, 0, true, false, 'Foundation', 45, 11, 11, 43, 10],
  [12, 'A3020', 'Pile Caps and Grade Beams', '3.0', 2, 42, '09-May-2026', '20-Jun-2026', '', '', 42, 0, 0, 0, 'Not Started', 'Task Dependent', 3950000, 0, true, false, 'Foundation', 55, 13, 12, 53, 12],
  [13, '4.0', 'Structural Works', '4.0', 1, 118, '21-Jun-2026', '17-Oct-2026', '', '', 118, 0, 12, 5, 'Not Started', 'Task Dependent', 16800000, 0, true, false, 'Structural Works', 63, 25, 13, 60, 24],
  [14, 'A4010', 'Concrete Superstructure', '4.0', 2, 70, '21-Jun-2026', '30-Aug-2026', '', '', 70, 0, 12, 4, 'Not Started', 'Resource Dependent', 9500000, 0, false, false, 'Structural Works', 64, 17, 14, 61, 16],
  [15, 'A4020', 'MEP Sleeves and Embedded Items', '4.0', 2, 85, '05-Jul-2026', '30-Sep-2026', '', '', 85, 0, 8, 3, 'Not Started', 'Task Dependent', 2100000, 0, false, false, 'MEP Works', 70, 18, 15, 67, 18],
  [16, 'A5000', 'Building Turnover', '8.0', 1, 0, '12-Feb-2027', '12-Feb-2027', '', '', 0, 0, 0, 0, 'Not Started', 'Finish Milestone', 0, 0, true, true, 'Turnover', 96, 1, 16, 93, 1],
].map(a => ({ row: a[0], id: a[1], name: a[2], wbs: a[3], level: a[4], duration: a[5], start: a[6], finish: a[7], actualStart: a[8], actualFinish: a[9], remaining: a[10], percent: a[11], totalFloat: a[12], freeFloat: a[13], status: a[14], type: a[15], cost: a[16], actualCost: a[17], summary: a[18], milestone: a[19], phase: a[20], x: a[21], width: a[22], lane: a[23], baselineX: a[24], baselineWidth: a[25], critical: ['A2020', 'A2030', '3.0', 'A3010', 'A3020', 'A5000'].includes(a[1]) }));
let selectedId = 'A2030';
let searchTerm = '';
const relationships = [['A1020', 'A2010', 'FS', 0], ['A2010', 'A2020', 'SS', 5], ['A2020', 'A2030', 'FS', 1], ['A2030', 'A3010', 'FS', 0], ['A3010', 'A3020', 'FS', 0]];
const resources = [['LAB-CIV-01', 'Civil Crew A', '18.0', 62, 334800], ['EQ-EXC-45', 'Excavator 45T', '2.0', 1350, 75600], ['MAT-CONC', 'Ready Mix Concrete', '2,400 m³', 142, 340800], ['SUB-MEP', 'MEP Subcontractor', '1 LS', 2100000, 2100000]];
const money = v => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const rowTop = a => 8 + (a.row - 1) * 28;
const activityMatches = (a, term) => [a.id, a.name, a.wbs, a.status, a.phase].join(' ').toLowerCase().includes(term);

function render(options = {}) {
  const selected = activities.find(a => a.id === selectedId) || activities[8];
  const term = searchTerm.trim().toLowerCase();
  const visibleActivities = term ? activities.filter(a => activityMatches(a, term)) : activities;
  const visibleIds = new Set(visibleActivities.map(a => a.id));
  const budget = activities.reduce((s, a) => s + a.cost, 0);
  const actual = activities.reduce((s, a) => s + a.actualCost, 0);
  const earned = activities.reduce((s, a) => s + a.cost * a.percent / 100, 0);
  const planned = budget * .52;

  document.getElementById('root').innerHTML = `
  <div class="app-shell">
    <header class="app-header"><div class="brand-block">${icon('▥')}<div><h1>CosTrack Scheduler</h1><p>Construction Scheduling, Progress Monitoring & Cost Management</p></div></div><label class="header-search">${icon('⌕')}<input id="global-search" type="search" value="${escapeHtml(searchTerm)}" placeholder="Search projects, activities, resources (Ctrl+Q)" aria-label="Search projects activities resources"><b>⌄</b></label><div class="header-actions"><span>♢</span><span>?</span><span>⚙</span><div class="avatar">AD</div></div></header>
    <div class="desktop-body"><aside class="sidebar" aria-label="Primary navigation">${sidebarSections.map(([title, items]) => `<section><h2>${title}</h2>${items.map(item => `<button type="button" class="${item === 'Activities' ? 'selected' : ''}">${icon('▣')}${item}</button>`).join('')}</section>`).join('')}<button type="button" class="collapse">${icon('‹')} Collapse</button></aside>
    <main class="workspace"><div class="ribbon"><div class="ribbon-tabs">${ribbonTabs.map(t => `<button type="button" class="${t === 'Activities' ? 'active' : ''}">${t}</button>`).join('')}</div><div class="ribbon-actions">${ribbonGroups.map(([title, actions]) => `<div class="ribbon-group">${actions.map(([i, l]) => `<button type="button">${icon(i)}<span>${l}</span></button>`).join('')}<small>${title}</small></div>`).join('')}</div></div>
    <div class="view-tabs">${['Activities', 'Activity Usage', 'Resource Usage', 'WBS', 'Cost Loading'].map((tab, index) => `<button type="button" class="${index === 0 ? 'active' : ''}">${tab}</button>`).join('')}</div>
    <div class="split-pane"><section class="activity-grid"><div class="grid-toolbar"><span>Activities View</span><button type="button">⌕ Filtering</button><button type="button">☰ Sorting</button><button type="button">▤ Group by WBS</button><button type="button">⚙ Columns</button></div><table><thead><tr>${['#', 'Activity ID', 'Activity Name', 'Duration', 'Start', 'Finish', 'Actual Start', 'Actual Finish', 'Remaining Duration', '% Complete', 'Total Float', 'Free Float', 'Status'].map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${visibleActivities.length ? visibleActivities.map(a => `<tr data-id="${a.id}" class="${selectedId === a.id ? 'active-row' : ''} ${a.critical ? 'critical-row' : ''}"><td>${a.row}</td><td class="id-cell" style="padding-left:${8 + a.level * 16}px">${a.summary ? '⌄ ' : ''}${a.id}</td><td class="${a.summary ? 'summary-name' : ''}">${a.name}</td><td>${a.duration}</td><td>${a.start}</td><td>${a.finish}</td><td>${a.actualStart || '—'}</td><td>${a.actualFinish || '—'}</td><td>${a.remaining}</td><td>${a.percent}%</td><td>${a.totalFloat}</td><td>${a.freeFloat}</td><td><span class="status ${a.status.toLowerCase().replaceAll(' ', '-')}">${a.status}</span></td></tr>`).join('') : `<tr><td colspan="13" class="empty-state">No activities match “${escapeHtml(searchTerm)}”.</td></tr>`}</tbody></table></section>
    <section class="gantt-panel"><div class="gantt-toolbar"><strong>Interactive Gantt Chart</strong><span>Scale:</span><select aria-label="Gantt scale"><option>Day</option><option selected>Week</option><option>Month</option><option>Quarter</option><option>Year</option></select><span>−</span><input type="range" value="3" aria-label="Zoom level"><span>＋</span><span>⚙</span></div><div class="timeline-header"><span>Q1 2026</span><span>Q2 2026</span><span>Q3 2026</span><span>Q4 2026</span><span>Q1 2027</span></div><div class="gantt-canvas"><div class="today-line"><span>Data Date 03-Jun-2026</span></div>${visibleActivities.map(a => `<div class="gantt-row ${a.id === selectedId ? 'selected' : ''}" style="top:${rowTop(a)}px"><div class="baseline" style="left:${a.baselineX}%;width:${a.baselineWidth}%"></div><div class="${a.milestone ? 'milestone' : a.summary ? 'summary-bar' : a.critical ? 'critical-bar' : 'task-bar'}" style="left:${a.x}%;width:${a.width}%">${a.milestone ? '' : `<span class="progress" style="width:${a.percent}%"></span>`}<em>${a.name}</em></div></div>`).join('')}<svg class="dependency-layer" viewBox="0 0 100 470" preserveAspectRatio="none">${dependencyLines(visibleIds)}</svg></div></section></div>${details(selected, { budget, actual, earned, planned, spi: earned / planned, cpi: earned / actual })}</main></div><footer class="status-bar"><span>Project: Metro Medical Center Expansion</span><span>Data Date: 03-Jun-2026</span><span>User: Admin</span><span>▣ Database: CosTrackDB</span><span class="connected">● Connected</span></footer></div>`;

  document.querySelectorAll('tr[data-id]').forEach(row => row.addEventListener('click', () => { selectedId = row.dataset.id; render(); }));
  const search = document.getElementById('global-search');
  search.addEventListener('input', event => { searchTerm = event.target.value; render({ focusSearch: true }); });
  search.addEventListener('keydown', event => { if (event.key === 'Escape') { searchTerm = ''; render({ focusSearch: true }); } });
  if (options.focusSearch) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); }
}

function dependencyLines(visibleIds) {
  return relationships
    .filter(([from, to]) => visibleIds.has(from) && visibleIds.has(to))
    .map(([from, to]) => {
      const source = activities.find(a => a.id === from);
      const target = activities.find(a => a.id === to);
      if (!source || !target) return '';
      const y1 = rowTop(source) + 14;
      const y2 = rowTop(target) + 14;
      const x1 = Math.min(source.x + source.width, 98);
      const x2 = Math.max(target.x, 2);
      const midX = Math.min(Math.max((x1 + x2) / 2, x1 + 2), 96);
      return `<polyline points="${x1},${y1} ${midX},${y1} ${midX},${y2} ${x2},${y2}"/>`;
    }).join('');
}

function miniTable(headers, rows, empty = 'No relationship assigned') { return `<table class="mini-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${headers.length}">${empty}</td></tr>`}</tbody></table>`; }
function gauge(label, value, warn = false) { const display = label === '% Complete' ? Math.round(value * 100) + '%' : value.toFixed(2); return `<div class="gauge"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.5"></circle><circle class="${warn ? 'warn' : ''}" cx="21" cy="21" r="15.5" stroke-dasharray="${Math.min(value, 1) * 100} 100"></circle></svg><strong>${display}</strong><span>${label}</span></div>`; }
function details(selected, totals) {
  const fields = [['Activity ID', selected.id], ['Activity Name', selected.name], ['Activity Type', selected.type], ['WBS', selected.wbs], ['Duration', `${selected.duration} days`], ['Calendar', 'Standard 5 Day Workweek'], ['Start Date', selected.start], ['Finish Date', selected.finish], ['Constraint', 'As Soon As Possible'], ['Priority', selected.critical ? 'High / Critical' : 'Normal'], ['Percent Complete', `${selected.percent}%`], ['Status', selected.status]];
  const preds = relationships.filter(r => r[1] === selected.id).map(r => [r[0], activities.find(a => a.id === r[0])?.name || '', r[2], r[3]]);
  const succs = relationships.filter(r => r[0] === selected.id).map(r => [r[1], activities.find(a => a.id === r[1])?.name || '', r[2], r[3]]);
  return `<section class="details-panel"><nav>${['General', 'Predecessors', 'Successors', 'Resources', 'Codes', 'Relationships', 'Notebook'].map((t, i) => `<button type="button" class="${i === 0 ? 'active' : ''}">${t}</button>`).join('')}</nav><div class="detail-content"><div class="detail-card general-card"><h3>General Activity Details</h3><div class="form-grid">${fields.map(([l, v]) => `<label>${l}<input value="${escapeHtml(v)}" readonly></label>`).join('')}</div><label class="notes">Notebook / Daily Accomplishment Tracking<textarea readonly>Daily report: ${escapeHtml(selected.phase)} activity is monitored against planned progress, productivity, delay logs, and cost-to-complete forecast.</textarea></label></div><div class="detail-card"><h3>Predecessors</h3>${miniTable(['Activity ID', 'Activity Name', 'Relationship Type', 'Lag'], preds, 'No driving predecessor')}<h3>Successors</h3>${miniTable(['Activity ID', 'Activity Name', 'Relationship Type', 'Lag'], succs, 'No successor assigned')}</div><div class="detail-card"><h3>Resources</h3>${miniTable(['Resource Code', 'Resource Name', 'Quantity', 'Unit Cost', 'Total Cost'], resources.map(r => [r[0], r[1], r[2], money(r[3]), money(r[4])]))}<h3>Cost Information</h3>${miniTable(['Budget Cost', 'Actual Cost', 'Remaining Cost', 'Forecast Cost', 'Cost Variance'], [[money(selected.cost), money(selected.actualCost), money(Math.max(selected.cost - selected.actualCost, 0)), money(selected.cost * 1.04), money(selected.actualCost - selected.cost * selected.percent / 100)]])}</div><div class="detail-card ev-card"><h3>Earned Value & Delay Monitoring</h3><div class="kpi-row">${gauge('SPI', totals.spi)}${gauge('CPI', totals.cpi, true)}${gauge('% Complete', selected.percent / 100)}</div><div class="metrics"><span>PV ${money(totals.planned)}</span><span>EV ${money(totals.earned)}</span><span>AC ${money(totals.actual)}</span><span>SV ${money(totals.earned - totals.planned)}</span><span>CV ${money(totals.earned - totals.actual)}</span></div><div class="mini-chart"><span class="planned"></span><span class="earned"></span><span class="actual"></span></div></div><div class="detail-card management-card"><h3>Project Controls Functions</h3><div class="chips">${['Create', 'Open', 'Save', 'Duplicate', 'Archive', 'Delete', 'Search', 'Filter'].map(f => `<button type="button">${f} Project</button>`).join('')}</div><h3>Project Fields</h3><div class="field-list">${[['Project ID', 'CT-MMC-2026'], ['Project Name', 'Metro Medical Center Expansion'], ['Client', 'Apex Health Authority'], ['Contractor', 'CEM Works JV'], ['Contract Amount', '$48,200,000'], ['Start Date', '01-Jan-2026'], ['Finish Date', '12-Feb-2027'], ['Status', 'In Progress']].map(([l, v]) => `<p><strong>${l}</strong><span>${v}</span></p>`).join('')}</div><h3>Reports</h3><div class="chips compact">${['Schedule Report', 'Activity Report', 'Resource Report', 'Cost Report', 'Earned Value Report', 'Delay Report', 'Baseline Variance Report'].map(r => `<button type="button">${r}</button>`).join('')}</div></div></div></section>`;
}
render();
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'q') {
    event.preventDefault();
    document.getElementById('global-search')?.focus();
  }
});
