# CosTrack Scheduler

CosTrack Scheduler is a dependency-free static prototype of a professional construction scheduling, progress monitoring, and cost management system inspired by Primavera P6 Professional and Microsoft Project Professional.

## How to open it

### Option 1: Open directly

Double-click `index.html` or open it from your browser. The page uses relative asset paths, so it works from the repository folder without a build step.

### Option 2: Run a local server

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:4173
```

### Option 3: Build static files

```bash
npm run build
npm run preview
```

Then open:

```text
http://127.0.0.1:4173
```

## What is included

- Primavera-style dark-blue header, ribbon toolbar, project controls navigation, Activities table, Gantt chart, baseline bars, dependency lines, and bottom details tabs.
- Construction sample project data with WBS, activities, progress, float, critical delay, resources, costs, earned value indicators, reports, and project administration actions.
- Local browser persistence using `localStorage`, so edits, progress updates, baselines, delay logs, resources, and audit entries remain available after refresh.
- Functional activity controls for creating, editing, duplicating, deleting, linking, calculating, updating progress, saving baselines, comparing baselines, assigning resources, exporting CSV, and resetting demo data.
- Construction-control modules for daily progress, BOQ/quantity tracking, procurement packages, submittals/RFIs/inspections, constraint logs, risk register, approvals, audit trail, delay reporting, and report-builder views.
- A calendar-aware CPM-style schedule calculation prototype with WBS rollups, early/finish dates, remaining duration, total float, free float, and critical-path highlighting.
- Prisma schema for future backend implementation with Projects, WBS, Activities, Relationships, Calendars, Resources, ActivityResources, Costs, Baselines, ProgressUpdates, DelayLogs, Reports, Users, Roles, BOQ items, cost codes, procurement, locations, constraints, lookahead plans, documents, inspections, risks, approvals, audit logs, weather logs, and change orders.
