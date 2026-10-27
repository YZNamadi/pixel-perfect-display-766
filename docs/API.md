# Kearly REST API — v1

Base URL: `/api/public/v1`

Authentication: `Authorization: Bearer <access token>` on every endpoint except `_spec`, `auth/signup`, `auth/login`, `auth/refresh`. `GET /_spec` returns the live endpoint list and count.

Generic collection endpoints support query params: `q` (search), column filters (e.g. `status=Open`, `site_id=...`), `limit`, `offset`, `order`, `dir`.

Total endpoints: **102**.

## Auth (6)
- POST /auth/signup — email, password, full_name, account_type (`facility` | `contractor`)
- POST /auth/login — email, password → session
- POST /auth/logout — refresh_token
- POST /auth/refresh — refresh_token
- GET /auth/me — profile + roles
- PATCH /auth/me — update profile

## Dashboard (2)
- GET /dashboard/summary
- GET /dashboard/activity

## Resources (14 × 5 = 70)
Each of: sites, equipment, tickets, tasks, documents, members, contractors, certificates, staff, training, reports, audit, quotes, notifications
- GET /{resource} — list (search, filter, paginate)
- POST /{resource} — create
- GET /{resource}/{id}
- PATCH /{resource}/{id}
- DELETE /{resource}/{id}

Notes:
- `members` are internal team members; `contractors` are contractor members (same table, filtered).
- `audit` is immutable: DELETE returns 403; PATCH only accepts review_status/priority/notes.
- `quotes` are ticket quotes; filter by `ticket_id`.

## Specialized actions (24)
- GET /sites/{id}/stats
- GET /tasks/calendar?month=YYYY-MM
- POST /tasks/{id}/complete
- POST /tickets/{id}/assign — assignee (+ optional priority); sets status In Progress
- POST /tickets/{id}/complete
- POST /tickets/{id}/review — status In Review or Completed
- GET /tickets/{id}/quotes · POST /tickets/{id}/quotes · PATCH /tickets/{id}/quotes/{quoteId} (status Accepted/Rejected)
- POST /documents/upload — multipart: file, category, status, site_id
- GET /documents/{id}/download
- POST /certificates/upload — multipart: file, member_id, expires_on
- GET /certificates/{id}/download
- POST /reports/{id}/generate — fills report payload with live portfolio figures
- GET /reports/{id}/export — text export download
- POST /audit/{id}/review — review_status, priority, notes
- POST /audit/{id}/flag
- POST /notifications/{id}/read · POST /notifications/read-all
- GET /contractors/{id}/jobs · GET /contractors/{id}/certificates

## Settings (2)
- GET /settings · PUT /settings (JSON body stored as-is)

## Data ownership
Every row is scoped to the signed-in account (owner). Requests carry the caller's token, database rules enforce ownership, and files upload into per-owner folders in private storage (`documents`, `certificates` buckets).
