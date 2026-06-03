const STORAGE_KEY = 'costrack-scheduler-enterprise-v2';
const DAY = 24 * 60 * 60 * 1000;

const ribbonTabs = ['File', 'Edit', 'View', 'Project', 'Activities', 'Relationships', 'Schedule', 'Resources', 'Cost', 'Reports', 'Tools', 'Help'];
const ribbonGroups = [
  ['Project', [['newProject','▣','New Project'], ['openProject','▤','Open Project'], ['saveProject','▣','Save Project'], ['exportCsv','⇩','Export CSV']]],
  ['Activities', [['newActivity','＋','New Activity'], ['deleteActivity','×','Delete Activity'], ['duplicateActivity','⧉','Duplicate'], ['indent','⇥','Indent'], ['outdent','⇤','Outdent']]],
  ['Relationships', [['linkFs','🔗','Link FS'], ['unlinkSelected','⛓','Unlink'], ['addLag','↦','Add Lag'], ['addLead','↤','Add Lead']]],
  ['Schedule', [['calculateSchedule','∑','Calculate Schedule'], ['updateProgress','↻','Update Progress'], ['saveBaseline','▰','Save Baseline'], ['compareBaseline','▱','Compare Baseline']]],
  ['Resources', [['assignResource','☷','Assign Resource'], ['levelResources','▥','Resource Leveling'], ['showHistogram','▤','Histogram']]],
  ['Reports', [['generateReport','▦','Report Builder'], ['delayReport','!','Delay Report'], ['printReport','⎙','Print'], ['resetDemo','↺','Reset Demo']]],
];
const sidebarSections = [
  ['Projects', ['Project Selection', 'Recent Projects']],
  ['Scheduling', ['Activities', 'WBS', 'Relationships', 'Calendars', 'Milestones', 'Baselines']],
  ['Resources', ['Resources', 'Resource Assignments', 'Resource Usage']],
  ['Cost Management', ['Cost Loading', 'Cost Tracking', 'Earned Value', 'S-Curve', 'BOQ & Cost Codes']],
  ['Construction Controls', ['Daily Progress', 'Procurement', 'Submittals & RFIs', 'Inspections', 'Constraint Log', 'Lookahead Plan']],
  ['Analysis', ['Critical Path', 'Delay Analysis', 'Schedule Comparison', 'Risk Register']],
  ['Reports', ['Schedule Reports', 'Cost Reports', 'Progress Reports', 'Claims Reports']],
  ['Administration', ['Users', 'Roles & Permissions', 'Approvals', 'Audit Trail', 'Settings']],
];
const defaultState = () => ({
  project: { id: 'CT-MMC-2026', name: 'Metro Medical Center Expansion', client: 'Apex Health Authority', contractor: 'CEM Works JV', contractAmount: 48200000, startDate: '2026-01-01', finishDate: '2027-02-12', dataDate: '2026-06-03', status: 'In Progress' },
  activities: [
    { id:'1.0', name:'Pre-Construction', wbs:'1.0', level:1, duration:42, percent:100, status:'Completed', type:'Level of Effort', budget:890000, actual:845000, phase:'Pre-Construction', summary:true },
    { id:'A1000', name:'Notice to Proceed', wbs:'1.0', level:2, duration:0, percent:100, status:'Completed', type:'Start Milestone', budget:0, actual:0, phase:'Pre-Construction', milestone:true },
    { id:'A1010', name:'Project Management Plan', wbs:'1.0', level:2, duration:12, percent:100, status:'Completed', type:'Task Dependent', budget:120000, actual:116000, phase:'Pre-Construction' },
    { id:'A1020', name:'Permits & Authority Approvals', wbs:'1.0', level:2, duration:27, percent:100, status:'Completed', type:'Task Dependent', budget:330000, actual:312000, phase:'Pre-Construction' },
    { id:'2.0', name:'Site Preparation', wbs:'2.0', level:1, duration:58, percent:91, status:'In Progress', type:'Level of Effort', budget:3150000, actual:2945000, phase:'Site Preparation', summary:true },
    { id:'A2010', name:'Temporary Facilities & Mobilization', wbs:'2.0', level:2, duration:20, percent:100, status:'Completed', type:'Resource Dependent', budget:780000, actual:760000, phase:'Site Preparation' },
    { id:'A2020', name:'Demolition and Site Clearing', wbs:'2.0', level:2, duration:30, percent:93, status:'Delayed', type:'Task Dependent', budget:1240000, actual:1188000, phase:'Site Preparation' },
    { id:'A2030', name:'Survey Control and Benchmarks', wbs:'2.0', level:2, duration:14, percent:64, status:'Critical Delay', type:'Task Dependent', budget:310000, actual:215000, phase:'Site Preparation' },
    { id:'3.0', name:'Foundation', wbs:'3.0', level:1, duration:82, percent:0, status:'Not Started', type:'Level of Effort', budget:9200000, actual:0, phase:'Foundation', summary:true },
    { id:'A3010', name:'Excavation and Dewatering', wbs:'3.0', level:2, duration:28, percent:0, status:'Not Started', type:'Resource Dependent', budget:1850000, actual:0, phase:'Foundation' },
    { id:'A3020', name:'Pile Caps and Grade Beams', wbs:'3.0', level:2, duration:42, percent:0, status:'Not Started', type:'Task Dependent', budget:3950000, actual:0, phase:'Foundation' },
    { id:'4.0', name:'Structural Works', wbs:'4.0', level:1, duration:118, percent:0, status:'Not Started', type:'Level of Effort', budget:16800000, actual:0, phase:'Structural Works', summary:true },
    { id:'A4010', name:'Concrete Superstructure', wbs:'4.0', level:2, duration:70, percent:0, status:'Not Started', type:'Resource Dependent', budget:9500000, actual:0, phase:'Structural Works' },
    { id:'A4020', name:'MEP Sleeves and Embedded Items', wbs:'4.0', level:2, duration:85, percent:0, status:'Not Started', type:'Task Dependent', budget:2100000, actual:0, phase:'MEP Works' },
    { id:'A5000', name:'Building Turnover', wbs:'8.0', level:1, duration:0, percent:0, status:'Not Started', type:'Finish Milestone', budget:0, actual:0, phase:'Turnover', milestone:true },
  ],
  relationships: [
    { pred:'A1000', succ:'A1010', type:'FS', lag:0 }, { pred:'A1010', succ:'A1020', type:'FS', lag:0 }, { pred:'A1020', succ:'A2010', type:'FS', lag:0 },
    { pred:'A2010', succ:'A2020', type:'SS', lag:5 }, { pred:'A2020', succ:'A2030', type:'FS', lag:1 }, { pred:'A2030', succ:'A3010', type:'FS', lag:0 },
    { pred:'A3010', succ:'A3020', type:'FS', lag:0 }, { pred:'A3020', succ:'A4010', type:'FS', lag:0 }, { pred:'A4010', succ:'A4020', type:'SS', lag:10 }, { pred:'A4020', succ:'A5000', type:'FS', lag:0 },
  ],
  resources: [
    { code:'LAB-CIV-01', name:'Civil Crew A', type:'Labor', qty:18, unitCost:62, activityId:'A3010', availability:40 },
    { code:'EQ-EXC-45', name:'Excavator 45T', type:'Equipment', qty:2, unitCost:1350, activityId:'A3010', availability:2 },
    { code:'MAT-CONC', name:'Ready Mix Concrete', type:'Material', qty:2400, unitCost:142, activityId:'A3020', availability:2400 },
    { code:'SUB-MEP', name:'MEP Subcontractor', type:'Subcontractor', qty:1, unitCost:2100000, activityId:'A4020', availability:1 },
  ],
  quantities: [
    { activityId:'A3010', costCode:'03-EXC', item:'Excavation', uom:'m³', budgetQty:12000, installedQty:7500, unitRate:18, plannedProductivity:400, actualProductivity:310 },
    { activityId:'A3020', costCode:'03-CONC', item:'Concrete', uom:'m³', budgetQty:2400, installedQty:0, unitRate:142, plannedProductivity:120, actualProductivity:0 },
  ],
  procurement: [
    { id:'PKG-MEP-001', item:'Air Handling Units', supplier:'NorthStar Mechanical', required:'2026-09-15', planned:'2026-09-08', actual:'', status:'Submittal Approval', activityId:'A4020', delayImpact:8 },
    { id:'PKG-CON-002', item:'Ready Mix Concrete', supplier:'Metro Concrete', required:'2026-05-05', planned:'2026-05-01', actual:'', status:'PO Issued', activityId:'A3020', delayImpact:0 },
  ],
  documents: [
    { id:'SUB-043', type:'Submittal', title:'MEP Equipment Technical Submittal', status:'Under Review', activityId:'A4020', due:'2026-07-10' },
    { id:'RFI-018', type:'RFI', title:'Foundation groundwater clarification', status:'Open', activityId:'A3010', due:'2026-04-21' },
    { id:'IR-205', type:'Inspection', title:'Survey benchmark verification', status:'Failed - Reinspect', activityId:'A2030', due:'2026-04-08' },
  ],
  constraints: [
    { activityId:'A3010', category:'Area not released', owner:'Construction Manager', due:'2026-04-08', status:'Open' },
    { activityId:'A4020', category:'Material not available', owner:'Procurement Lead', due:'2026-08-20', status:'Watching' },
  ],
  risks: [
    { id:'RSK-011', title:'Groundwater exceeds geotech assumptions', probability:0.45, impactDays:14, impactCost:380000, owner:'Project Controls', mitigation:'Add dewatering subcontractor standby', activityId:'A3010' },
    { id:'RSK-027', title:'MEP equipment late approval', probability:0.35, impactDays:21, impactCost:250000, owner:'MEP Manager', mitigation:'Weekly supplier escalation', activityId:'A4020' },
  ],
  progressUpdates: [],
  delayLogs: [{ activityId:'A2030', type:'Inspection Rework', severity:'Critical', impactDays:5, responsible:'Contractor', description:'Survey benchmark inspection failed and requires rework.', date:'2026-06-03' }],
  baselines: [],
  approvals: [{ item:'Baseline B0', status:'Draft', approver:'Project Director' }, { item:'May progress update', status:'Pending', approver:'Client Representative' }],
  audit: [],
  activeView: 'Activities',
});
let state = loadState();
let selectedId = state.activities.find(a => !a.summary)?.id || state.activities[0].id;
let searchTerm = '';
let currentScale = 'Week';

function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || seedState(); } catch { return seedState(); } }
function seedState() { const s = defaultState(); calculateSchedule(s, false); return s; }
function saveState(note = 'State saved') { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); logAudit(note); }
function logAudit(action) { state.audit.unshift({ time:new Date().toISOString(), user:'Admin', action }); state.audit = state.audit.slice(0, 50); }
function parseDate(s) { return new Date(`${s}T00:00:00`); }
function fmtDate(d) { return new Date(d).toISOString().slice(0,10); }
function addWorkDays(date, days) { const d = new Date(date); let remaining = Math.abs(Number(days) || 0); const step = Number(days) < 0 ? -1 : 1; while (remaining > 0) { d.setDate(d.getDate() + step); if (![0,6].includes(d.getDay())) remaining--; } return d; }
function diffDays(a,b) { return Math.round((parseDate(b) - parseDate(a)) / DAY); }
function money(v) { return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(Number(v) || 0); }
function esc(v) { return String(v ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function activity(id) { return state.activities.find(a => a.id === id); }
function isWork(a) { return !a.summary; }

function calculateSchedule(target = state, persist = true) {
  const projectStart = parseDate(target.project.startDate);
  const work = target.activities.filter(isWork);
  work.forEach((a, i) => {
    a.es = a.es || fmtDate(addWorkDays(projectStart, i * 2));
    a.ef = fmtDate(addWorkDays(parseDate(a.es), a.duration));
  });
  for (let pass = 0; pass < work.length + 2; pass++) {
    target.relationships.forEach(r => {
      const p = target.activities.find(a => a.id === r.pred), s = target.activities.find(a => a.id === r.succ);
      if (!p || !s || s.summary) return;
      const lag = Number(r.lag) || 0;
      const candidate = r.type === 'SS' ? addWorkDays(parseDate(p.es || target.project.startDate), lag) :
        r.type === 'FF' ? addWorkDays(parseDate(p.ef || target.project.startDate), lag - s.duration) :
        r.type === 'SF' ? addWorkDays(parseDate(p.es || target.project.startDate), lag - s.duration) :
        addWorkDays(parseDate(p.ef || target.project.startDate), lag);
      if (!s.es || parseDate(candidate) > parseDate(s.es)) {
        s.es = fmtDate(candidate);
        s.ef = fmtDate(addWorkDays(candidate, s.duration));
      }
    });
  }
  const finish = work.reduce((max, a) => parseDate(a.ef) > max ? parseDate(a.ef) : max, projectStart);
  [...work].reverse().forEach(a => { a.lf = fmtDate(finish); a.ls = fmtDate(addWorkDays(parseDate(a.lf), -a.duration)); });
  for (let pass = 0; pass < work.length + 2; pass++) {
    [...target.relationships].reverse().forEach(r => {
      const p = target.activities.find(a => a.id === r.pred), s = target.activities.find(a => a.id === r.succ);
      if (!p || !s || p.summary) return;
      const lag = Number(r.lag) || 0;
      const candidateFinish = addWorkDays(parseDate(s.ls || s.es || target.project.finishDate), -lag);
      if (!p.lf || parseDate(candidateFinish) < parseDate(p.lf)) {
        p.lf = fmtDate(candidateFinish);
        p.ls = fmtDate(addWorkDays(candidateFinish, -p.duration));
      }
    });
  }
  work.forEach(a => {
    a.start = a.es; a.finish = a.ef;
    a.remaining = Math.max(0, Math.round(a.duration * (100 - Number(a.percent || 0)) / 100));
    a.totalFloat = Math.max(0, diffDays(a.es, a.ls || a.es));
    const succ = target.relationships.filter(r => r.pred === a.id).map(r => target.activities.find(x => x.id === r.succ)).filter(Boolean);
    a.freeFloat = succ.length ? Math.max(0, Math.min(...succ.map(s => diffDays(a.ef, s.es || a.ef)))) : a.totalFloat;
    a.critical = a.totalFloat <= 1 || a.status === 'Critical Delay';
  });
  target.activities.filter(a => a.summary).forEach(s => {
    const children = target.activities.filter(a => !a.summary && a.wbs.startsWith(s.wbs));
    if (!children.length) return;
    s.start = children.reduce((min,a)=>!min || parseDate(a.start)<parseDate(min) ? a.start : min, '');
    s.finish = children.reduce((max,a)=>!max || parseDate(a.finish)>parseDate(max) ? a.finish : max, '');
    s.duration = Math.max(0, diffDays(s.start, s.finish));
    s.percent = Math.round(children.reduce((sum,a)=>sum + a.percent * a.budget, 0) / Math.max(1, children.reduce((sum,a)=>sum + a.budget, 0)));
    s.budget = children.reduce((sum,a)=>sum+a.budget,0); s.actual = children.reduce((sum,a)=>sum+a.actual,0);
    s.remaining = Math.max(0, Math.round(s.duration * (100 - s.percent) / 100));
    s.totalFloat = Math.min(...children.map(a=>a.totalFloat)); s.freeFloat = Math.min(...children.map(a=>a.freeFloat)); s.critical = children.some(a=>a.critical);
  });
  if (persist) saveState('Calculated CPM schedule, WBS rollups, float and critical path');
}
function metrics() {
  const work = state.activities.filter(isWork);
  const budget = work.reduce((s,a)=>s+a.budget,0), actual = work.reduce((s,a)=>s+a.actual,0), ev = work.reduce((s,a)=>s+a.budget*a.percent/100,0), pv = budget * 0.52;
  return { budget, actual, ev, pv, spi: ev / Math.max(1,pv), cpi: ev / Math.max(1,actual), delayed: work.filter(a=>['Delayed','Critical Delay'].includes(a.status)).length, critical: work.filter(a=>a.critical).length };
}
function visibleActivities() { const q = searchTerm.toLowerCase(); return state.activities.filter(a => !q || [a.id,a.name,a.status,a.phase,a.wbs].join(' ').toLowerCase().includes(q)); }

function render() {
  const selected = activity(selectedId) || state.activities[0];
  const m = metrics();
  document.getElementById('root').innerHTML = `<div class="app-shell">
    <header class="app-header"><div class="brand-block"><span class="brand-mark">▥</span><div><h1>CosTrack Scheduler</h1><p>Construction Scheduling, Progress Monitoring & Cost Management</p></div></div><label class="header-search"><span>⌕</span><input id="globalSearch" placeholder="Search projects, activities, resources (Ctrl+Q)" value="${esc(searchTerm)}"></label><div class="header-actions"><span>${state.project.status}</span><span>?</span><span>⚙</span><div class="avatar">AD</div></div></header>
    <div class="desktop-body"><aside class="sidebar">${sidebarSections.map(([title,items])=>`<section><h2>${title}</h2>${items.map(item=>`<button data-view="${esc(item)}" class="${state.activeView===item?'selected':''}"><span class="ico">▣</span>${item}</button>`).join('')}</section>`).join('')}<button data-action="collapse" class="collapse"><span class="ico">‹</span> Collapse</button></aside>
    <main class="workspace"><div class="ribbon"><div class="ribbon-tabs">${ribbonTabs.map(t=>`<button class="${t==='Activities'?'active':''}">${t}</button>`).join('')}</div><div class="ribbon-actions">${ribbonGroups.map(([title,actions])=>`<div class="ribbon-group">${actions.map(([action,i,l])=>`<button data-action="${action}"><span class="ico">${i}</span><span>${l}</span></button>`).join('')}<small>${title}</small></div>`).join('')}</div></div>
    <div class="project-strip">${summaryTile('Contract', money(state.project.contractAmount))}${summaryTile('PV', money(m.pv))}${summaryTile('EV', money(m.ev))}${summaryTile('AC', money(m.actual))}${summaryTile('SPI', m.spi.toFixed(2))}${summaryTile('CPI', m.cpi.toFixed(2))}${summaryTile('Critical', m.critical)}${summaryTile('Delayed', m.delayed)}</div>
    <div class="view-tabs">${['Activities','Daily Progress','Procurement','Resources','Cost','Risks','Reports'].map(v=>`<button data-view="${v}" class="${state.activeView===v?'active':''}">${v}</button>`).join('')}</div>
    <div class="split-pane"><section class="activity-grid"><div class="grid-toolbar"><span>${esc(state.activeView)} View</span><button data-action="filterCritical">Critical Path</button><button data-action="calculateSchedule">Calculate</button><button data-action="exportCsv">Export</button><button data-action="resetDemo">Reset</button></div>${renderMainTable()}</section>${renderGantt()}</div>${renderDetails(selected, m)}</main></div>
    <footer class="status-bar"><span>Project: ${esc(state.project.name)}</span><span>Data Date: ${state.project.dataDate}</span><span>User: Admin</span><span>Database: Local Prototype + Prisma Model</span><span class="connected">● Saved locally</span></footer></div>`;
  wireEvents();
}
function summaryTile(label, value) { return `<div><b>${esc(value)}</b><span>${label}</span></div>`; }
function renderMainTable() {
  if (state.activeView === 'Procurement') return table(['Package','Item','Supplier','Required','Planned','Status','Linked Activity','Delay Impact'], state.procurement.map(p=>[p.id,p.item,p.supplier,p.required,p.planned,p.status,p.activityId,`${p.delayImpact}d`]));
  if (state.activeView === 'Resources') return table(['Code','Name','Type','Qty','Unit Cost','Activity','Availability'], state.resources.map(r=>[r.code,r.name,r.type,r.qty,money(r.unitCost),r.activityId,r.availability]));
  if (state.activeView === 'Daily Progress') return table(['Date','Activity','% Complete','Accomplishment','Actual Cost','Productivity'], state.progressUpdates.map(p=>[p.date,p.activityId,p.percent, p.note, money(p.actualCost), p.productivity]));
  if (state.activeView === 'Cost') return table(['Activity','BOQ Item','UOM','Budget Qty','Installed Qty','Unit Rate','Productivity'], state.quantities.map(q=>[q.activityId,q.item,q.uom,q.budgetQty,q.installedQty,money(q.unitRate),`${q.actualProductivity}/${q.plannedProductivity}`]));
  if (state.activeView === 'Risks') return table(['Risk ID','Title','Probability','Impact Days','Impact Cost','Owner','Mitigation'], state.risks.map(r=>[r.id,r.title,`${Math.round(r.probability*100)}%`,r.impactDays,money(r.impactCost),r.owner,r.mitigation]));
  if (state.activeView === 'Reports') return table(['Report','Purpose','Export'], [['Schedule Report','CPM, float, critical path','PDF / Excel / CSV'], ['Earned Value Report','PV, EV, AC, SPI, CPI','PDF / Excel'], ['Delay Report','Critical delays and responsibility','PDF'], ['Baseline Variance Report','Current vs baseline variance','Excel'], ['Procurement Report','Long-lead package status','CSV']]);
  return `<table><thead><tr>${['#','Activity ID','Activity Name','Duration','Start','Finish','Remaining','% Complete','Total Float','Free Float','Status','Budget','Actual'].map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${visibleActivities().map((a,i)=>`<tr data-id="${a.id}" class="${selectedId===a.id?'active-row':''} ${a.critical?'critical-row':''}"><td>${i+1}</td><td class="id-cell" style="padding-left:${8+a.level*16}px">${a.summary?'⌄ ':''}${esc(a.id)}</td><td class="${a.summary?'summary-name':''}">${esc(a.name)}</td><td>${a.duration}</td><td>${a.start || '—'}</td><td>${a.finish || '—'}</td><td>${a.remaining ?? 0}</td><td>${a.percent}%</td><td>${a.totalFloat ?? 0}</td><td>${a.freeFloat ?? 0}</td><td><span class="status ${a.status.toLowerCase().replaceAll(' ','-')}">${a.status}</span></td><td>${money(a.budget)}</td><td>${money(a.actual)}</td></tr>`).join('')}</tbody></table>`;
}
function table(headers, rows) { return `<table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${headers.length}">No records yet</td></tr>`}</tbody></table>`; }
function renderGantt() {
  const work = visibleActivities(); const min = parseDate(state.project.startDate); const max = parseDate(state.project.finishDate); const span = Math.max(1, (max-min)/DAY);
  const bars = work.map((a,i)=>{ const x = a.start ? Math.max(0, ((parseDate(a.start)-min)/DAY)/span*100) : 0; const w = a.finish&&a.start ? Math.max(a.milestone?1:2, diffDays(a.start,a.finish)/span*100) : 2; const base = latestBaseline(a.id); const bx = base ? Math.max(0, ((parseDate(base.start)-min)/DAY)/span*100) : x; const bw = base ? Math.max(1, diffDays(base.start,base.finish)/span*100) : w; return `<div class="gantt-row ${a.id===selectedId?'selected':''}" style="top:${14+i*30}px"><div class="baseline" style="left:${bx}%;width:${bw}%"></div><div data-id="${a.id}" class="${a.milestone?'milestone':a.summary?'summary-bar':a.critical?'critical-bar':'task-bar'}" style="left:${x}%;width:${w}%"><span class="progress" style="width:${a.percent}%"></span><em>${esc(a.name)}</em></div></div>`; }).join('');
  return `<section class="gantt-panel"><div class="gantt-toolbar"><strong>Interactive Gantt Chart</strong><span>Scale:</span><select id="scale">${['Day','Week','Month','Quarter','Year'].map(s=>`<option ${currentScale===s?'selected':''}>${s}</option>`).join('')}</select><span>Baseline: ${state.baselines.length}</span><span>Data Date: ${state.project.dataDate}</span></div><div class="timeline-header"><span>Q1 2026</span><span>Q2 2026</span><span>Q3 2026</span><span>Q4 2026</span><span>Q1 2027</span></div><div class="gantt-canvas"><div class="today-line"><span>${state.project.dataDate}</span></div>${bars}<svg class="dependency-layer" viewBox="0 0 100 520" preserveAspectRatio="none">${state.relationships.map((r,i)=>`<polyline points="${20+i*6},${70+i*28} ${26+i*6},${70+i*28} ${26+i*6},${96+i*28}"/>`).join('')}</svg></div></section>`;
}
function latestBaseline(id) { const b = state.baselines.at(-1); return b?.activities?.find(a => a.id === id); }
function renderDetails(a, m) {
  const preds = state.relationships.filter(r=>r.succ===a.id).map(r=>[r.pred, activity(r.pred)?.name || '', r.type, r.lag]);
  const succs = state.relationships.filter(r=>r.pred===a.id).map(r=>[r.succ, activity(r.succ)?.name || '', r.type, r.lag]);
  const res = state.resources.filter(r=>r.activityId===a.id).map(r=>[r.code,r.name,r.type,r.qty,money(r.qty*r.unitCost)]);
  const delay = state.delayLogs.filter(d=>d.activityId===a.id).map(d=>[d.date,d.type,d.severity,d.impactDays,d.responsible,d.description]);
  return `<section class="details-panel"><nav>${['General','Predecessors','Successors','Resources','Progress','Delay','Controls','Notebook'].map((t,i)=>`<button class="${i===0?'active':''}">${t}</button>`).join('')}</nav><div class="detail-content">
    <div class="detail-card general-card"><h3>Editable Activity Details</h3><div class="form-grid">${input('Activity ID','id',a.id)}${input('Activity Name','name',a.name)}${input('Duration','duration',a.duration,'number')}${input('WBS','wbs',a.wbs)}${select('Status','status',a.status,['Not Started','In Progress','Completed','Delayed','Critical Delay'])}${input('% Complete','percent',a.percent,'number')}${input('Budget Cost','budget',a.budget,'number')}${input('Actual Cost','actual',a.actual,'number')}${select('Activity Type','type',a.type,['Task Dependent','Resource Dependent','Start Milestone','Finish Milestone','Level of Effort'])}</div><div class="button-row"><button data-action="applyActivity">Apply Changes</button><button data-action="updateProgress">Post Daily Progress</button><button data-action="addDelay">Log Delay</button></div></div>
    <div class="detail-card"><h3>Relationships</h3>${table(['Pred ID','Activity Name','Type','Lag'], preds)}<h3>Successors</h3>${table(['Succ ID','Activity Name','Type','Lag'], succs)}</div>
    <div class="detail-card"><h3>Resources & Quantity Control</h3>${table(['Code','Resource','Type','Qty','Total Cost'], res)}${table(['BOQ','UOM','Budget Qty','Installed Qty','Unit Rate'], state.quantities.filter(q=>q.activityId===a.id).map(q=>[q.item,q.uom,q.budgetQty,q.installedQty,money(q.unitRate)]))}</div>
    <div class="detail-card ev-card"><h3>Earned Value</h3><div class="kpi-row">${gauge('SPI', m.spi)}${gauge('CPI', m.cpi, true)}${gauge('% Complete', a.percent/100)}</div><div class="metrics"><span>PV ${money(m.pv)}</span><span>EV ${money(m.ev)}</span><span>AC ${money(m.actual)}</span><span>SV ${money(m.ev-m.pv)}</span><span>CV ${money(m.ev-m.actual)}</span></div><div class="mini-chart"><span class="planned"></span><span class="earned"></span><span class="actual"></span></div></div>
    <div class="detail-card"><h3>Delay / Risk / Approvals</h3>${table(['Date','Type','Severity','Days','Party','Description'], delay)}${table(['Item','Status','Approver'], state.approvals.map(x=>[x.item,x.status,x.approver]))}<h3>Audit Trail</h3>${table(['Time','User','Action'], state.audit.slice(0,4).map(x=>[x.time.slice(0,19),x.user,x.action]))}</div>
  </div></section>`;
}
function input(label, name, value, type='text') { return `<label>${label}<input name="${name}" type="${type}" value="${esc(value)}"></label>`; }
function select(label, name, value, options) { return `<label>${label}<select name="${name}">${options.map(o=>`<option ${o===value?'selected':''}>${o}</option>`).join('')}</select></label>`; }
function gauge(label, value, warn=false) { const display = label==='% Complete' ? Math.round(value*100)+'%' : Number(value || 0).toFixed(2); return `<div class="gauge"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.5"></circle><circle class="${warn?'warn':''}" cx="21" cy="21" r="15.5" stroke-dasharray="${Math.min(value || 0,1)*100} 100"></circle></svg><strong>${display}</strong><span>${label}</span></div>`; }

function wireEvents() {
  document.querySelectorAll('[data-id]').forEach(el => el.addEventListener('click', () => { selectedId = el.dataset.id; render(); }));
  document.querySelectorAll('[data-view]').forEach(el => el.addEventListener('click', () => { state.activeView = el.dataset.view; render(); }));
  document.querySelectorAll('[data-action]').forEach(el => el.addEventListener('click', () => handleAction(el.dataset.action)));
  document.getElementById('globalSearch')?.addEventListener('input', e => { searchTerm = e.target.value; render(); });
  document.getElementById('scale')?.addEventListener('change', e => { currentScale = e.target.value; render(); });
}
function handleAction(action) {
  const a = activity(selectedId);
  if (action === 'newProject') { alert('Project creation workflow: use editable project data model in localStorage; backend CRUD is modeled in Prisma.'); logAudit('Opened new project workflow'); render(); }
  if (action === 'openProject') { alert('Open Project: demo project is loaded from localStorage. Reset Demo reloads the construction template.'); logAudit('Opened project selection workflow'); render(); }
  if (action === 'saveProject') { saveState('Saved project manually'); render(); }
  if (action === 'printReport' && window.print) window.print();
  if (action === 'indent' && a) { a.level = Math.min(5, (a.level || 1) + 1); saveState('Indented activity/WBS row'); render(); }
  if (action === 'outdent' && a) { a.level = Math.max(0, (a.level || 1) - 1); saveState('Outdented activity/WBS row'); render(); }
  if (action === 'newActivity') { const id = `A${Math.floor(6000 + Math.random()*899)}`; state.activities.push({ id, name:'New Construction Activity', wbs:'5.0', level:2, duration:10, percent:0, status:'Not Started', type:'Task Dependent', budget:100000, actual:0, phase:'Architectural Works' }); selectedId = id; calculateSchedule(); }
  if (action === 'deleteActivity' && a && !a.summary) { state.activities = state.activities.filter(x=>x.id!==a.id); state.relationships = state.relationships.filter(r=>r.pred!==a.id && r.succ!==a.id); selectedId = state.activities.find(isWork)?.id; calculateSchedule(); }
  if (action === 'duplicateActivity' && a) { const copy = {...a, id:`${a.id}-COPY`, name:`${a.name} Copy`, percent:0, actual:0, status:'Not Started'}; state.activities.push(copy); selectedId = copy.id; calculateSchedule(); }
  if (action === 'applyActivity' && a) { document.querySelectorAll('.general-card input,.general-card select').forEach(el => { const key = el.name; a[key] = ['duration','percent','budget','actual'].includes(key) ? Number(el.value) : el.value; }); calculateSchedule(); }
  if (action === 'calculateSchedule') calculateSchedule();
  if (action === 'saveBaseline') { state.baselines.push({ name:`Baseline ${state.baselines.length+1}`, date:new Date().toISOString(), activities: state.activities.map(x=>({id:x.id,start:x.start,finish:x.finish,budget:x.budget})) }); saveState('Saved schedule baseline'); render(); }
  if (action === 'compareBaseline') { alert(baselineVariance()); }
  if (action === 'updateProgress' && a) { const pct = Number(prompt('Enter percent complete', a.percent) ?? a.percent); const note = prompt('Daily accomplishment / installed quantity note', 'Updated field progress') || 'Updated field progress'; a.percent = Math.max(0, Math.min(100, pct)); a.status = a.percent >= 100 ? 'Completed' : a.percent > 0 ? 'In Progress' : 'Not Started'; state.progressUpdates.unshift({ date:state.project.dataDate, activityId:a.id, percent:a.percent, note, actualCost:a.actual, productivity:'Updated' }); calculateSchedule(); }
  if (action === 'addDelay' && a) { const days = Number(prompt('Impact days', '1') || 1); state.delayLogs.unshift({ activityId:a.id, type:'Field Delay', severity:days>3?'Critical':'Moderate', impactDays:days, responsible:'TBD', description:prompt('Delay description','New delay event') || 'New delay event', date:state.project.dataDate }); a.status = days>3 ? 'Critical Delay' : 'Delayed'; calculateSchedule(); }
  if (action === 'linkFs' && a) { const succ = prompt('Successor Activity ID', 'A5000'); if (succ && activity(succ)) { state.relationships.push({ pred:a.id, succ, type:'FS', lag:0 }); calculateSchedule(); } }
  if (action === 'unlinkSelected' && a) { state.relationships = state.relationships.filter(r=>r.pred!==a.id && r.succ!==a.id); calculateSchedule(); }
  if (action === 'addLag' && a) { state.relationships.filter(r=>r.pred===a.id || r.succ===a.id).forEach(r=>r.lag += 1); calculateSchedule(); }
  if (action === 'addLead' && a) { state.relationships.filter(r=>r.pred===a.id || r.succ===a.id).forEach(r=>r.lag -= 1); calculateSchedule(); }
  if (action === 'assignResource' && a) { state.resources.push({ code:`RES-${state.resources.length+1}`, name:'New Crew / Equipment', type:'Labor', qty:1, unitCost:100, activityId:a.id, availability:1 }); saveState('Assigned construction resource'); render(); }
  if (action === 'levelResources') { alert('Resource leveling analysis complete: Civil Crew A is near capacity; MEP subcontractor has long-lead procurement risk.'); logAudit('Ran resource leveling analysis'); render(); }
  if (action === 'showHistogram') { state.activeView = 'Resources'; render(); }
  if (action === 'generateReport') { state.activeView = 'Reports'; logAudit('Generated report builder view'); render(); }
  if (action === 'delayReport') { alert(state.delayLogs.map(d=>`${d.activityId}: ${d.severity} ${d.impactDays}d - ${d.description}`).join('\n')); }
  if (action === 'exportCsv') exportCsv();
  if (action === 'filterCritical') { searchTerm = 'Critical'; render(); }
  if (action === 'resetDemo') { if (confirm('Reset local demo data?')) { localStorage.removeItem(STORAGE_KEY); state = seedState(); selectedId = 'A2030'; render(); } }
}
function baselineVariance() { const b = state.baselines.at(-1); if (!b) return 'No baseline saved yet.'; return state.activities.slice(0,8).map(a => { const base = b.activities.find(x=>x.id===a.id); return `${a.id} ${a.name}: ${base ? diffDays(base.finish, a.finish) : 0} finish variance days`; }).join('\n'); }
function exportCsv() { const csv = ['Activity ID,Name,WBS,Start,Finish,Duration,Percent,Float,Status,Budget,Actual', ...state.activities.map(a=>[a.id,a.name,a.wbs,a.start,a.finish,a.duration,a.percent,a.totalFloat,a.status,a.budget,a.actual].map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(','))].join('\n'); const blob = new Blob([csv], {type:'text/csv'}); const url = URL.createObjectURL(blob); const link = Object.assign(document.createElement('a'), { href:url, download:'costrack-schedule.csv' }); link.click(); URL.revokeObjectURL(url); logAudit('Exported activity CSV'); }

calculateSchedule(state, false);
render();
