# Correct the Kearly QA backlog

## Goal
Resolve every actionable issue in the supplied testing framework while preserving the approved Kearly visual design and shared logo.

## Already resolved
- The supplied Kearly logo is used consistently.
- Compliance content is correctly mapped to compliance tasks.
- Reports, Documents, and Staff Report tabs exist.
- External and internal team tables exist.
- Audit-log destructive controls have already been removed.

## Implementation
1. **Dashboard**
   - Make global search and category controls filter visible records.
   - Make the building selector filter all building-specific dashboard content and recalculate summaries.
   - Generate a real downloadable portfolio CSV.

2. **Compliance**
   - Add working search, status, and building filters with populated building options.
   - Keep Table and Calendar as reversible views.
   - Make View open task details, Edit open the task editor, and Complete update the task state with confirmation.
   - Implement real pagination with correct disabled states and row counts.

3. **Equipment**
   - Add dedicated Add Equipment and Edit Equipment screens with serial/barcode, specifications, category, site, schedule, due date, and status fields.
   - Preserve the complete sidebar while editing or creating equipment.
   - Make search, status, building filters, pagination, and row actions work.

4. **Repairs**
   - Add a dedicated New Ticket form instead of opening a PPM task.
   - Make search, status, priority, site, and assignee filters work.
   - Standardize View, Edit, Complete, Review, and Close actions across applicable rows.
   - Implement working details/review dialogs and pagination.

5. **Buildings and teams**
   - Add a category chooser before starting a building task, routing to Compliance, Repair, or Equipment creation.
   - Route Edit Details to a dedicated site-editing experience, not onboarding.
   - Route Manage Team to team management.
   - Add working Add Contractor and Add Team Member forms without returning to onboarding.

6. **Reports, staff records, and audit log**
   - Add functional building/date filters, downloads/exports, and pagination.
   - Complete staff-record forms with staff name, report name, category, dates/status, and document upload.
   - Make audit search, user/action/building filters, View/Review dialogs, and CSV export functional while keeping records non-deletable.

7. **Billing and navigation**
   - Create `/billing` with subscription, payment method, modules, and invoices.
   - Update every Billing navigation item to open `/billing`; keep Settings limited to Profile and Notifications.

## Validation
- Exercise each corrected flow in the live preview, including searches, filters, dialogs, downloads, pagination, and destination URLs.
- Check desktop and mobile layouts, route metadata, console/runtime errors, and the final build status.

## Technical notes
- Use client-side state and generated Blob downloads for this prototype; no persistent storage is introduced.
- Add dedicated TanStack route files for every new destination and preserve the shared `KearlyLogo` component.
- Keep data changes in page state so actions are demonstrably functional without changing the product’s backend scope.
