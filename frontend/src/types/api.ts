/**
 * Shared API types — mirror these on the backend.
 * Keep in sync with backend/ROADMAP.md "REST API contract" section.
 *
 * Convention:
 *   - All IDs are strings (cuid/uuid).
 *   - Dates are ISO 8601 strings on the wire.
 *   - Money in USD cents.
 */

// ---------- Primitives ----------

export type ID = string;
export type ISODate = string;

export interface Pagination {
  cursor?: string;
  limit?: number;
}

export interface Page<T> {
  items: T[];
  nextCursor?: string;
}

// ---------- Users / auth ----------

export interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  pronouns?: string;
  timezone?: string;
  emailVerifiedAt?: ISODate;
  createdAt: ISODate;
}

export interface AuthSession {
  user: User;
  workspace: Workspace;
  accessToken: string;
  refreshToken: string;
}

// ---------- Workspaces / RBAC ----------

export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";
export type Plan = "FREE" | "PRO" | "TEAM";

export interface Workspace {
  id: ID;
  name: string;
  slug: string;
  ownerId: ID;
  plan: Plan;
  createdAt: ISODate;
}

export interface Member {
  id: ID;
  userId: ID;
  workspaceId: ID;
  role: WorkspaceRole;
  user: Pick<User, "id" | "firstName" | "lastName" | "email" | "avatarUrl">;
  status: "active" | "invited";
}

export interface Invitation {
  id: ID;
  email: string;
  workspaceId: ID;
  role: WorkspaceRole;
  token: string;
  expiresAt: ISODate;
  status: "pending" | "accepted" | "expired";
}

// ---------- Meetings ----------

export type MeetingState =
  | "scheduled"
  | "live"
  | "ended"
  | "processing"
  | "ready";

export interface Meeting {
  id: ID;
  workspaceId: ID;
  hostId: ID;
  title: string;
  code: string;
  scheduledAt?: ISODate;
  startedAt?: ISODate;
  endedAt?: ISODate;
  state: MeetingState;
  participantCount: number;
  durationSec?: number;
  hasSummary: boolean;
  hasRecording: boolean;
  createdAt: ISODate;
}

export interface MeetingParticipant {
  id: ID;
  meetingId: ID;
  userId?: ID;
  displayName: string;
  role: "host" | "guest";
  joinedAt: ISODate;
  leftAt?: ISODate;
}

export interface JoinTokenResponse {
  meeting: Meeting;
  joinToken: string;
  joinUrl: string;
}

// ---------- Transcripts / summaries ----------

export interface TranscriptSegment {
  id: ID;
  speakerId?: ID;
  speakerName: string;
  text: string;
  startMs: number;
  endMs: number;
}

export interface Transcript {
  id: ID;
  meetingId: ID;
  language: string;
  status: "pending" | "processing" | "ready" | "failed";
  segments: TranscriptSegment[];
}

export interface Summary {
  id: ID;
  meetingId: ID;
  tldr: string;
  keyPoints: string[];
  decisions: string[];
  status: "pending" | "processing" | "ready" | "failed";
  createdAt: ISODate;
}

export type ActionItemStatus = "open" | "done" | "cancelled";

export interface ActionItem {
  id: ID;
  meetingId: ID;
  summaryId: ID;
  ownerUserId?: ID;
  ownerName: string;
  text: string;
  dueDate?: ISODate;
  status: ActionItemStatus;
}

// ---------- Chat ----------

export interface ChatMessage {
  id: ID;
  meetingId: ID;
  authorId: ID;
  authorName: string;
  text: string;
  createdAt: ISODate;
}

// ---------- Recordings ----------

export type RecordingStatus =
  | "pending"
  | "processing"
  | "ready"
  | "failed";

export interface Recording {
  id: ID;
  meetingId: ID;
  durationSec: number;
  sizeBytes: number;
  status: RecordingStatus;
  downloadUrl?: string;
  createdAt: ISODate;
}

// ---------- Integrations / billing ----------

export type IntegrationType =
  | "google_calendar"
  | "slack"
  | "notion"
  | "linear";

export interface Integration {
  id: ID;
  type: IntegrationType;
  accountLabel: string;
  status: "connected" | "expired" | "error";
  scopes: string[];
}

export interface Subscription {
  id: ID;
  workspaceId: ID;
  plan: Plan;
  status: "active" | "trialing" | "past_due" | "canceled";
  currentPeriodEnd: ISODate;
  cancelAtPeriodEnd: boolean;
}

// ---------- Preferences ----------

export interface UserPreferences {
  cameraOnDefault: boolean;
  micOnDefault: boolean;
  autoRecord: boolean;
  autoSummary: boolean;
  captionsDefault: boolean;
  notifyEmailSummary: boolean;
  notifyEmailDigest: boolean;
  notifySlackSummary: boolean;
  notifyPushReminders: boolean;
  timezone: string;
}

// ---------- Search ----------

export type SearchHitKind = "meeting" | "summary" | "transcript" | "task";

export interface SearchHit {
  kind: SearchHitKind;
  meetingId: ID;
  meetingTitle: string;
  snippet: string;
  score: number;
  highlight?: { field: string; html: string };
}

// ---------- Socket events ----------

export interface ServerToClientEvents {
  "meeting:joined": (p: { participant: MeetingParticipant }) => void;
  "meeting:left": (p: { participantId: ID }) => void;
  "presence:update": (p: {
    participantId: ID;
    micOn: boolean;
    cameraOn: boolean;
    handRaised: boolean;
  }) => void;
  "chat:message": (p: ChatMessage) => void;
  "chat:history": (p: ChatMessage[]) => void;
  "recording:state": (p: { status: "on" | "off" }) => void;
  "notes:bullet": (p: {
    id: ID;
    type: "section" | "bullet" | "task";
    text: string;
    createdAt: ISODate;
  }) => void;
  "transcript:segment": (p: TranscriptSegment) => void;
  error: (p: { code: string; message: string }) => void;
}

export interface ClientToServerEvents {
  "presence:update": (p: {
    micOn: boolean;
    cameraOn: boolean;
    handRaised: boolean;
  }) => void;
  "chat:send": (p: { text: string }) => void;
  "recording:start": () => void;
  "recording:stop": () => void;
}
