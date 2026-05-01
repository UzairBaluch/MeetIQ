# MeetIQ Backend — Roadmap & Checklist

> This file maps every feature the frontend currently expects to a concrete backend work item.
> The agent will **not** write code in this folder — it's yours. Use this as your build plan.

---

## 0. Frontend pages → backend surface area

| Frontend route | Needs backend |
|---|---|
| `/` (landing), `/pricing` | None (static) |
| `/sign-in`, `/sign-up`, `/forgot-password` | Auth module |
| `/dashboard` | Dashboard summary endpoints |
| `/meetings`, `/meetings/new`, `/meetings/join` | Meetings CRUD + invite/join flow |
| `/meeting/:id` | WebRTC signaling, Socket.IO gateway, recording, live transcription |
| `/notes`, `/notes/:id` | Summaries + transcripts read APIs |
| `/recordings` | Recording list + signed download URLs |
| `/team` | Workspaces + members + invites + RBAC |
| `/billing` | Stripe customer + subscription |
| `/settings` | Profile + preferences + integrations |

---

## 1. Architecture (recap)

Horizontal 4-layer layout (Express + Mongoose):

```
backend/src/
  app.ts             # Express app factory
  server.ts          # HTTP listen, Mongo connect, Socket.IO bootstrap
  config/            # env, DB bootstrap
  routes/            # express.Router mounts → controllers
  controllers/       # HTTP: validate body/query, call service, send response
  services/          # business rules — no Mongoose imports when a repo exists
  repositories/      # persistence (queries, saves); import models from models/
  models/            # Mongoose Schema + model definitions
  middleware/        # auth, errors, logging, limits
  utils/             # shared helpers & infra glue (e.g. socket registry)
```

Name files consistently by resource (`user.routes.ts`, `user.controller.ts`, `user.service.ts`, `user.repository.ts`; `models/user.model.ts`).

**Validation:** HTTP-only Zod (etc.) stays co-located as `controllers/<resource>.schema.ts` or under `utils/` when shared — not a separate top-level `schemas/` folder. **Mongo schema** lives **only** in `models/` (no Zod ↔ document mixing unless deliberate).

---

## 2. Phased delivery plan

### Phase 0 — Foundations (1–2 days)

- [ ] Bootstrap `pnpm init`, TS, Express, Helmet, CORS, compression
- [ ] Zod-validated env loader at `src/config/env.ts` (fail fast on missing vars)
- [ ] Pino logger + request-id middleware
- [ ] Global error handler middleware (`AppError` class with `status`, `code`, `message`)
- [ ] Health check `GET /healthz` (db ping + redis ping)
- [ ] Prisma init + `prisma/schema.prisma` skeleton (User, Workspace, Membership)
- [ ] Docker Compose for local Postgres + Redis
- [ ] Husky pre-commit (lint, typecheck, format)

### Phase 1 — Auth & accounts (2–3 days)

- [ ] `User` model (email unique, password hash, name, avatarUrl, createdAt)
- [ ] `RefreshToken` model (rotated, hashed, deviceId, expiresAt)
- [ ] `POST /auth/sign-up` — email + password + name → user + workspace + access/refresh
- [ ] `POST /auth/sign-in` — bcrypt compare, issue tokens
- [ ] `POST /auth/refresh` — rotate refresh token, return new access
- [ ] `POST /auth/sign-out` — invalidate refresh token
- [ ] `GET /auth/me` — current user + active workspace
- [ ] OAuth: Google + GitHub (passport or arctic + lucia, your call)
- [ ] `POST /auth/forgot-password` + `POST /auth/reset-password`
- [ ] Email verification flow (token + email send via Resend/SES)
- [ ] `requireAuth` middleware (verify access token, attach `req.user`)
- [ ] `requireWorkspace` middleware (verify membership)
- [ ] Rate-limit auth routes (express-rate-limit + Redis store)

### Phase 2 — Workspaces & RBAC (1–2 days)

- [ ] `Workspace` model (name, slug, ownerId, plan)
- [ ] `Membership` model (userId, workspaceId, role: OWNER/ADMIN/MEMBER)
- [ ] `Invitation` model (email, workspaceId, token, expiresAt, status)
- [ ] `POST /workspaces` — create
- [ ] `GET /workspaces` — list user's workspaces
- [ ] `POST /workspaces/:id/invitations` — invite by email (sends email)
- [ ] `POST /invitations/:token/accept` — accept invite
- [ ] `GET /workspaces/:id/members` — list members
- [ ] `PATCH /workspaces/:id/members/:userId` — change role
- [ ] `DELETE /workspaces/:id/members/:userId` — remove
- [ ] `requireRole(['OWNER','ADMIN'])` middleware factory

### Phase 3 — Meetings core (2–3 days)

- [ ] `Meeting` model (id, workspaceId, hostId, title, scheduledAt, startedAt, endedAt, code (short), state)
- [ ] `MeetingParticipant` model (meetingId, userId|null, displayName, role, joinedAt, leftAt)
- [ ] `POST /meetings` — create scheduled or instant meeting (returns join URL + code)
- [ ] `GET /meetings` — list past + upcoming for current workspace
- [ ] `GET /meetings/:id` — single meeting detail
- [ ] `POST /meetings/join` — join by code (returns LiveKit token if using SFU)
- [ ] `POST /meetings/:id/start` — host starts the meeting
- [ ] `POST /meetings/:id/end` — host ends, triggers post-meeting jobs
- [ ] Calendar sync (Google Calendar OAuth) — read upcoming events, write back invites

> **Reality check on WebRTC:** don't build the SFU. Pick one:
> - **LiveKit** (open source, self-hostable) — recommended
> - **Daily.co** / **Agora** (managed) — fastest to ship
> Your backend issues join tokens and stores metadata; the SFU handles media.

### Phase 4 — Real-time gateway (Socket.IO) (2 days)

Namespace per concern:
- `/meeting` — chat, presence, hand raise, recording state, AI notes stream

- [ ] Socket.IO with Redis adapter for horizontal scaling
- [ ] JWT auth handshake (token in `auth.token`)
- [ ] Room = meetingId; on connect verify participant has access
- [ ] Events (server ↔ client):
  - [ ] `meeting:joined` (server → all)
  - [ ] `meeting:left` (server → all)
  - [ ] `chat:message` (bidirectional, persisted)
  - [ ] `chat:history` (server → client on join)
  - [ ] `presence:update` (mute/camera/handRaised state)
  - [ ] `recording:state` (started/stopped, host only)
  - [ ] `notes:bullet` (server → all, streamed from AI worker)
  - [ ] `transcript:segment` (server → all, streamed from STT)
- [ ] Rate-limit chat events per socket
- [ ] On `disconnect` → mark participant left, broadcast

### Phase 5 — Recording + transcription (3–4 days)

- [ ] LiveKit egress webhook → S3/R2 upload (or use Daily's recording API)
- [ ] `Recording` model (meetingId, s3Key, durationSec, sizeBytes, status)
- [ ] BullMQ queue `recordings:process`
  - [ ] Worker: pull from S3, run ffmpeg for normalized audio extract
  - [ ] Enqueue `transcripts:generate` on success
- [ ] BullMQ queue `transcripts:generate`
  - [ ] Worker: send audio to Deepgram/AssemblyAI/Whisper
  - [ ] Persist `Transcript` + `TranscriptSegment` rows
  - [ ] Enqueue `summaries:generate` on success
- [ ] Live transcription path (parallel to recording)
  - [ ] LiveKit audio track → STT streaming endpoint
  - [ ] Forward segments to `/meeting` socket as `transcript:segment`

### Phase 6 — AI summaries + action items (2–3 days)

- [ ] `Summary` model (meetingId, tldr, keyPoints[], decisions[], status)
- [ ] `ActionItem` model (meetingId, summaryId, ownerUserId|null, ownerName, text, dueDate, status)
- [ ] BullMQ queue `summaries:generate`
  - [ ] Worker: load full transcript, call OpenAI (chunked if needed)
  - [ ] Structured output via JSON schema or `response_format: json_schema`
  - [ ] Persist Summary + ActionItems atomically
  - [ ] Enqueue `recap:send` on success
- [ ] `GET /meetings/:id/summary` — read summary
- [ ] `GET /meetings/:id/transcript?q=…` — full + searchable
- [ ] `PATCH /action-items/:id` — update status / assignee
- [ ] Workspace-wide search: `GET /search?q=…` (Postgres FTS or Meilisearch)

### Phase 7 — Recap delivery + integrations (2 days)

- [ ] BullMQ queue `recap:send`
  - [ ] Worker: render email template (React Email), send via Resend
  - [ ] Slack: post to user's DM via Slack OAuth token
  - [ ] Notion: append to a "Meeting Notes" database (if connected)
- [ ] `Integration` model (userId|workspaceId, type, accessToken (encrypted), refreshToken, expiresAt)
- [ ] OAuth flows: Slack, Google Calendar, Notion, Linear
- [ ] Webhooks endpoint for inbound events
- [ ] `GET /integrations`, `POST /integrations/:type/disconnect`

### Phase 8 — Billing (Stripe) (2 days)

- [ ] `Subscription` model (workspaceId, stripeCustomerId, plan, status, currentPeriodEnd)
- [ ] `POST /billing/checkout` — create Stripe Checkout Session
- [ ] `POST /billing/portal` — create Customer Portal Session
- [ ] `POST /billing/webhook` — handle: `customer.subscription.{created,updated,deleted}`, `invoice.payment_failed`
- [ ] Plan-gated middleware `requirePlan(['PRO','TEAM'])`
- [ ] Usage tracking (meetings count, summary count, storage)

### Phase 9 — Settings + preferences (1 day)

- [ ] `UserPreferences` model (userId, cameraOnDefault, micOnDefault, autoRecord, autoSummary, captionsDefault, notifyEmailSummary, notifyEmailDigest, notifySlackSummary, notifyPushReminders, timezone)
- [ ] `GET /me/preferences`, `PATCH /me/preferences`
- [ ] `PATCH /me` — profile (name, avatar, pronouns)
- [ ] Avatar upload → S3 with presigned PUT

### Phase 10 — Hardening (ongoing)

- [ ] OpenAPI / Swagger doc generation
- [ ] Structured audit log (who did what, when)
- [ ] Rate limiting per route group
- [ ] Helmet CSP locked down
- [ ] CORS allowlist from env
- [ ] Backups + PITR for Postgres
- [ ] Sentry / OpenTelemetry tracing
- [ ] Load test (k6) on signaling and chat
- [ ] Penetration test pass (OWASP top 10)

---

## 3. REST API contract (target shape)

> Frontend will read from these. Stable shapes preferred over flexibility.

### Auth
```
POST   /auth/sign-up           { email, password, firstName, lastName } → { user, accessToken, refreshToken }
POST   /auth/sign-in           { email, password }                       → { user, accessToken, refreshToken }
POST   /auth/refresh           { refreshToken }                          → { accessToken, refreshToken }
POST   /auth/sign-out          {}                                        → 204
GET    /auth/me                                                          → { user, workspace }
POST   /auth/forgot-password   { email }                                 → 204
POST   /auth/reset-password    { token, password }                       → 204
GET    /auth/oauth/:provider/start                                       → 302
GET    /auth/oauth/:provider/callback                                    → 302
```

### Meetings
```
POST   /meetings                       { title?, scheduledAt? }   → Meeting
GET    /meetings?filter=upcoming|past  → Meeting[]
GET    /meetings/:id                                              → Meeting + participants
POST   /meetings/join                  { code }                   → { meeting, joinToken }
POST   /meetings/:id/start                                        → Meeting
POST   /meetings/:id/end                                          → Meeting
GET    /meetings/:id/summary                                      → Summary
GET    /meetings/:id/transcript?q=                                → TranscriptSegment[]
```

### Workspaces
```
GET    /workspaces                                                → Workspace[]
POST   /workspaces                     { name }                   → Workspace
GET    /workspaces/:id/members                                    → Member[]
POST   /workspaces/:id/invitations     { email, role }            → Invitation
PATCH  /workspaces/:id/members/:uid    { role }                   → Member
DELETE /workspaces/:id/members/:uid                               → 204
```

### Notes / search
```
GET    /notes?q=&from=&to=                                        → SummaryListItem[]
GET    /notes/:meetingId                                          → Summary
PATCH  /action-items/:id               { status?, ownerUserId? }  → ActionItem
GET    /search?q=                                                 → SearchHit[] (across summaries + transcripts)
```

### Billing
```
POST   /billing/checkout         { plan, seats }   → { url }
POST   /billing/portal                              → { url }
POST   /billing/webhook          (Stripe-signed)    → 200
```

### Settings
```
GET    /me/preferences                              → Preferences
PATCH  /me/preferences                              → Preferences
PATCH  /me                                          → User
POST   /me/avatar/upload-url                        → { uploadUrl, key }
GET    /integrations                                → Integration[]
POST   /integrations/:type/connect                  → 302 (OAuth)
POST   /integrations/:type/disconnect               → 204
```

---

## 4. Socket.IO event contract

Namespace: `/meeting` · Room: `meetingId`

| Event | Direction | Payload |
|---|---|---|
| `meeting:joined` | server → room | `{ participant }` |
| `meeting:left` | server → room | `{ participantId }` |
| `presence:update` | client → server, server → room | `{ micOn, cameraOn, handRaised }` |
| `chat:send` | client → server | `{ text }` |
| `chat:message` | server → room | `{ id, authorId, authorName, text, createdAt }` |
| `chat:history` | server → client (on connect) | `Message[]` |
| `recording:start` / `recording:stop` | host → server | `{}` |
| `recording:state` | server → room | `{ status: 'on'\|'off' }` |
| `notes:bullet` | server → room | `{ id, type: 'section'\|'bullet'\|'task', text, createdAt }` |
| `transcript:segment` | server → room | `{ id, speakerId, speakerName, text, startMs, endMs }` |
| `error` | server → client | `{ code, message }` |

---

## 5. Database schema sketch (Prisma)

Models to create (don't paste this verbatim — read it, then write your own):

```
User             id, email, passwordHash?, firstName, lastName, avatarUrl, emailVerifiedAt, createdAt
RefreshToken     id, userId, tokenHash, deviceId, expiresAt, revokedAt
OAuthAccount     id, userId, provider, providerAccountId, accessToken, refreshToken, expiresAt
Workspace        id, name, slug (unique), ownerId, plan, createdAt
Membership       id, userId, workspaceId, role (enum), createdAt   @@unique([userId, workspaceId])
Invitation       id, email, workspaceId, role, token (unique), expiresAt, status, invitedById
Meeting          id, workspaceId, hostId, title, code (unique short), scheduledAt?, startedAt?, endedAt?, state
MeetingParticipant id, meetingId, userId?, displayName, role, joinedAt, leftAt?
Recording        id, meetingId, s3Key, durationSec, sizeBytes, status
Transcript       id, meetingId, language, status
TranscriptSegment id, transcriptId, speakerId?, speakerName, text, startMs, endMs   @@index([transcriptId])
Summary          id, meetingId (unique), tldr, keyPoints (jsonb), decisions (jsonb), status, createdAt
ActionItem       id, summaryId, meetingId, ownerUserId?, ownerName, text, dueDate?, status
ChatMessage      id, meetingId, authorId, text, createdAt
Integration      id, userId?, workspaceId?, type, accessToken (encrypted), refreshToken (encrypted), expiresAt, scope, accountLabel
Subscription     id, workspaceId (unique), stripeCustomerId, stripeSubscriptionId, plan, status, currentPeriodEnd
UserPreferences  id, userId (unique), <every preference field as bool/string>
AuditLog         id, actorId, workspaceId?, action, target, metadata (jsonb), createdAt
```

Suggested enums: `MembershipRole`, `MeetingState`, `RecordingStatus`, `SummaryStatus`, `ActionItemStatus`, `Plan`.

---

## 6. Background jobs (BullMQ)

| Queue | Producer | Worker |
|---|---|---|
| `recordings:process` | meeting:end webhook | extract audio, normalize, store, enqueue transcript |
| `transcripts:generate` | recordings:process | call STT, persist segments, enqueue summary |
| `summaries:generate` | transcripts:generate | call OpenAI, persist summary + action items, enqueue recap |
| `recap:send` | summaries:generate | render email + Slack DM, send |
| `email:send` | various | generic email sender (Resend) |
| `cleanup:old-recordings` | cron | delete recordings past retention |

Use Redis Streams or BullMQ; idempotency key = `meetingId:phase`.

---

## 7. Required env vars (`.env.example`)

```
# Server
NODE_ENV=development
PORT=4000
APP_URL=http://localhost:3000
API_URL=http://localhost:4000
LOG_LEVEL=debug

# Auth
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=30d
COOKIE_DOMAIN=localhost

# DB / Cache
DATABASE_URL=postgresql://meetiq:meetiq@localhost:5432/meetiq
REDIS_URL=redis://localhost:6379

# Storage
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=meetiq-recordings
S3_ACCESS_KEY=
S3_SECRET_KEY=

# AI
OPENAI_API_KEY=
DEEPGRAM_API_KEY=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=

# Email
RESEND_API_KEY=
EMAIL_FROM="MeetIQ <hello@meetiq.app>"

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PRO=

# Real-time / SFU
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=
```

---

## 8. Definition of done (per module)

A module is "done" when:

- [ ] All endpoints have Zod-validated input + typed output
- [ ] Service has unit tests covering happy + edge paths
- [ ] Integration tests hit real DB (test container)
- [ ] OpenAPI schema includes all routes
- [ ] Rate limits set on user-facing routes
- [ ] Auth + RBAC checks confirmed in tests
- [ ] Errors returned use `AppError` taxonomy (no leaked stack)
- [ ] Logs include `requestId`, `userId`, `workspaceId`

---

## 9. What the agent will do for you (and what it won't)

**Will:**
- Stub TS interfaces in `frontend/src/types/api.ts` mirroring the contracts above.
- Help you debug a specific service / route when you ask.
- Explain a tricky pattern (BullMQ idempotency, Socket.IO scaling, Stripe webhooks).
- Review a diff for bugs / sec issues.

**Won't (unless you say "fix it" / "write it"):**
- Generate full controllers, services, repositories, or routes.
- Refactor your code unprompted.
- Add backend dependencies on its own.
