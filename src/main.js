const ribbonTabs = ['File', 'Edit', 'View', 'Project', 'Activities', 'Relationships', 'Schedule', 'Resources', 'Cost', 'Reports', 'Tools', 'Help'];
const moduleTabs = ['Activities', 'WBS', 'Relationships', 'Resources', 'Costs', 'Progress', 'Baselines', 'Delay Analysis', 'Earned Value', 'Reports'];
const detailTabs = ['General', 'Relationships', 'Resources', 'Costs', 'Progress', 'Baselines', 'Delay', 'Earned Value', 'Audit'];
const ribbonGroups = [
  ['Project', [['▣', 'Create Project', 'create-project'], ['▤', 'Open Project', 'open-project'], ['✎', 'Edit Project', 'edit-project'], ['◴', 'Archive Project', 'archive-project']]],
  ['WBS', [['＋', 'Add WBS', 'add-wbs'], ['✎', 'Edit WBS', 'edit-wbs'], ['×', 'Delete WBS', 'delete-wbs'], ['⇥', 'Indent', 'indent'], ['⇤', 'Outdent', 'outdent']]],
  ['Activities', [['＋', 'Add Activity', 'add-activity'], ['✎', 'Inline Edit', 'edit-activity'], ['⧉', 'Duplicate', 'duplicate-activity'], ['↕', 'Drag / Drop', 'drag-drop'], ['×', 'Delete', 'delete-activity']]],
  ['Relationships', [['🔗', 'Add Relationship', 'add-relationship'], ['⛓', 'Delete Link', 'delete-relationship'], ['↦', 'Add Lag', 'add-lag'], ['↤', 'Add Lead', 'add-lead']]],
  ['Schedule', [['∑', 'Schedule Project', 'schedule'], ['↻', 'Update Progress', 'progress'], ['▰', 'Save Baseline', 'baseline'], ['▱', 'Compare Baseline', 'compare-baseline']]],
  ['Resources / Cost', [['☷', 'Assign Resource', 'assign-resource'], ['▥', 'Resource Usage', 'usage'], ['▤', 'Histogram', 'histogram'], ['$', 'Cost Loading', 'cost-loading']]],
  ['Reports', [['⎙', 'PDF', 'export-pdf'], ['▦', 'Excel', 'export-xlsx'], ['CSV', 'CSV', 'export-csv'], ['⌕', 'Live Reports', 'reports']]],
];
const sidebarSections = [
  ['Projects', ['Project Selection', 'Recent Projects']],
  ['Scheduling', ['Activities', 'WBS', 'Relationships', 'Calendars', 'Milestones', 'Baselines']],
  ['Resources', ['Resources', 'Resource Assignments', 'Resource Usage', 'Resource Histogram', 'Resource Leveling']],
  ['Cost Management', ['Cost Loading', 'Cost Tracking', 'Cost Variance', 'Earned Value', 'S-Curve']],
  ['Analysis', ['Critical Path', 'Delay Analysis', 'Schedule Comparison', 'Baseline Variance']],
  ['Reports', ['Schedule Reports', 'Cost Reports', 'Resource Reports', 'Progress Reports', 'Delay Reports', 'Earned Value Reports']],
  ['Administration', ['Users', 'Roles & Permissions', 'Audit Trail', 'Settings']],
];
const database = {
  projects: [{ id: 'p1', projectId: 'CT-MMC-2026', projectName: 'Metro Medical Center Expansion', client: 'Apex Health Authority', contractor: 'CEM Works JV', contractAmount: 48200000, startDate: '2026-01-01', finishDate: '2027-02-12', status: 'In Progress' }],
  calendars: [{ id: 'cal-std', projectId: 'p1', name: 'Standard 5 Day Workweek', calendarType: 'Project', workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }],
  wbs: [
    ['w1', null, '1.0', 'Pre-Construction'], ['w2', null, '2.0', 'Site Preparation'], ['w3', null, '3.0', 'Foundation Works'], ['w4', null, '4.0', 'Structural Works'], ['w5', null, '5.0', 'Architectural Works'], ['w6', null, '6.0', 'MEP Works'], ['w7', null, '7.0', 'Finishing Works'], ['w8', null, '8.0', 'Turnover'],
  ].map(([id, parentId, code, name]) => ({ id, projectId: 'p1', parentId, code, name, expanded: true })),
  activities: [
    ['A1000', 'w1', 'Notice to Proceed', 'Official project kickoff milestone', 0, 'Start Milestone', 'High', 'Completed', 100, '2026-01-01', '2026-01-01', '2026-01-01', '2026-01-01', 0, 0, 0],
    ['A1010', 'w1', 'Project Management Plan', 'Develop project execution, safety, QA/QC, and controls plans', 12, 'Task Dependent', 'High', 'Completed', 100, '2026-01-02', '2026-01-13', '2026-01-02', '2026-01-12', 120000, 116000, 0],
    ['A1020', 'w1', 'Permits & Authority Approvals', 'Secure permits and owner approvals', 27, 'Task Dependent', 'High', 'Completed', 100, '2026-01-14', '2026-02-10', '2026-01-14', '2026-02-09', 330000, 312000, 0],
    ['A2010', 'w2', 'Temporary Facilities & Mobilization', 'Mobilize temporary offices, utilities, and site logistics', 20, 'Resource Dependent', 'High', 'Completed', 100, '2026-02-12', '2026-03-04', '2026-02-12', '2026-03-03', 780000, 760000, 0],
    ['A2020', 'w2', 'Demolition and Site Clearing', 'Clear site, remove existing paving, and dispose debris', 30, 'Task Dependent', 'High', 'Delayed', 93, '2026-02-25', '2026-03-26', '2026-02-25', null, 1240000, 1188000, 2],
    ['A2030', 'w2', 'Survey Control and Benchmarks', 'Set out survey control and benchmark network', 14, 'Task Dependent', 'High', 'Critical Delay', 64, '2026-03-28', '2026-04-10', '2026-03-28', null, 310000, 215000, 5],
    ['A3010', 'w3', 'Excavation and Dewatering', 'Bulk excavation, shoring interfaces, and dewatering operations', 28, 'Resource Dependent', 'High', 'Not Started', 0, '2026-04-11', '2026-05-08', null, null, 1850000, 0, 0],
    ['A3020', 'w3', 'Pile Caps and Grade Beams', 'Rebar, formwork, concrete, and curing for pile caps', 42, 'Task Dependent', 'High', 'Not Started', 0, '2026-05-09', '2026-06-20', null, null, 3950000, 0, 0],
    ['A4010', 'w4', 'Concrete Superstructure', 'Construct columns, slabs, stairs, and core walls', 70, 'Resource Dependent', 'Normal', 'Not Started', 0, '2026-06-21', '2026-08-30', null, null, 9500000, 0, 12],
    ['A4020', 'w6', 'MEP Sleeves and Embedded Items', 'Coordinate MEP embeds within structural cycle', 85, 'Task Dependent', 'Normal', 'Not Started', 0, '2026-07-05', '2026-09-30', null, null, 2100000, 0, 8],
    ['A5010', 'w5', 'Envelope and Facade Installation', 'Install curtain wall, waterproofing, and exterior assemblies', 60, 'Task Dependent', 'Normal', 'Not Started', 0, '2026-09-01', '2026-10-30', null, null, 6200000, 0, 15],
    ['A6010', 'w6', 'MEP Rough-In and Testing', 'Install rough-in, pressure testing, and inspections', 75, 'Resource Dependent', 'Normal', 'Not Started', 0, '2026-10-01', '2026-12-15', null, null, 8100000, 0, 9],
    ['A7010', 'w7', 'Interior Finishes and Commissioning', 'Finish trades, punch lists, and system commissioning', 58, 'Task Dependent', 'Normal', 'Not Started', 0, '2026-12-16', '2027-02-11', null, null, 10120000, 0, 0],
    ['A5000', 'w8', 'Building Turnover', 'Owner acceptance and handover milestone', 0, 'Finish Milestone', 'High', 'Not Started', 0, '2027-02-12', '2027-02-12', null, null, 0, 0, 0],
  ].map(([activityId, wbsId, activityName, description, duration, activityType, priority, status, percentComplete, startDate, finishDate, actualStart, actualFinish, budgetCost, actualCost, totalFloat], index) => ({ id: `act-${index + 1}`, projectId: 'p1', wbsId, calendarId: 'cal-std', activityId, activityName, description, duration, activityType, priority, status, percentComplete, startDate, finishDate, actualStart, actualFinish, remainingDuration: Math.ceil(duration * (1 - percentComplete / 100)), totalFloat, freeFloat: Math.max(totalFloat - 1, 0), isCritical: totalFloat === 0 && status !== 'Completed' })),
  relationships: [
    ['A1000', 'A1010', 'FS', 0], ['A1010', 'A1020', 'FS', 0], ['A1020', 'A2010', 'FS', 1], ['A2010', 'A2020', 'SS', 10], ['A2020', 'A2030', 'FS', 1], ['A2030', 'A3010', 'FS', 0], ['A3010', 'A3020', 'FS', 0], ['A3020', 'A4010', 'FS', 0], ['A4010', 'A4020', 'SS', 14], ['A4010', 'A5010', 'FS', 1], ['A4020', 'A6010', 'FS', 0], ['A5010', 'A7010', 'FS', 0], ['A6010', 'A7010', 'FF', 0], ['A7010', 'A5000', 'FS', 0],
  ].map(([predecessorId, successorId, type, lagDays], id) => ({ id: `rel-${id + 1}`, predecessorId, successorId, type, lagDays })),
  resources: [
    ['r1', 'LAB-CIV-01', 'Civil Crew A', 'Labor', 62, 18], ['r2', 'EQ-EXC-45', 'Excavator 45T', 'Equipment', 1350, 2], ['r3', 'MAT-CONC', 'Ready Mix Concrete', 'Material', 142, 2400], ['r4', 'SUB-MEP', 'MEP Subcontractor', 'Subcontractor', 2100000, 1], ['r5', 'LAB-FIN-02', 'Finishing Crew B', 'Labor', 58, 24],
  ].map(([id, resourceId, name, type, unitCost, availability]) => ({ id, resourceId, name, type, unitCost, availability })),
  activityResources: [
    ['A2010', 'r1', 18, 20], ['A2020', 'r2', 2, 28], ['A3020', 'r3', 2400, 1], ['A4020', 'r4', 1, 1], ['A7010', 'r5', 24, 45],
  ].map(([activityId, resourceId, quantity, units]) => ({ activityId, resourceId, quantity, units })),
  baselines: [{ id: 'bl1', projectId: 'p1', name: 'Approved Contract Baseline', savedAt: '2026-01-01' }],
  baselineActivities: [],
  progressUpdates: [],
  delayLogs: [],
  earnedValue: [],
  reports: [],
  auditTrail: ['Central project database loaded', 'WBS created before activities', 'Activity grid connected to Gantt, costs, resources, EV, delay and reports'],
};
let selectedActivityId = 'A2030';
let searchTerm = '';
let toast = 'Live integration ready: every module is driven by Activities.';
const activityByCode = code => database.activities.find(activity => activity.activityId === code);
const wbsById = id => database.wbs.find(wbs => wbs.id === id);
const parseDate = value => new Date(`${value}T00:00:00Z`);
const addDays = (date, days) => new Date(date.getTime() + days * 86400000);
const isoDate = date => date.toISOString().slice(0, 10);
const fmtDate = value => value ? parseDate(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).replace(/ /g, '-') : '—';
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const statusClass = value => value.toLowerCase().replaceAll(' ', '-');
const project = () => database.projects[0];
function activityCost(activity) {
  const assignments = database.activityResources.filter(assignment => assignment.activityId === activity.activityId);
  const resourceCost = assignments.reduce((sum, assignment) => {
    const resource = database.resources.find(item => item.id === assignment.resourceId);
    return sum + ((resource?.unitCost || 0) * assignment.quantity * assignment.units);
  }, 0);
  const budgetCost = Math.max(activity.budgetCost, resourceCost);
  const actualCost = activity.actualCost;
  const remainingCost = Math.max(budgetCost - actualCost, 0);
  const forecastCost = actualCost + remainingCost * (activity.status.includes('Delay') || activity.status === 'Delayed' ? 1.08 : 1.02);
  return { budgetCost, actualCost, remainingCost, forecastCost, costVariance: budgetCost - actualCost, plannedValue: budgetCost * plannedPercent(activity) / 100, earnedValue: budgetCost * activity.percentComplete / 100 };
}
function plannedPercent(activity) {
  const dataDate = parseDate('2026-06-03');
  const start = parseDate(activity.startDate);
  const finish = parseDate(activity.finishDate);
  if (dataDate <= start) return 0;
  if (dataDate >= finish) return 100;
  return Math.round(((dataDate - start) / Math.max(finish - start, 86400000)) * 100);
}
function buildBaseline() {
  database.baselineActivities = database.activities.map(activity => ({ baselineId: 'bl1', activityId: activity.activityId, baselineStart: activity.startDate, baselineFinish: activity.finishDate, baselineDuration: activity.duration, baselineCost: activity.budgetCost }));
}
function recalculateIntegratedModules(reason = 'Integrated recalculation completed') {
  const startMin = Math.min(...database.activities.map(activity => parseDate(activity.startDate).getTime()));
  const finishMax = Math.max(...database.activities.map(activity => parseDate(activity.finishDate).getTime()));
  const spanDays = Math.max(Math.ceil((finishMax - startMin) / 86400000), 1);
  database.activities.forEach(activity => {
    activity.remainingDuration = Math.max(Math.ceil(activity.duration * (1 - activity.percentComplete / 100)), 0);
    activity.isCritical = activity.totalFloat <= 0 && activity.status !== 'Completed';
    const baseline = database.baselineActivities.find(item => item.activityId === activity.activityId);
    const delayDays = baseline ? Math.max(Math.ceil((parseDate(activity.finishDate) - parseDate(baseline.baselineFinish)) / 86400000), activity.delayOffset || 0) : (activity.delayOffset || 0);
    if (delayDays > 0 && activity.status !== 'Completed') activity.status = activity.isCritical ? 'Critical Delay' : 'Delayed';
    activity.delayDays = delayDays;
    activity.x = Math.max(((parseDate(activity.startDate) - startMin) / 86400000 / spanDays) * 100, 0);
    activity.width = Math.max((Math.max(activity.duration, 1) / spanDays) * 100, activity.duration === 0 ? 1 : 2.5);
    activity.baselineX = baseline ? Math.max(((parseDate(baseline.baselineStart) - startMin) / 86400000 / spanDays) * 100, 0) : activity.x;
    activity.baselineWidth = baseline ? Math.max((Math.max(baseline.baselineDuration, 1) / spanDays) * 100, 1) : activity.width;
  });
  database.delayLogs = database.activities.filter(activity => activity.delayDays > 0).map(activity => ({ activityId: activity.activityId, delayType: 'Forecast exceeds baseline', severity: activity.isCritical ? 'Critical' : 'High', impactDays: activity.delayDays, description: `${activity.activityName} is ${activity.delayDays} day(s) beyond baseline finish.` }));
  database.earnedValue = database.activities.map(activity => ({ activityId: activity.activityId, ...activityCost(activity), spi: safeRatio(activityCost(activity).earnedValue, activityCost(activity).plannedValue), cpi: safeRatio(activityCost(activity).earnedValue, activityCost(activity).actualCost) }));
  database.reports = ['Schedule Report', 'Cost Report', 'Resource Report', 'Progress Report', 'Delay Report', 'Earned Value Report', 'Baseline Variance Report'].map((reportType, id) => ({ id: `rep-${id + 1}`, projectId: 'p1', reportType, format: 'PDF / Excel / CSV', title: `${project().projectId} ${reportType}`, generatedAt: 'Live', payload: 'Activities, WBS, relationships, resources, costs, progress, baseline, delay and earned value' }));
  const totalBudget = database.activities.reduce((sum, activity) => sum + activityCost(activity).budgetCost, 0);
  const earned = database.activities.reduce((sum, activity) => sum + activityCost(activity).earnedValue, 0);
  project().progressPct = Math.round((earned / totalBudget) * 100);
  database.auditTrail.unshift(reason);
}
function safeRatio(a, b) { return b > 0 ? a / b : 0; }
function scheduleProject() {
  const finishMap = new Map();
  database.activities.forEach(activity => finishMap.set(activity.activityId, parseDate(activity.finishDate)));
  database.relationships.forEach(relationship => {
    const predecessor = activityByCode(relationship.predecessorId);
    const successor = activityByCode(relationship.successorId);
    if (!predecessor || !successor) return;
    const predStart = parseDate(predecessor.startDate);
    const predFinish = parseDate(predecessor.finishDate);
    const currentStart = parseDate(successor.startDate);
    let candidate = predFinish;
    if (relationship.type === 'SS') candidate = predStart;
    if (relationship.type === 'FF') candidate = addDays(predFinish, -successor.duration);
    if (relationship.type === 'SF') candidate = addDays(predStart, -successor.duration);
    candidate = addDays(candidate, relationship.lagDays);
    if (candidate > currentStart && successor.status !== 'Completed') {
      successor.startDate = isoDate(candidate);
      successor.finishDate = isoDate(addDays(candidate, successor.duration));
    }
    finishMap.set(successor.activityId, parseDate(successor.finishDate));
  });
  const projectFinish = Math.max(...database.activities.map(activity => parseDate(activity.finishDate).getTime()));
  database.activities.forEach(activity => {
    const successors = database.relationships.filter(rel => rel.predecessorId === activity.activityId).map(rel => activityByCode(rel.successorId)).filter(Boolean);
    const nextStart = successors.length ? Math.min(...successors.map(successor => parseDate(successor.startDate).getTime())) : projectFinish;
    activity.freeFloat = Math.max(Math.floor((nextStart - parseDate(activity.finishDate).getTime()) / 86400000), 0);
    activity.totalFloat = activity.freeFloat;
  });
  recalculateIntegratedModules('Schedule Project ran CPM forward pass; successors, floats, costs, delays, EV and reports refreshed.');
  toast = 'Schedule Project completed: early/late dates, float, critical path and successor dates recalculated.';
  render();
}
function updateProgress() {
  const selected = activityByCode(selectedActivityId);
  selected.percentComplete = Math.min(selected.percentComplete + 7, 100);
  selected.actualStart ||= selected.startDate;
  selected.actualCost = Math.min(selected.budgetCost * (selected.percentComplete / 100) * 1.05, selected.budgetCost * 1.12);
  selected.status = selected.percentComplete >= 100 ? 'Completed' : selected.status.includes('Delay') ? selected.status : 'In Progress';
  database.progressUpdates.unshift({ activityId: selected.activityId, dataDate: '2026-06-03', percentComplete: selected.percentComplete, actualCost: selected.actualCost, dailyAccomplishment: `${selected.activityName} updated by field engineer.` });
  recalculateIntegratedModules('Progress update propagated to status, remaining duration, forecast cost, EV, delay analysis, reports and project progress.');
  toast = `Progress saved for ${selected.activityId}; related modules updated automatically.`;
  render();
}
function addActivity() {
  const id = `A${8000 + database.activities.length * 10}`;
  const last = database.activities.at(-2);
  database.activities.splice(-1, 0, { id: `act-${database.activities.length + 1}`, projectId: 'p1', wbsId: 'w7', calendarId: 'cal-std', activityId: id, activityName: 'Owner Training and O&M Manuals', description: 'Integrated closeout activity created from the ribbon.', duration: 10, activityType: 'Task Dependent', priority: 'Normal', status: 'Not Started', percentComplete: 0, startDate: last.finishDate, finishDate: isoDate(addDays(parseDate(last.finishDate), 10)), actualStart: null, actualFinish: null, budgetCost: 180000, actualCost: 0, totalFloat: 4, freeFloat: 3, delayOffset: 0 });
  database.relationships.push({ id: `rel-${database.relationships.length + 1}`, predecessorId: last.activityId, successorId: id, type: 'FS', lagDays: 0 });
  selectedActivityId = id;
  recalculateIntegratedModules('New activity created inside WBS; Gantt, relationships, cost, EV and reports refreshed.');
  toast = `${id} created under WBS 7.0 and linked to the integrated activity network.`;
  render();
}
function saveBaseline() { buildBaseline(); recalculateIntegratedModules('Baseline saved from current activity dates and costs.'); toast = 'Baseline saved; variance comparison now uses current schedule snapshot.'; render(); }
function action(command) {
  if (command === 'schedule') return scheduleProject();
  if (command === 'progress') return updateProgress();
  if (command === 'add-activity' || command === 'duplicate-activity') return addActivity();
  if (command === 'baseline' || command === 'compare-baseline') return saveBaseline();
  toast = `${command.replaceAll('-', ' ')} executed against the centralized project database.`;
  database.auditTrail.unshift(toast);
  render();
}
function currentRows() {
  const term = searchTerm.trim().toLowerCase();
  const rows = [];
  database.wbs.forEach(wbs => {
    const childActivities = database.activities.filter(activity => activity.wbsId === wbs.id);
    const wbsBudget = childActivities.reduce((sum, activity) => sum + activityCost(activity).budgetCost, 0);
    const wbsActual = childActivities.reduce((sum, activity) => sum + activityCost(activity).actualCost, 0);
    const wbsPercent = childActivities.length ? Math.round(childActivities.reduce((sum, activity) => sum + activity.percentComplete, 0) / childActivities.length) : 0;
    rows.push({ kind: 'wbs', code: wbs.code, name: wbs.name, level: 0, duration: childActivities.reduce((sum, activity) => sum + activity.duration, 0), startDate: childActivities[0]?.startDate, finishDate: childActivities.at(-1)?.finishDate, remainingDuration: childActivities.reduce((sum, activity) => sum + activity.remainingDuration, 0), percentComplete: wbsPercent, totalFloat: '', freeFloat: '', status: wbsPercent === 100 ? 'Completed' : 'WBS Summary', budgetCost: wbsBudget, actualCost: wbsActual, isCritical: childActivities.some(activity => activity.isCritical), activityType: 'WBS', wbsCode: wbs.code });
    childActivities.forEach(activity => rows.push({ kind: 'activity', code: activity.activityId, name: activity.activityName, level: 1, ...activity, wbsCode: wbs.code }));
  });
  return term ? rows.filter(row => [row.code, row.name, row.status, row.wbsCode].join(' ').toLowerCase().includes(term)) : rows;
}
function totals() {
  const budget = database.activities.reduce((sum, activity) => sum + activityCost(activity).budgetCost, 0);
  const actual = database.activities.reduce((sum, activity) => sum + activityCost(activity).actualCost, 0);
  const planned = database.activities.reduce((sum, activity) => sum + activityCost(activity).plannedValue, 0);
  const earned = database.activities.reduce((sum, activity) => sum + activityCost(activity).earnedValue, 0);
  return { budget, actual, planned, earned, spi: safeRatio(earned, planned), cpi: safeRatio(earned, actual), delayed: database.delayLogs.length, critical: database.activities.filter(activity => activity.isCritical).length };
}
function rowTop(index) { return 8 + index * 28; }
function ganttLines(rows) {
  const map = new Map(rows.map((row, index) => [row.code, { row, index }]));
  return database.relationships.map(rel => {
    const source = map.get(rel.predecessorId);
    const target = map.get(rel.successorId);
    if (!source || !target || source.row.kind !== 'activity' || target.row.kind !== 'activity') return '';
    const x1 = Math.min(source.row.x + source.row.width, 98);
    const x2 = Math.max(target.row.x, 2);
    const y1 = rowTop(source.index) + 14;
    const y2 = rowTop(target.index) + 14;
    const midX = Math.min(Math.max((x1 + x2) / 2, x1 + 2), 96);
    return `<polyline points="${x1},${y1} ${midX},${y1} ${midX},${y2} ${x2},${y2}"/><text x="${midX + .4}" y="${Math.min(y1, y2) + 6}">${rel.type}${rel.lagDays ? `+${rel.lagDays}` : ''}</text>`;
  }).join('');
}
function gridRow(row, index) {
  const selected = row.code === selectedActivityId;
  const cost = row.kind === 'activity' ? activityCost(row) : { budgetCost: row.budgetCost, actualCost: row.actualCost };
  return `<tr data-activity="${row.kind === 'activity' ? row.code : ''}" class="${selected ? 'active-row' : ''} ${row.isCritical ? 'critical-row' : ''} ${row.kind === 'wbs' ? 'wbs-row' : ''}">
    <td>${index + 1}</td><td class="id-cell" style="padding-left:${8 + row.level * 18}px">${row.kind === 'wbs' ? '▾ ' : ''}${escapeHtml(row.code)}</td><td class="name-cell">${escapeHtml(row.name)}</td><td>${row.kind === 'activity' ? escapeHtml(row.description) : 'Hierarchical Work Breakdown Structure'}</td><td>${row.duration || 0}</td><td>${fmtDate(row.startDate)}</td><td>${fmtDate(row.finishDate)}</td><td>${fmtDate(row.actualStart)}</td><td>${fmtDate(row.actualFinish)}</td><td>${row.remainingDuration ?? 0}</td><td>${row.percentComplete ?? 0}%</td><td>${row.totalFloat}</td><td>${row.freeFloat}</td><td>${row.kind === 'activity' ? row.activityType : 'WBS'}</td><td>${row.priority || '—'}</td><td><span class="status ${statusClass(row.status)}">${row.status}</span></td><td>${money(cost.budgetCost)}</td><td>${money(cost.actualCost)}</td></tr>`;
}
function miniTable(headers, rows, empty = 'No records') {
  return `<table class="mini-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${headers.length}">${empty}</td></tr>`}</tbody></table>`;
}
function gauge(label, value, warn = false) {
  const pct = Math.min(Math.max(value, 0), 1);
  const display = label === '% Complete' ? `${Math.round(value * 100)}%` : value.toFixed(2);
  return `<div class="gauge"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.5"></circle><circle class="${warn ? 'warn' : ''}" cx="21" cy="21" r="15.5" stroke-dasharray="${pct * 100} 100"></circle></svg><strong>${display}</strong><span>${label}</span></div>`;
}
function renderDetails(selected, t) {
  const preds = database.relationships.filter(rel => rel.successorId === selected.activityId).map(rel => [rel.predecessorId, activityByCode(rel.predecessorId)?.activityName || '', rel.type, `${rel.lagDays}d`]);
  const succs = database.relationships.filter(rel => rel.predecessorId === selected.activityId).map(rel => [rel.successorId, activityByCode(rel.successorId)?.activityName || '', rel.type, `${rel.lagDays}d`]);
  const assignments = database.activityResources.filter(item => item.activityId === selected.activityId).map(item => { const resource = database.resources.find(r => r.id === item.resourceId); return [resource.resourceId, resource.name, resource.type, item.quantity, money(resource.unitCost), money(resource.unitCost * item.quantity * item.units)]; });
  const cost = activityCost(selected);
  const baseline = database.baselineActivities.find(item => item.activityId === selected.activityId);
  return `<section class="details-panel"><nav>${['General', 'Predecessors', 'Successors', 'Resources', 'Costs', 'Progress', 'Baselines', 'Delay', 'Earned Value', 'Reports'].map((tab, index) => `<button type="button" class="${index === 0 ? 'active' : ''}">${tab}</button>`).join('')}</nav><div class="detail-content">
    <div class="detail-card wide"><h3>General Activity Details</h3><div class="form-grid">${[['Activity ID', selected.activityId], ['Activity Name', selected.activityName], ['Description', selected.description], ['Duration', `${selected.duration} days`], ['Start Date', fmtDate(selected.startDate)], ['Finish Date', fmtDate(selected.finishDate)], ['Calendar', database.calendars[0].name], ['Activity Type', selected.activityType], ['Priority', selected.priority], ['Status', selected.status], ['Early Start / Finish', `${fmtDate(selected.startDate)} → ${fmtDate(selected.finishDate)}`], ['Late Start / Finish', `${fmtDate(addDays(parseDate(selected.startDate), selected.totalFloat))} → ${fmtDate(addDays(parseDate(selected.finishDate), selected.totalFloat))}`]].map(([label, value]) => `<label>${label}<input value="${escapeHtml(value)}" readonly></label>`).join('')}</div><label class="notes">Activity notebook<textarea readonly>${escapeHtml(selected.description)}. Progress updates automatically refresh status, remaining duration, costs, earned value, delay analysis, reports and project progress.</textarea></label></div>
    <div class="detail-card"><h3>Predecessors</h3>${miniTable(['Activity ID', 'Activity Name', 'Type', 'Lag/Lead'], preds, 'No predecessor')}<h3>Successors</h3>${miniTable(['Activity ID', 'Activity Name', 'Type', 'Lag/Lead'], succs, 'No successor')}</div>
    <div class="detail-card"><h3>Resources Assigned to Activity</h3>${miniTable(['Resource ID', 'Resource Name', 'Type', 'Qty', 'Unit Cost', 'Total Cost'], assignments, 'No resource assignment')}<h3>Resource Histogram</h3><div class="histogram">${database.resources.map(resource => `<span style="height:${Math.min(resource.availability * 3, 92)}%"><b>${resource.resourceId}</b></span>`).join('')}</div></div>
    <div class="detail-card"><h3>Activity Cost Control</h3>${miniTable(['Budget Cost', 'Actual Cost', 'Remaining', 'Forecast', 'Cost Variance'], [[money(cost.budgetCost), money(cost.actualCost), money(cost.remainingCost), money(cost.forecastCost), money(cost.costVariance)]])}<h3>Progress Updates</h3>${miniTable(['Data Date', '% Complete', 'Actual Cost', 'Field Note'], database.progressUpdates.filter(item => item.activityId === selected.activityId).map(item => [fmtDate(item.dataDate), `${item.percentComplete}%`, money(item.actualCost), item.dailyAccomplishment]), 'No field update yet')}</div>
    <div class="detail-card"><h3>Baseline & Delay Analysis</h3>${miniTable(['Baseline Start', 'Baseline Finish', 'Baseline Dur.', 'Baseline Cost', 'Variance'], baseline ? [[fmtDate(baseline.baselineStart), fmtDate(baseline.baselineFinish), `${baseline.baselineDuration}d`, money(baseline.baselineCost), `${selected.delayDays || 0}d`]] : [], 'No baseline saved')}<h3>Delay Logs</h3>${miniTable(['Severity', 'Impact Days', 'Delay Impact'], database.delayLogs.filter(item => item.activityId === selected.activityId).map(item => [item.severity, item.impactDays, item.description]), 'No delay')}</div>
    <div class="detail-card"><h3>Earned Value and S-Curve</h3><div class="kpi-row">${gauge('SPI', t.spi, t.spi < 1)}${gauge('CPI', t.cpi, t.cpi < 1)}${gauge('% Complete', selected.percentComplete / 100)}</div><div class="metrics"><span>PV ${money(t.planned)}</span><span>EV ${money(t.earned)}</span><span>AC ${money(t.actual)}</span><span>SV ${money(t.earned - t.planned)}</span><span>CV ${money(t.earned - t.actual)}</span></div><div class="s-curve"><span class="planned"></span><span class="earned"></span><span class="actual"></span></div><h3>Live Reports</h3><div class="report-list">${database.reports.map(report => `<button type="button">${report.title}<small>${report.format}</small></button>`).join('')}</div></div>
  </div></section>`;
}
function render() {
  const rows = currentRows();
  const selected = activityByCode(selectedActivityId) || database.activities[0];
  const t = totals();
  document.getElementById('root').innerHTML = `<div class="app-shell"><header class="app-header"><div class="brand-block"><span class="brand-mark">▥</span><div><h1>CosTrack Scheduler</h1><p>Enterprise Construction Scheduling & Project Controls System</p></div></div><label class="header-search">⌕<input id="global-search" type="search" value="${escapeHtml(searchTerm)}" placeholder="Search WBS, activities, resources, reports (Ctrl+Q)"><b>⌄</b></label><div class="project-strip"><span>${project().projectId}</span><strong>${project().projectName}</strong><em>${project().client} • ${project().contractor}</em></div><div class="header-actions"><span>Data Date 03-Jun-2026</span><span>⚙</span><div class="avatar">PC</div></div></header>
    <div class="desktop-body"><aside class="sidebar" aria-label="Primary navigation">${sidebarSections.map(([title, items]) => `<section><h2>${title}</h2>${items.map(item => `<button type="button" class="${item === 'Activities' ? 'selected' : ''}"><span class="nav-icon">▣</span>${item}</button>`).join('')}</section>`).join('')}<button type="button" class="collapse">‹ Collapse</button></aside>
    <main class="workspace"><div class="ribbon"><div class="ribbon-tabs">${ribbonTabs.map(tab => `<button type="button" class="${tab === 'Activities' ? 'active' : ''}">${tab}</button>`).join('')}</div><div class="ribbon-actions">${ribbonGroups.map(([title, actions]) => `<div class="ribbon-group">${actions.map(([icon, label, command]) => `<button type="button" data-command="${command}"><span class="ico">${icon}</span><span>${label}</span></button>`).join('')}<small>${title}</small></div>`).join('')}</div></div>
      <div class="module-tabs">${['Activities', 'WBS', 'Relationships', 'Resources', 'Costs', 'Progress', 'Baselines', 'Delay Analysis', 'Earned Value', 'Reports'].map((tab, index) => `<button type="button" class="${index === 0 ? 'active' : ''}">${tab}</button>`).join('')}</div>
      <div class="integration-bar"><span class="connected">● Integrated</span><span>Projects → WBS → Activities → Relationships → Resources → Costs → Progress → Baselines → Delay → EV → Reports</span><span>${escapeHtml(toast)}</span></div>
      <div class="split-pane"><section class="activity-grid"><div class="grid-toolbar"><strong>Activities</strong><span>Central source of truth</span><button type="button" data-command="schedule">Schedule Project</button><button type="button" data-command="progress">Update Progress</button><button type="button" data-command="baseline">Save Baseline</button><button type="button" data-command="reports">Export PDF / Excel / CSV</button></div><table><thead><tr>${['#', 'Activity ID', 'Activity Name', 'Description', 'Dur', 'Start', 'Finish', 'Actual Start', 'Actual Finish', 'Remain', '%', 'TF', 'FF', 'Type', 'Priority', 'Status', 'Budget', 'Actual'].map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(gridRow).join('') : `<tr><td colspan="18" class="empty-state">No integrated records match “${escapeHtml(searchTerm)}”.</td></tr>`}</tbody></table></section>
      <section class="gantt-panel"><div class="gantt-toolbar"><strong>Interactive Gantt Chart</strong><span>Dependency lines: FS / SS / FF / SF with lag and lead</span><select><option>Day</option><option selected>Week</option><option>Month</option></select><input type="range" value="3" aria-label="Zoom"></div><div class="timeline-header"><span>Q1 2026</span><span>Q2 2026</span><span>Q3 2026</span><span>Q4 2026</span><span>Q1 2027</span></div><div class="gantt-canvas" style="height:${Math.max(rows.length * 28 + 24, 420)}px"><div class="today-line"><span>Data Date</span></div>${rows.map((row, index) => row.kind === 'activity' ? `<div class="gantt-row ${row.code === selectedActivityId ? 'selected' : ''}" style="top:${rowTop(index)}px"><div class="baseline" style="left:${row.baselineX}%;width:${row.baselineWidth}%"></div><div class="${row.duration === 0 ? 'milestone' : row.isCritical ? 'critical-bar' : row.status === 'Delayed' ? 'delay-bar' : 'task-bar'}" style="left:${row.x}%;width:${row.width}%">${row.duration === 0 ? '' : `<span class="progress" style="width:${row.percentComplete}%"></span>`}<em>${escapeHtml(row.activityName)}</em></div></div>` : `<div class="gantt-row wbs-gantt" style="top:${rowTop(index)}px"><strong>${escapeHtml(row.code)} ${escapeHtml(row.name)}</strong></div>`).join('')}<svg class="dependency-layer" viewBox="0 0 100 ${Math.max(rows.length * 28 + 24, 420)}" preserveAspectRatio="none">${ganttLines(rows)}</svg></div></section></div>${renderDetails(selected, t)}</main></div><footer class="status-bar"><span>Contract ${money(project().contractAmount)}</span><span>Progress ${project().progressPct}%</span><span>Critical ${t.critical}</span><span>Delayed ${t.delayed}</span><span>SPI ${t.spi.toFixed(2)}</span><span>CPI ${t.cpi.toFixed(2)}</span><span class="connected">Database synchronized</span><span>${database.auditTrail[0]}</span></footer></div>`;
  document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => action(button.dataset.command)));
  document.querySelectorAll('[data-activity]').forEach(row => row.addEventListener('click', () => { if (row.dataset.activity) { selectedActivityId = row.dataset.activity; render(); } }));
  const search = document.getElementById('global-search');
  search.addEventListener('input', event => { searchTerm = event.target.value; render(); document.getElementById('global-search').focus(); });
}
buildBaseline();
database.activities.find(activity => activity.activityId === 'A2030').delayOffset = 5;
database.activities.find(activity => activity.activityId === 'A2020').delayOffset = 2;
recalculateIntegratedModules();
render();
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'q') {
    event.preventDefault();
    document.getElementById('global-search')?.focus();
  }
});
