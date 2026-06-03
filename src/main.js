const DATA_DATE = '2026-06-03';
const DAY = 86400000;
const ribbonTabs = ['File', 'Edit', 'View', 'Project', 'Activities', 'Relationships', 'Schedule', 'Resources', 'Cost', 'Reports', 'Tools', 'Help'];
const moduleTabs = ['Activities', 'WBS', 'Relationships', 'Resources', 'Costs', 'Progress', 'Baselines', 'Delay Analysis', 'Earned Value', 'Reports'];
const detailTabs = ['General', 'Relationships', 'Resources', 'Costs', 'Progress', 'Baselines', 'Delay', 'Earned Value', 'Audit'];
const ribbonGroups = [
  ['Project', [['▣', 'Create Project', 'create-project'], ['▤', 'Open Project', 'open-project'], ['✎', 'Edit Project', 'edit-project'], ['◴', 'Archive Project', 'archive-project']]],
  ['WBS', [['＋', 'Add WBS', 'add-wbs'], ['▾', 'Expand', 'expand-wbs'], ['▸', 'Collapse', 'collapse-wbs'], ['⇥', 'Indent', 'indent'], ['⇤', 'Outdent', 'outdent']]],
  ['Activities', [['＋', 'Add Activity', 'add-activity'], ['✎', 'Inline Edit', 'edit-activity'], ['⧉', 'Duplicate', 'duplicate-activity'], ['↑', 'Move Up', 'move-up'], ['×', 'Delete', 'delete-activity']]],
  ['Relationships', [['🔗', 'Add FS Link', 'add-relationship'], ['SS', 'Add SS', 'add-ss'], ['FF', 'Add FF', 'add-ff'], ['↦', 'Lag +1d', 'add-lag'], ['↤', 'Lead -1d', 'add-lead']]],
  ['Schedule', [['∑', 'Schedule Project', 'schedule'], ['⚠', 'Analyze Delays', 'delay-analysis'], ['▰', 'Save Baseline', 'baseline'], ['▱', 'Compare Baseline', 'compare-baseline']]],
  ['Resources / Cost', [['☷', 'Assign Resource', 'assign-resource'], ['≋', 'Level Resources', 'level-resources'], ['▤', 'Histogram', 'histogram'], ['$', 'Cost Load', 'cost-loading']]],
  ['Progress / Reports', [['↻', 'Update Progress', 'progress'], ['EV', 'Update EV', 'earned-value'], ['⎙', 'PDF', 'export-pdf'], ['▦', 'Excel', 'export-xlsx'], ['CSV', 'CSV', 'export-csv']]],
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
const seedActivities = [
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
];
const database = {
  projects: [{ id: 'p1', projectId: 'CT-MMC-2026', projectName: 'Metro Medical Center Expansion', client: 'Apex Health Authority', contractor: 'CEM Works JV', contractAmount: 48200000, startDate: '2026-01-01', finishDate: '2027-02-12', status: 'In Progress' }],
  calendars: [{ id: 'cal-std', projectId: 'p1', name: 'Standard 5 Day Workweek', calendarType: 'Project', workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }],
  wbs: [['w1', null, '1.0', 'Pre-Construction'], ['w2', null, '2.0', 'Site Preparation'], ['w3', null, '3.0', 'Foundation Works'], ['w4', null, '4.0', 'Structural Works'], ['w5', null, '5.0', 'Architectural Works'], ['w6', null, '6.0', 'MEP Works'], ['w7', null, '7.0', 'Finishing Works'], ['w8', null, '8.0', 'Turnover']].map(([id, parentId, code, name]) => ({ id, projectId: 'p1', parentId, code, name, expanded: true })),
  activities: seedActivities.map(([activityId, wbsId, activityName, description, duration, activityType, priority, status, percentComplete, startDate, finishDate, actualStart, actualFinish, budgetCost, actualCost, totalFloat], index) => ({ id: `act-${index + 1}`, projectId: 'p1', wbsId, calendarId: 'cal-std', activityId, activityName, description, duration, activityType, priority, status, percentComplete, startDate, finishDate, actualStart, actualFinish, remainingDuration: Math.ceil(duration * (1 - percentComplete / 100)), totalFloat, freeFloat: Math.max(totalFloat - 1, 0), isCritical: totalFloat === 0 && status !== 'Completed' })),
  relationships: [['A1000', 'A1010', 'FS', 0], ['A1010', 'A1020', 'FS', 0], ['A1020', 'A2010', 'FS', 1], ['A2010', 'A2020', 'SS', 10], ['A2020', 'A2030', 'FS', 1], ['A2030', 'A3010', 'FS', 0], ['A3010', 'A3020', 'FS', 0], ['A3020', 'A4010', 'FS', 0], ['A4010', 'A4020', 'SS', 14], ['A4010', 'A5010', 'FS', 1], ['A4020', 'A6010', 'FS', 0], ['A5010', 'A7010', 'FS', 0], ['A6010', 'A7010', 'FF', 0], ['A7010', 'A5000', 'FS', 0]].map(([predecessorId, successorId, type, lagDays], id) => ({ id: `rel-${id + 1}`, predecessorId, successorId, type, lagDays })),
  resources: [['r1', 'LAB-CIV-01', 'Civil Crew A', 'Labor', 62, 18], ['r2', 'EQ-EXC-45', 'Excavator 45T', 'Equipment', 1350, 2], ['r3', 'MAT-CONC', 'Ready Mix Concrete', 'Material', 142, 2400], ['r4', 'SUB-MEP', 'MEP Subcontractor', 'Subcontractor', 2100000, 1], ['r5', 'LAB-FIN-02', 'Finishing Crew B', 'Labor', 58, 24]].map(([id, resourceId, name, type, unitCost, availability]) => ({ id, resourceId, name, type, unitCost, availability })),
  activityResources: [['A2010', 'r1', 18, 20], ['A2020', 'r2', 2, 28], ['A3020', 'r3', 2400, 1], ['A4020', 'r4', 1, 1], ['A7010', 'r5', 24, 45]].map(([activityId, resourceId, quantity, units]) => ({ id: `ar-${activityId}-${resourceId}`, activityId, resourceId, quantity, units })),
  baselines: [{ id: 'bl1', projectId: 'p1', name: 'Approved Contract Baseline', savedAt: '2026-01-01' }],
  baselineActivities: [],
  progressUpdates: [],
  delayLogs: [],
  earnedValue: [],
  reports: [],
  exports: [],
  auditTrail: ['Central database loaded: WBS must exist before activity creation.'],
};
const state = { selectedActivityId: 'A2030', selectedWbsId: 'w2', activeModule: 'Activities', activeDetailTab: 'General', searchTerm: '', toast: 'Live integration ready: every module is driven by Activities.', filter: 'All', showLogicTrace: true };
const project = () => database.projects[0];
const parseDate = value => new Date(`${value}T00:00:00Z`);
const addDays = (date, days) => new Date(date.getTime() + days * DAY);
const isoDate = date => date.toISOString().slice(0, 10);
const fmtDate = value => value ? parseDate(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).replace(/ /g, '-') : '—';
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const safeRatio = (a, b) => b > 0 ? a / b : 0;
const activityByCode = code => database.activities.find(activity => activity.activityId === code);
const wbsById = id => database.wbs.find(wbs => wbs.id === id);
const resourceById = id => database.resources.find(resource => resource.id === id);
function log(message) { database.auditTrail.unshift(`${new Date().toISOString().slice(11, 19)} ${message}`); state.toast = message; }
function plannedPercent(activity) {
  const dataDate = parseDate(DATA_DATE);
  const start = parseDate(activity.startDate);
  const finish = parseDate(activity.finishDate);
  if (dataDate <= start) return 0;
  if (dataDate >= finish) return 100;
  return Math.round(((dataDate - start) / Math.max(finish - start, DAY)) * 100);
}
function activityAssignments(activity) { return database.activityResources.filter(assignment => assignment.activityId === activity.activityId); }
function activityCost(activity) {
  const resourceCost = activityAssignments(activity).reduce((sum, assignment) => sum + ((resourceById(assignment.resourceId)?.unitCost || 0) * assignment.quantity * assignment.units), 0);
  const budgetCost = Math.max(activity.budgetCost, resourceCost);
  const actualCost = activity.actualCost;
  const remainingCost = Math.max(budgetCost - actualCost, 0);
  const riskFactor = activity.status.includes('Delay') || activity.status === 'Delayed' ? 1.08 : 1.02;
  return { budgetCost, actualCost, remainingCost, forecastCost: actualCost + remainingCost * riskFactor, costVariance: budgetCost - actualCost, plannedValue: budgetCost * plannedPercent(activity) / 100, earnedValue: budgetCost * activity.percentComplete / 100 };
}
function buildBaseline(name = 'Approved Contract Baseline') {
  const id = `bl${database.baselines.length + 1}`;
  if (!database.baselines.some(baseline => baseline.name === name)) database.baselines.push({ id, projectId: 'p1', name, savedAt: DATA_DATE });
  database.baselineActivities = database.activities.map(activity => ({ baselineId: 'bl1', activityId: activity.activityId, baselineStart: activity.startDate, baselineFinish: activity.finishDate, baselineDuration: activity.duration, baselineCost: activityCost(activity).budgetCost }));
}
function recalculateIntegratedModules(reason = 'Integrated recalculation completed') {
  const startMin = Math.min(...database.activities.map(activity => parseDate(activity.startDate).getTime()));
  const finishMax = Math.max(...database.activities.map(activity => parseDate(activity.finishDate).getTime()));
  const spanDays = Math.max(Math.ceil((finishMax - startMin) / DAY), 1);
  database.activities.forEach(activity => {
    activity.remainingDuration = Math.max(Math.ceil(activity.duration * (1 - activity.percentComplete / 100)), 0);
    activity.actualFinish = activity.percentComplete >= 100 ? activity.actualFinish || activity.finishDate : null;
    const baseline = database.baselineActivities.find(item => item.activityId === activity.activityId);
    const baselineDelay = baseline ? Math.ceil((parseDate(activity.finishDate) - parseDate(baseline.baselineFinish)) / DAY) : 0;
    activity.delayDays = Math.max(baselineDelay, activity.delayOffset || 0, 0);
    activity.isCritical = activity.totalFloat <= 0 && activity.status !== 'Completed';
    if (activity.status !== 'Completed') activity.status = activity.delayDays > 0 ? (activity.isCritical ? 'Critical Delay' : 'Delayed') : (activity.percentComplete > 0 ? 'In Progress' : 'Not Started');
    activity.x = Math.max(((parseDate(activity.startDate) - startMin) / DAY / spanDays) * 100, 0);
    activity.width = Math.max((Math.max(activity.duration, 1) / spanDays) * 100, activity.duration === 0 ? 1 : 2.4);
    activity.baselineX = baseline ? Math.max(((parseDate(baseline.baselineStart) - startMin) / DAY / spanDays) * 100, 0) : activity.x;
    activity.baselineWidth = baseline ? Math.max((Math.max(baseline.baselineDuration, 1) / spanDays) * 100, 1) : activity.width;
  });
  database.delayLogs = database.activities.filter(activity => activity.delayDays > 0).map(activity => ({ id: `delay-${activity.activityId}`, projectId: 'p1', activityId: activity.activityId, delayType: 'Forecast Finish > Baseline Finish', severity: activity.isCritical ? 'Critical' : 'High', impactDays: activity.delayDays, description: `${activity.activityName} is ${activity.delayDays} day(s) beyond the approved baseline.` }));
  database.earnedValue = database.activities.map(activity => { const cost = activityCost(activity); return { id: `ev-${activity.activityId}`, activityId: activity.activityId, dataDate: DATA_DATE, ...cost, spi: safeRatio(cost.earnedValue, cost.plannedValue), cpi: safeRatio(cost.earnedValue, cost.actualCost), scheduleVariance: cost.earnedValue - cost.plannedValue, costVarianceEv: cost.earnedValue - cost.actualCost }; });
  database.reports = ['Schedule Report', 'Cost Report', 'Resource Report', 'Progress Report', 'Delay Report', 'Earned Value Report', 'Baseline Variance Report'].map((reportType, index) => ({ id: `rep-${index + 1}`, projectId: 'p1', reportType, format: 'PDF / Excel / CSV', title: `${project().projectId} ${reportType}`, generatedAt: 'Live', payload: 'Activities, WBS, relationships, resources, costs, progress, baselines, delays and earned value' }));
  const totalBudget = database.activities.reduce((sum, activity) => sum + activityCost(activity).budgetCost, 0);
  const earned = database.activities.reduce((sum, activity) => sum + activityCost(activity).earnedValue, 0);
  project().progressPct = Math.round(safeRatio(earned, totalBudget) * 100);
  project().finishDate = database.activities.at(-1)?.finishDate || project().finishDate;
  log(reason);
}
function scheduleProject() {
  database.relationships.forEach(relationship => {
    const predecessor = activityByCode(relationship.predecessorId);
    const successor = activityByCode(relationship.successorId);
    if (!predecessor || !successor || successor.status === 'Completed') return;
    const predStart = parseDate(predecessor.startDate);
    const predFinish = parseDate(predecessor.finishDate);
    let candidate = predFinish;
    if (relationship.type === 'SS') candidate = predStart;
    if (relationship.type === 'FF') candidate = addDays(predFinish, -successor.duration);
    if (relationship.type === 'SF') candidate = addDays(predStart, -successor.duration);
    candidate = addDays(candidate, relationship.lagDays);
    if (candidate > parseDate(successor.startDate)) {
      successor.startDate = isoDate(candidate);
      successor.finishDate = isoDate(addDays(candidate, successor.duration));
    }
  });
  const projectFinish = Math.max(...database.activities.map(activity => parseDate(activity.finishDate).getTime()));
  database.activities.forEach(activity => {
    const successors = database.relationships.filter(rel => rel.predecessorId === activity.activityId).map(rel => activityByCode(rel.successorId)).filter(Boolean);
    const nextStart = successors.length ? Math.min(...successors.map(successor => parseDate(successor.startDate).getTime())) : projectFinish;
    activity.freeFloat = Math.max(Math.floor((nextStart - parseDate(activity.finishDate).getTime()) / DAY), 0);
    activity.totalFloat = activity.freeFloat;
  });
  recalculateIntegratedModules('Schedule Project recalculated successors, float, critical path, delay, costs, EV and reports.');
}
function updateProgress() {
  const selected = activityByCode(state.selectedActivityId);
  selected.percentComplete = Math.min(selected.percentComplete + 10, 100);
  selected.actualStart ||= selected.startDate;
  selected.actualCost = Math.min(activityCost(selected).budgetCost * (selected.percentComplete / 100) * 1.04, activityCost(selected).budgetCost * 1.12);
  database.progressUpdates.unshift({ id: `pu-${database.progressUpdates.length + 1}`, activityId: selected.activityId, projectId: 'p1', dataDate: DATA_DATE, percentComplete: selected.percentComplete, actualCost: selected.actualCost, dailyAccomplishment: `${selected.activityName} updated from field progress entry.` });
  recalculateIntegratedModules(`Progress update posted for ${selected.activityId}; status, remaining duration, cost, EV, delay and reports refreshed.`);
}
function addActivity(duplicate = false) {
  if (!database.wbs.length) return log('Blocked: create WBS before adding activities.');
  const source = duplicate ? activityByCode(state.selectedActivityId) : null;
  const selected = source || activityByCode(state.selectedActivityId) || database.activities.at(-1);
  const newCode = `A${8100 + database.activities.length * 10}`;
  const start = selected?.finishDate || project().startDate;
  const activity = { id: `act-${Date.now()}`, projectId: 'p1', wbsId: source?.wbsId || state.selectedWbsId || database.wbs[0].id, calendarId: 'cal-std', activityId: newCode, activityName: duplicate ? `${source.activityName} Copy` : 'New Integrated Construction Activity', description: duplicate ? source.description : 'Created from the Activities ribbon and immediately connected to WBS, Gantt, cost, progress and reports.', duration: duplicate ? source.duration : 15, activityType: source?.activityType || 'Task Dependent', priority: source?.priority || 'Normal', status: 'Not Started', percentComplete: 0, startDate: start, finishDate: isoDate(addDays(parseDate(start), duplicate ? source.duration : 15)), actualStart: null, actualFinish: null, budgetCost: duplicate ? Math.round(source.budgetCost * .95) : 250000, actualCost: 0, totalFloat: 5, freeFloat: 4 };
  database.activities.splice(Math.max(database.activities.length - 1, 0), 0, activity);
  if (selected) database.relationships.push({ id: `rel-${Date.now()}`, predecessorId: selected.activityId, successorId: newCode, type: 'FS', lagDays: 0 });
  state.selectedActivityId = newCode;
  state.selectedWbsId = activity.wbsId;
  recalculateIntegratedModules(`${newCode} added under ${wbsById(activity.wbsId)?.code}; grid, Gantt, relationships, costs, EV and reports synchronized.`);
}
function addWbs() {
  const next = database.wbs.length + 1;
  const wbs = { id: `w${Date.now()}`, projectId: 'p1', parentId: null, code: `${next}.0`, name: `New Construction Phase ${next}`, expanded: true };
  database.wbs.push(wbs);
  state.selectedWbsId = wbs.id;
  log(`WBS ${wbs.code} created. Activities can now be added below this phase.`);
  render();
}
function addRelationship(type = 'FS') {
  const selectedIndex = database.activities.findIndex(activity => activity.activityId === state.selectedActivityId);
  const predecessor = database.activities[Math.max(selectedIndex - 1, 0)];
  const successor = database.activities[selectedIndex] || database.activities[0];
  if (!predecessor || !successor || predecessor.activityId === successor.activityId) return log('Relationship requires two different activities.');
  const exists = database.relationships.some(rel => rel.predecessorId === predecessor.activityId && rel.successorId === successor.activityId && rel.type === type);
  if (!exists) database.relationships.push({ id: `rel-${Date.now()}`, predecessorId: predecessor.activityId, successorId: successor.activityId, type, lagDays: 0 });
  scheduleProject();
  log(`${type} relationship linked ${predecessor.activityId} → ${successor.activityId}; successor schedule recalculated.`);
  render();
}
function adjustLag(delta) {
  const relationship = database.relationships.find(rel => rel.successorId === state.selectedActivityId) || database.relationships.at(-1);
  if (!relationship) return log('No relationship available for lag/lead adjustment.');
  relationship.lagDays += delta;
  scheduleProject();
  log(`${delta > 0 ? 'Lag' : 'Lead'} applied to ${relationship.predecessorId} → ${relationship.successorId}; network recalculated.`);
  render();
}
function assignResource() {
  const selected = activityByCode(state.selectedActivityId);
  const resource = database.resources.find(item => !activityAssignments(selected).some(assignment => assignment.resourceId === item.id)) || database.resources[0];
  database.activityResources.push({ id: `ar-${Date.now()}`, activityId: selected.activityId, resourceId: resource.id, quantity: Math.min(resource.availability, 4), units: Math.max(selected.remainingDuration || selected.duration || 1, 1) });
  recalculateIntegratedModules(`${resource.resourceId} assigned to ${selected.activityId}; budget, forecast, EV and resource usage updated.`);
}
function resourceDemand(resourceId) { return database.activityResources.filter(a => a.resourceId === resourceId).reduce((sum, assignment) => sum + assignment.quantity, 0); }
function levelResources() {
  let pushed = 0;
  database.resources.forEach(resource => {
    const over = resourceDemand(resource.id) - resource.availability;
    if (over > 0) database.activityResources.filter(a => a.resourceId === resource.id).slice(1).forEach(assignment => {
      const activity = activityByCode(assignment.activityId);
      if (activity && activity.status !== 'Completed') { activity.startDate = isoDate(addDays(parseDate(activity.startDate), 2)); activity.finishDate = isoDate(addDays(parseDate(activity.finishDate), 2)); pushed += 2; }
    });
  });
  recalculateIntegratedModules(pushed ? `Resource leveling resolved over-allocation by shifting affected work ${pushed} total day(s).` : 'Resource leveling complete: no over-allocation detected.');
}
function exportReport(format) {
  database.exports.unshift({ id: `ex-${Date.now()}`, format, report: state.activeModule, generatedAt: DATA_DATE, status: 'Ready' });
  log(`${state.activeModule} live report exported to ${format.toUpperCase()} from current activity database.`);
  render();
}
function action(command) {
  const map = { 'add-activity': () => addActivity(false), 'duplicate-activity': () => addActivity(true), 'add-wbs': addWbs, schedule: scheduleProject, progress: updateProgress, baseline: () => { buildBaseline('User Baseline Snapshot'); recalculateIntegratedModules('Baseline saved and variance tables regenerated.'); }, 'compare-baseline': () => { state.activeModule = 'Baselines'; state.activeDetailTab = 'Baselines'; recalculateIntegratedModules('Baseline comparison refreshed against current forecast.'); }, 'add-relationship': () => addRelationship('FS'), 'add-ss': () => addRelationship('SS'), 'add-ff': () => addRelationship('FF'), 'add-lag': () => adjustLag(1), 'add-lead': () => adjustLag(-1), 'assign-resource': assignResource, 'level-resources': levelResources, 'export-pdf': () => exportReport('pdf'), 'export-xlsx': () => exportReport('excel'), 'export-csv': () => exportReport('csv'), 'delay-analysis': () => { state.activeModule = 'Delay Analysis'; state.activeDetailTab = 'Delay'; recalculateIntegratedModules('Delay analysis refreshed from baseline vs forecast finish dates.'); }, 'earned-value': () => { state.activeModule = 'Earned Value'; state.activeDetailTab = 'Earned Value'; recalculateIntegratedModules('Earned value metrics recalculated from PV, EV and AC.'); }, 'cost-loading': () => { state.activeModule = 'Costs'; state.activeDetailTab = 'Costs'; recalculateIntegratedModules('Cost loading refreshed from activity resource assignments.'); }, histogram: () => { state.activeModule = 'Resources'; state.activeDetailTab = 'Resources'; log('Resource histogram view activated.'); render(); } };
  (map[command] || (() => { log(`${command.replaceAll('-', ' ')} executed against the centralized project database.`); render(); }))();
}
function totals() {
  const budget = database.activities.reduce((sum, activity) => sum + activityCost(activity).budgetCost, 0);
  const actual = database.activities.reduce((sum, activity) => sum + activityCost(activity).actualCost, 0);
  const planned = database.activities.reduce((sum, activity) => sum + activityCost(activity).plannedValue, 0);
  const earned = database.activities.reduce((sum, activity) => sum + activityCost(activity).earnedValue, 0);
  return { budget, actual, planned, earned, spi: safeRatio(earned, planned), cpi: safeRatio(earned, actual), delayed: database.delayLogs.length, critical: database.activities.filter(activity => activity.isCritical).length };
}
function visibleRows() {
  const term = state.searchTerm.trim().toLowerCase();
  const rows = [];
  database.wbs.forEach(wbs => {
    const children = database.activities.filter(activity => activity.wbsId === wbs.id);
    const percent = children.length ? Math.round(children.reduce((sum, activity) => sum + activity.percentComplete, 0) / children.length) : 0;
    rows.push({ kind: 'wbs', code: wbs.code, id: wbs.id, name: wbs.name, level: 0, duration: children.reduce((sum, a) => sum + a.duration, 0), startDate: children[0]?.startDate, finishDate: children.at(-1)?.finishDate, percentComplete: percent, status: percent === 100 ? 'Completed' : 'WBS Summary', totalFloat: '', freeFloat: '', isCritical: children.some(a => a.isCritical), budgetCost: children.reduce((sum, a) => sum + activityCost(a).budgetCost, 0), actualCost: children.reduce((sum, a) => sum + activityCost(a).actualCost, 0) });
    if (wbs.expanded) children.forEach(activity => rows.push({ kind: 'activity', code: activity.activityId, level: 1, ...activity, name: activity.activityName, wbsCode: wbs.code }));
  });
  return rows.filter(row => {
    const matchesText = !term || [row.code, row.name, row.status, row.wbsCode].join(' ').toLowerCase().includes(term);
    const matchesFilter = state.filter === 'All' || (state.filter === 'Critical' && row.isCritical) || (state.filter === 'Delayed' && row.status?.includes('Delay')) || (state.filter === 'In Progress' && row.status === 'In Progress');
    return matchesText && matchesFilter;
  });
}
function rowTop(index) { return 8 + index * 28; }
function statusClass(value) { return String(value).toLowerCase().replaceAll(' ', '-'); }
function miniTable(headers, rows, empty = 'No records') { return `<table class="mini-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${headers.length}">${empty}</td></tr>`}</tbody></table>`; }
function gridRow(row, index) {
  const cost = row.kind === 'activity' ? activityCost(row) : { budgetCost: row.budgetCost, actualCost: row.actualCost };
  return `<tr data-activity="${row.kind === 'activity' ? row.code : ''}" data-wbs="${row.kind === 'wbs' ? row.id : ''}" class="${row.code === state.selectedActivityId ? 'active-row' : ''} ${row.id === state.selectedWbsId ? 'selected-wbs' : ''} ${row.isCritical ? 'critical-row' : ''} ${row.kind === 'wbs' ? 'wbs-row' : ''}"><td>${index + 1}</td><td class="id-cell" style="padding-left:${8 + row.level * 18}px">${row.kind === 'wbs' ? (wbsById(row.id)?.expanded ? '▾ ' : '▸ ') : ''}${escapeHtml(row.code)}</td><td class="name-cell">${escapeHtml(row.name)}</td><td>${row.kind === 'activity' ? escapeHtml(row.description) : 'Hierarchical WBS control account'}</td><td>${row.duration || 0}</td><td>${fmtDate(row.startDate)}</td><td>${fmtDate(row.finishDate)}</td><td>${fmtDate(row.actualStart)}</td><td>${fmtDate(row.actualFinish)}</td><td>${row.remainingDuration ?? 0}</td><td>${row.percentComplete ?? 0}%</td><td>${row.totalFloat}</td><td>${row.freeFloat}</td><td>${row.activityType || 'WBS'}</td><td>${row.priority || '—'}</td><td><span class="status ${statusClass(row.status)}">${row.status}</span></td><td>${money(cost.budgetCost)}</td><td>${money(cost.actualCost)}</td></tr>`;
}
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
    return `<polyline points="${x1},${y1} ${midX},${y1} ${midX},${y2} ${x2},${y2}"/><text x="${midX + .4}" y="${Math.min(y1, y2) + 6}">${rel.type}${rel.lagDays ? rel.lagDays > 0 ? `+${rel.lagDays}` : rel.lagDays : ''}</text>`;
  }).join('');
}
function gauge(label, value, warn = false) { const pct = Math.min(Math.max(value, 0), 1); const display = label === '% Complete' ? `${Math.round(value * 100)}%` : value.toFixed(2); return `<div class="gauge"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.5"></circle><circle class="${warn ? 'warn' : ''}" cx="21" cy="21" r="15.5" stroke-dasharray="${pct * 100} 100"></circle></svg><strong>${display}</strong><span>${label}</span></div>`; }
function renderModulePanel(t) {
  const selected = activityByCode(state.selectedActivityId);
  if (state.activeModule === 'Relationships') return miniTable(['Pred', 'Successor', 'Type', 'Lag/Lead'], database.relationships.map(r => [r.predecessorId, r.successorId, r.type, `${r.lagDays}d`]));
  if (state.activeModule === 'Resources') return `${miniTable(['Resource ID', 'Name', 'Type', 'Unit Cost', 'Availability', 'Demand'], database.resources.map(r => [r.resourceId, r.name, r.type, money(r.unitCost), r.availability, resourceDemand(r.id)]))}<div class="histogram wide-histogram">${database.resources.map(resource => `<span class="${resourceDemand(resource.id) > resource.availability ? 'over' : ''}" style="height:${Math.min(Math.max(resourceDemand(resource.id) / resource.availability * 80, 12), 96)}%"><b>${resource.resourceId}</b></span>`).join('')}</div>`;
  if (state.activeModule === 'Costs') return miniTable(['Activity', 'Budget', 'Actual', 'Remaining', 'Forecast', 'Variance'], database.activities.map(a => { const c = activityCost(a); return [a.activityId, money(c.budgetCost), money(c.actualCost), money(c.remainingCost), money(c.forecastCost), money(c.costVariance)]; }));
  if (state.activeModule === 'Progress') return miniTable(['Data Date', 'Activity', '% Complete', 'Actual Cost', 'Field Note'], database.progressUpdates.map(u => [fmtDate(u.dataDate), u.activityId, `${u.percentComplete}%`, money(u.actualCost), u.dailyAccomplishment]), 'No progress updates posted yet');
  if (state.activeModule === 'Baselines') return miniTable(['Activity', 'Baseline Start', 'Baseline Finish', 'Duration', 'Baseline Cost', 'Variance Days'], database.baselineActivities.map(b => { const a = activityByCode(b.activityId); return [b.activityId, fmtDate(b.baselineStart), fmtDate(b.baselineFinish), `${b.baselineDuration}d`, money(b.baselineCost), `${a?.delayDays || 0}d`]; }));
  if (state.activeModule === 'Delay Analysis') return miniTable(['Activity', 'Severity', 'Delay Days', 'Delay Impact'], database.delayLogs.map(d => [d.activityId, d.severity, d.impactDays, d.description]), 'No delayed activities');
  if (state.activeModule === 'Earned Value') return `${miniTable(['Activity', 'PV', 'EV', 'AC', 'SPI', 'CPI', 'SV', 'CV'], database.earnedValue.map(ev => [ev.activityId, money(ev.plannedValue), money(ev.earnedValue), money(ev.actualCost), ev.spi.toFixed(2), ev.cpi.toFixed(2), money(ev.scheduleVariance), money(ev.costVarianceEv)]))}<div class="ev-strip">${gauge('SPI', t.spi, t.spi < 1)}${gauge('CPI', t.cpi, t.cpi < 1)}<div class="s-curve"><span class="planned"></span><span class="earned"></span><span class="actual"></span></div></div>`;
  if (state.activeModule === 'Reports') return `${miniTable(['Report', 'Format', 'Source', 'Generated'], database.reports.map(r => [r.title, r.format, r.payload, r.generatedAt]))}${miniTable(['Export', 'Module', 'Format', 'Status'], database.exports.map(e => [e.id, e.report, e.format.toUpperCase(), e.status]), 'No exports in this session')}`;
  if (state.activeModule === 'WBS') return miniTable(['WBS Code', 'WBS Name', 'Activities', 'Budget', 'Actual', 'Progress'], database.wbs.map(w => { const children = database.activities.filter(a => a.wbsId === w.id); return [w.code, w.name, children.length, money(children.reduce((s, a) => s + activityCost(a).budgetCost, 0)), money(children.reduce((s, a) => s + activityCost(a).actualCost, 0)), `${children.length ? Math.round(children.reduce((s, a) => s + a.percentComplete, 0) / children.length) : 0}%`]; }));
  return `<div class="module-summary"><strong>${selected.activityId} is the active source record.</strong><span>All visible modules are recalculated from this activity network: relationships, resource usage, costs, progress, baseline variance, delays, EV and live reports.</span></div>`;
}
function renderDetailPanel(selected, t) {
  const preds = database.relationships.filter(rel => rel.successorId === selected.activityId).map(rel => [rel.predecessorId, activityByCode(rel.predecessorId)?.activityName || '', rel.type, `${rel.lagDays}d`]);
  const succs = database.relationships.filter(rel => rel.predecessorId === selected.activityId).map(rel => [rel.successorId, activityByCode(rel.successorId)?.activityName || '', rel.type, `${rel.lagDays}d`]);
  const assignments = activityAssignments(selected).map(item => { const resource = resourceById(item.resourceId); return [resource.resourceId, resource.name, resource.type, item.quantity, money(resource.unitCost), money(resource.unitCost * item.quantity * item.units)]; });
  const cost = activityCost(selected);
  const baseline = database.baselineActivities.find(item => item.activityId === selected.activityId);
  const panels = {
    General: `<div class="detail-card wide"><h3>General Activity Details</h3><div class="form-grid">${[['Activity ID', selected.activityId], ['Activity Name', selected.activityName], ['WBS', `${wbsById(selected.wbsId)?.code} ${wbsById(selected.wbsId)?.name}`], ['Duration', `${selected.duration} days`], ['Start Date', fmtDate(selected.startDate)], ['Finish Date', fmtDate(selected.finishDate)], ['Calendar', database.calendars[0].name], ['Activity Type', selected.activityType], ['Priority', selected.priority], ['Status', selected.status], ['Total Float', `${selected.totalFloat} days`], ['Free Float', `${selected.freeFloat} days`]].map(([label, value]) => `<label>${label}<input value="${escapeHtml(value)}" readonly></label>`).join('')}</div><label class="notes">Description<textarea readonly>${escapeHtml(selected.description)}</textarea></label></div>`,
    Relationships: `<div class="detail-card"><h3>Predecessors</h3>${miniTable(['Activity ID', 'Activity Name', 'Type', 'Lag/Lead'], preds, 'No predecessor')}</div><div class="detail-card"><h3>Successors</h3>${miniTable(['Activity ID', 'Activity Name', 'Type', 'Lag/Lead'], succs, 'No successor')}</div>`,
    Resources: `<div class="detail-card wide"><h3>Resources Assigned to Activity</h3>${miniTable(['Resource ID', 'Resource Name', 'Type', 'Qty', 'Unit Cost', 'Total Cost'], assignments, 'No resource assignment')}<div class="histogram">${database.resources.map(resource => `<span class="${resourceDemand(resource.id) > resource.availability ? 'over' : ''}" style="height:${Math.min(Math.max(resourceDemand(resource.id) / resource.availability * 80, 12), 96)}%"><b>${resource.resourceId}</b></span>`).join('')}</div></div>`,
    Costs: `<div class="detail-card"><h3>Activity Cost Control</h3>${miniTable(['Budget Cost', 'Actual Cost', 'Remaining Cost', 'Forecast Cost', 'Cost Variance'], [[money(cost.budgetCost), money(cost.actualCost), money(cost.remainingCost), money(cost.forecastCost), money(cost.costVariance)]])}</div>`,
    Progress: `<div class="detail-card wide"><h3>Progress Updates</h3>${miniTable(['Data Date', '% Complete', 'Actual Cost', 'Daily Accomplishment'], database.progressUpdates.filter(item => item.activityId === selected.activityId).map(item => [fmtDate(item.dataDate), `${item.percentComplete}%`, money(item.actualCost), item.dailyAccomplishment]), 'No field update yet')}</div>`,
    Baselines: `<div class="detail-card"><h3>Baseline Variance</h3>${miniTable(['Baseline Start', 'Baseline Finish', 'Duration', 'Cost', 'Variance'], baseline ? [[fmtDate(baseline.baselineStart), fmtDate(baseline.baselineFinish), `${baseline.baselineDuration}d`, money(baseline.baselineCost), `${selected.delayDays || 0}d`]] : [], 'No baseline saved')}</div>`,
    Delay: `<div class="detail-card wide"><h3>Delay Analysis</h3>${miniTable(['Severity', 'Impact Days', 'Delay Impact'], database.delayLogs.filter(item => item.activityId === selected.activityId).map(item => [item.severity, item.impactDays, item.description]), 'No delay')}</div>`,
    'Earned Value': `<div class="detail-card ev-card"><h3>Earned Value & S-Curve</h3><div class="kpi-row">${gauge('SPI', t.spi, t.spi < 1)}${gauge('CPI', t.cpi, t.cpi < 1)}${gauge('% Complete', selected.percentComplete / 100)}</div><div class="metrics"><span>PV ${money(cost.plannedValue)}</span><span>EV ${money(cost.earnedValue)}</span><span>AC ${money(cost.actualCost)}</span><span>SV ${money(cost.earnedValue - cost.plannedValue)}</span><span>CV ${money(cost.earnedValue - cost.actualCost)}</span></div><div class="s-curve"><span class="planned"></span><span class="earned"></span><span class="actual"></span></div></div>`,
    Audit: `<div class="detail-card wide"><h3>Integration Audit Trail</h3>${miniTable(['Event'], database.auditTrail.slice(0, 12).map(event => [event]))}</div>`,
  };
  return `<section class="details-panel"><nav>${detailTabs.map(tab => `<button type="button" data-detail-tab="${tab}" class="${state.activeDetailTab === tab ? 'active' : ''}">${tab}</button>`).join('')}</nav><div class="detail-content">${panels[state.activeDetailTab] || panels.General}<div class="detail-card module-panel"><h3>${state.activeModule} Live Module</h3>${renderModulePanel(t)}</div>${state.showLogicTrace ? `<div class="detail-card trace-panel"><h3>Automatic Propagation Trace</h3><ol><li>Activity row changes</li><li>Relationships recalculate dates and float</li><li>Resources update budget and histograms</li><li>Progress updates status, remaining duration and actual cost</li><li>Baseline comparison creates delay logs</li><li>EV, S-curve and live reports refresh</li></ol></div>` : ''}</div></section>`;
}
function render() {
  const rows = visibleRows();
  const selected = activityByCode(state.selectedActivityId) || database.activities[0];
  const t = totals();
  document.getElementById('root').innerHTML = `<div class="app-shell"><header class="app-header"><div class="brand-block"><span class="brand-mark">▥</span><div><h1>CosTrack Scheduler</h1><p>Enterprise Construction Scheduling & Project Controls System</p></div></div><label class="header-search">⌕<input id="global-search" type="search" value="${escapeHtml(state.searchTerm)}" placeholder="Search WBS, activities, resources, reports (Ctrl+Q)"><b>⌄</b></label><div class="project-strip"><span>${project().projectId}</span><strong>${project().projectName}</strong><em>${project().client} • ${project().contractor}</em></div><div class="header-actions"><span>Data Date ${fmtDate(DATA_DATE)}</span><button type="button" data-command="schedule">Schedule Project</button><div class="avatar">PC</div></div></header><div class="desktop-body"><aside class="sidebar" aria-label="Primary navigation">${sidebarSections.map(([title, items]) => `<section><h2>${title}</h2>${items.map(item => `<button type="button" data-sidebar="${item}" class="${item === 'Activities' ? 'selected' : ''}"><span class="nav-icon">▣</span>${item}</button>`).join('')}</section>`).join('')}<button type="button" class="collapse">‹ Collapse</button></aside><main class="workspace"><div class="ribbon"><div class="ribbon-tabs">${ribbonTabs.map(tab => `<button type="button" class="${tab === 'Activities' ? 'active' : ''}">${tab}</button>`).join('')}</div><div class="ribbon-actions">${ribbonGroups.map(([title, actions]) => `<div class="ribbon-group">${actions.map(([icon, label, command]) => `<button type="button" data-command="${command}"><span class="ico">${icon}</span><span>${label}</span></button>`).join('')}<small>${title}</small></div>`).join('')}</div></div><div class="module-tabs">${moduleTabs.map(tab => `<button type="button" data-module="${tab}" class="${state.activeModule === tab ? 'active' : ''}">${tab}</button>`).join('')}</div><div class="integration-bar"><span class="connected">● Integrated</span><span>Projects → WBS → Activities → Relationships → Resources → Costs → Progress → Baselines → Delay → EV → Reports</span><span>${escapeHtml(state.toast)}</span></div><div class="control-strip"><span>Project ID <b>${project().projectId}</b></span><span>Contract <b>${money(project().contractAmount)}</b></span><span>Forecast Finish <b>${fmtDate(project().finishDate)}</b></span><span>Progress <b>${project().progressPct}%</b></span><label>Filter <select id="filter-select">${['All', 'Critical', 'Delayed', 'In Progress'].map(filter => `<option ${state.filter === filter ? 'selected' : ''}>${filter}</option>`).join('')}</select></label></div><div class="split-pane"><section class="activity-grid"><div class="grid-toolbar"><strong>Activities</strong><span>Central source of truth</span><button type="button" data-command="add-activity">Add Activity</button><button type="button" data-command="progress">Update Progress</button><button type="button" data-command="assign-resource">Assign Resource</button><button type="button" data-command="baseline">Save Baseline</button></div><table><thead><tr>${['#', 'Activity ID', 'Activity Name', 'Description', 'Dur', 'Start', 'Finish', 'Actual Start', 'Actual Finish', 'Remain', '%', 'TF', 'FF', 'Type', 'Priority', 'Status', 'Budget', 'Actual'].map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(gridRow).join('') : `<tr><td colspan="18" class="empty-state">No integrated records match “${escapeHtml(state.searchTerm)}”.</td></tr>`}</tbody></table></section><section class="gantt-panel"><div class="gantt-toolbar"><strong>Interactive Gantt Chart</strong><span>Dependency lines show FS / SS / FF / SF with lag/lead</span><select><option>Day</option><option selected>Week</option><option>Month</option></select><input type="range" value="3" aria-label="Zoom"></div><div class="timeline-header"><span>Q1 2026</span><span>Q2 2026</span><span>Q3 2026</span><span>Q4 2026</span><span>Q1 2027</span></div><div class="gantt-canvas" style="height:${Math.max(rows.length * 28 + 24, 420)}px"><div class="today-line"><span>Data Date</span></div>${rows.map((row, index) => row.kind === 'activity' ? `<div class="gantt-row ${row.code === state.selectedActivityId ? 'selected' : ''}" style="top:${rowTop(index)}px"><div class="baseline" style="left:${row.baselineX}%;width:${row.baselineWidth}%"></div><div class="${row.duration === 0 ? 'milestone' : row.isCritical ? 'critical-bar' : row.status === 'Delayed' ? 'delay-bar' : 'task-bar'}" style="left:${row.x}%;width:${row.width}%">${row.duration === 0 ? '' : `<span class="progress" style="width:${row.percentComplete}%"></span>`}<em>${escapeHtml(row.activityName)}</em></div></div>` : `<div class="gantt-row wbs-gantt" style="top:${rowTop(index)}px"><strong>${escapeHtml(row.code)} ${escapeHtml(row.name)}</strong></div>`).join('')}<svg class="dependency-layer" viewBox="0 0 100 ${Math.max(rows.length * 28 + 24, 420)}" preserveAspectRatio="none">${ganttLines(rows)}</svg></div></section></div>${renderDetailPanel(selected, t)}</main></div><footer class="status-bar"><span>Budget ${money(t.budget)}</span><span>Actual ${money(t.actual)}</span><span>Critical ${t.critical}</span><span>Delayed ${t.delayed}</span><span>SPI ${t.spi.toFixed(2)}</span><span>CPI ${t.cpi.toFixed(2)}</span><span class="connected">Database synchronized</span><span>${database.auditTrail[0]}</span></footer></div>`;
  bindEvents();
}
function bindEvents() {
  document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => action(button.dataset.command)));
  document.querySelectorAll('[data-module]').forEach(button => button.addEventListener('click', () => { state.activeModule = button.dataset.module; render(); }));
  document.querySelectorAll('[data-detail-tab]').forEach(button => button.addEventListener('click', () => { state.activeDetailTab = button.dataset.detailTab; render(); }));
  document.querySelectorAll('[data-activity]').forEach(row => row.addEventListener('click', () => { if (row.dataset.activity) { state.selectedActivityId = row.dataset.activity; state.selectedWbsId = activityByCode(row.dataset.activity)?.wbsId || state.selectedWbsId; render(); } }));
  document.querySelectorAll('[data-wbs]').forEach(row => row.addEventListener('click', () => { const wbs = wbsById(row.dataset.wbs); if (wbs) { wbs.expanded = !wbs.expanded; state.selectedWbsId = wbs.id; render(); } }));
  const search = document.getElementById('global-search');
  search.addEventListener('input', event => { state.searchTerm = event.target.value; render(); document.getElementById('global-search').focus(); });
  document.getElementById('filter-select').addEventListener('change', event => { state.filter = event.target.value; render(); });
}
buildBaseline();
activityByCode('A2030').delayOffset = 5;
activityByCode('A2020').delayOffset = 2;
recalculateIntegratedModules();
render();
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'q') {
    event.preventDefault();
    document.getElementById('global-search')?.focus();
  }
});
