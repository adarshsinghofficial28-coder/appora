# Appora — Domain Model

A shared vocabulary for the Appora codebase. Keep this file current when the
domain changes. ADRs live in `docs/adr/` when decisions need recording.

## Purpose

Appora is a **software directory & discovery product**. It lets people find,
evaluate, and bookmark tools across categories like productivity, design,
development, AI, and communication.

## Core entities

### App
A software product listed in the directory. The central domain object.

- `name` — display name (unique among live apps, used as the detail-page key).
- `url` — canonical website link.
- `desc` — one-paragraph description (the "README" of the app).
- `category` — one of: Productivity, Design, Development, AI, Communication, Marketing.
- `rating` — numeric 1–5 (allow 0.5 steps), shown as a star figure.
- `platforms` — set drawn from: web, macOS, Windows, Linux, iOS, Android.
- `logo` — optional image (URL or data URL) shown in cards/hero.
- `status` — `live` (visible to everyone) or `pending` (draft/awaiting review).

### Pricing
How an app is monetised; also acts as a filter tag.

- `free` — usable at no cost.
- `paid` — requires payment for full use.
- `open-source` — source-available / free-to-self-host.

> The code stores the canonical value on `app.tag` (surfaced as `pricing`);
> the UI labels it `Open Source`, `Paid`, or `Free`.

### User
A registered person. Identification is email-based; authentication is
client-side (see Security).

- Identity fields: `id`, `name`, `email`.
- Credential: `password` — **only** a SHA-256 hash (`hash$…`) is persisted,
  never plaintext (legacy plaintext records are upgraded on first login).

### Session
The signed-in state for a user. Held in `localStorage` (`appora_session`)
with `{ id, name, email }`. Absent ⇒ signed out; present ⇒ signed in.

### Bookmark (saved app)
A user's personal link from an app to their dashboard. Stored as a list of
app ids (`appora_saved_apps`). Cards/counters derive from this set.

### Activity
A derived, read-only view of recent app changes (currently synthesised from
live apps, newest first).

## Relationships

- A **User** may hold many **Bookmarks**; a **Bookmark** references one **App**.
- An **App** belongs to exactly one **Category** and has one **Pricing** tag.
- A **User**'s **Session** is valid until they Sign Out (no expiry today).

## Invariants (enforced in code)

1. An app's `tag` is always one of `free` | `paid` | `open-source`.
2. An app's `status` is one of `live` | `pending`.
3. `rating` is between 1 and 5 (inclusive) when present.
4. Live app `name`s are treated as case-insensitive-unique for routing
   (`app-detail.html?name=…`).
5. A user's email is unique and stored lowercased.
6. Passwords are never emitted back to any UI; only hashes are stored.
7. Only `live` apps appear on public pages (home, browse, detail, search).

## Security vocabulary

- **Honeypot** — a hidden form trap; a non-empty value means the submitter is
  likely a bot and the submission is silently dropped.
- **Rate limit / lockout** — after 5 failed logins for an email, that email is
  locked with an escalating cooldown (30s → 60s → … capped at 30min).
- **Sanitization** — escaping of `& < > " '` before any user-supplied string
  is rendered into the DOM (defence against stored XSS).

## Not modelled (out of scope)

- Multi-tenant organisations, roles/permissions beyond a single admin surface.
- Server-side auth, email verification, password reset flows.
- Billing / transactions (pricing page is informational).
