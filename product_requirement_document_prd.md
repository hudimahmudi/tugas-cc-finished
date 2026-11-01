# Product Requirement Document (PRD)
## Creator Content & Pipeline Tracker

---

## 1. Executive Summary & Goals

### 1.1 Overview
The **Creator Content & Pipeline Tracker** is a web-based productivity application tailored for content creators and their production teams (editors, scripts writers, managers). It addresses the chaotic nature of cross-platform content creation by providing an end-to-end management pipeline—from raw idea generation and scripting to recording, editing, approval, publication, and post-publish performance metric tracking.

### 1.2 Objectives
* **Streamline Workflow:** Consolidate multi-platform content planning (YouTube, TikTok, Instagram, LinkedIn) into a single unified pipeline.
* **Ensure Quality & Completeness:** Enforce stage-based checklists and publication rules (e.g., mandatory URL validation prior to marking as published).
* **Track Growth:** Record historical analytical metrics (views, likes, comments, shares) to evaluate content performance over time.
* **Onboarding & Evaluation Standard:** Serve as a standardized full-stack assignment project for onboarding and evaluating junior software engineers.

---

## 2. User Roles & Personas

| Role | Access Level | Description & Responsibilities |
| :--- | :--- | :--- |
| **Creator / Admin** | Full Access | Creates and manages channels, adds raw ideas, assigns schedules, updates statuses, inputs metrics, and reviews overall metrics. |
| **Editor / Contributor** | Limited / Standard | Views assigned content, updates production checklists (scripting, editing, b-roll), uploads preview/draft links, and moves statuses from *Recording* to *Ready*. |

---

## 3. Product Architecture & User Workflows

### 3.1 Content Lifecycle Flow
```
[ 1. Idea Backlog ]
        │
        ▼
[ 2. Scripting / Planning ] ── (Target platforms, script drafts, target release date)
        │
        ▼
[ 3. In Production / Recording ] ── (B-Roll, shot list checklists)
        │
        ▼
[ 4. Editing & Review ] ── (Draft previews, thumbnail approvals)
        │
        ▼
[ 5. Ready ] ── (Final assets approved, awaiting posting)
        │
        ▼
[ 6. Published ] ── (Validates published_url, unlocks analytics tracking)
```

### 3.2 Key User Journeys
1. **Authentication & Channel Onboarding:** User registers/logins and connects modern social platform channels (YouTube handle, TikTok account, IG handle, etc.).
2. **Idea Lifecycle Management:**
   * User creates an entry with initial status `idea`.
   * Sets format (`short_video`, `long_video`, `carousel`, `single_post`) and priority (`low`, `medium`, `high`).
   * Transitions content across statuses as work progresses.
3. **Execution & Subtask Tracking:**
   * Add dynamic sub-checklists to content items (e.g., "Script hook drafted", "B-roll recorded").
   * Toggle completion real-time without full page reloads.
4. **Publishing & Analytics Logging:**
   * Transitioning status to `published` requires a valid URL.
   * Input periodic metric snapshots (Views, Likes, Comments, Shares) to log growth over time.

---

## 4. Feature Requirements & Tickets (Backlog)

### Ticket 1: Database Setup & Model Relations [CCP-01]
* **Category:** Infrastructure / Database
* **Description:** Create database migrations, foreign key constraints (with cascading deletes), and Eloquent/ORM models for all 5 entities (`users`, `channels`, `contents`, `content_checklists`, `content_metrics`).
* **Acceptance Criteria:**
  - Migrations run error-free on a clean database.
  - Database seeder populates dummy account, 2 channels, and 3 content entries.

### Ticket 2: Authentication & Channel Management [CCP-02]
* **Category:** Authentication & Core Setup
* **Description:** Implement secure registration, authentication, and social channel registration/management.
* **Acceptance Criteria:**
  - Secure registration/login with hashed passwords (Bcrypt/Argon2).
  - Users can list and add social channels (YouTube, TikTok, Instagram, LinkedIn).

### Ticket 3: Content CRUD & Pipeline Filter [CCP-03]
* **Category:** Core Feature
* **Description:** Kanban/List view to manage content life cycles from `idea` to `ready`.
* **Acceptance Criteria:**
  - Content form validates title, selected channel, and format type.
  - Interactive filtering by status, target platform, and content format.
  - Content status updates smoothly.

### Ticket 4: Production Subtask Checklists [CCP-04]
* **Category:** Sub-Module
* **Description:** Dynamic checklist inside the content detail view to monitor production tasks.
* **Acceptance Criteria:**
  - Users can create new checklist items.
  - Real-time status toggling (via Fetch/AJAX/Livewire) without full reloads.
  - Delete capability for checklist items.

### Ticket 5: Publication Validation & Metric Logging [CCP-05]
* **Category:** Business Logic & Analytics
* **Description:** Enforce URL validation upon publication and enable historic metric tracking.
* **Acceptance Criteria:**
  - Transition to `published` is rejected if `published_url` is missing or invalid.
  - Users can append snapshot logs for views, likes, comments, and shares over time.

---

## 5. Technical Specifications & Database Schema

### 5.1 Data Dictionary (ERD Schema)

#### Table 1: `users`
| Column Name | Data Type | Constraints | Description & Validation |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Unique user identifier |
| `name` | VARCHAR(100) | Not Null | User full name |
| `email` | VARCHAR(191) | Unique, Not Null | Valid email format |
| `password_hash` | VARCHAR(255) | Not Null | Bcrypt / Argon2 hash |
| `role` | VARCHAR(20) | Default: `creator` | Allowed: `creator`, `editor`, `admin` |
| `created_at` | TIMESTAMP | Not Null | Creation timestamp |

#### Table 2: `channels`
| Column Name | Data Type | Constraints | Description & Validation |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Unique channel identifier |
| `user_id` | BIGINT | FK (users.id) | `ON DELETE CASCADE` |
| `platform` | VARCHAR(30) | Not Null | Options: `youtube`, `tiktok`, `instagram`, `linkedin` |
| `handle_name` | VARCHAR(100) | Not Null | Account handle (e.g., `@techcreator`) |
| `created_at` | TIMESTAMP | Not Null | Creation timestamp |

#### Table 3: `contents`
| Column Name | Data Type | Constraints | Description & Validation |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Unique content identifier |
| `user_id` | BIGINT | FK (users.id) | Content author |
| `channel_id` | BIGINT | FK (channels.id) | Target platform |
| `title` | VARCHAR(255) | Not Null | Content title or topic |
| `description` | TEXT | Nullable | Concept summary / brief |
| `script_draft` | TEXT | Nullable | Draft text, hook, or full script |
| `format_type` | VARCHAR(30) | Not Null | Options: `short_video`, `long_video`, `carousel`, `single_post` |
| `status` | VARCHAR(20) | Default: `idea` | Options: `idea`, `scripting`, `recording`, `editing`, `ready`, `published` |
| `priority` | VARCHAR(10) | Default: `medium` | Options: `low`, `medium`, `high` |
| `scheduled_date` | DATE | Nullable | Planned publication date |
| `published_date` | DATE | Nullable | Actual publication date |
| `published_url` | VARCHAR(255) | Nullable | Post link (**Mandatory if status = published**) |
| `created_at` | TIMESTAMP | Not Null | Entry creation timestamp |
| `updated_at` | TIMESTAMP | Not Null | Last update timestamp |

#### Table 4: `content_checklists`
| Column Name | Data Type | Constraints | Description & Validation |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Unique checklist identifier |
| `content_id` | BIGINT | FK (contents.id) | `ON DELETE CASCADE` |
| `task_name` | VARCHAR(255) | Not Null | Task description (e.g., "Design Thumbnail") |
| `is_completed` | BOOLEAN | Default: `false` | Completion status |
| `created_at` | TIMESTAMP | Not Null | Creation timestamp |

#### Table 5: `content_metrics`
| Column Name | Data Type | Constraints | Description & Validation |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Unique metric log identifier |
| `content_id` | BIGINT | FK (contents.id) | `ON DELETE CASCADE` |
| `recorded_at` | DATE | Not Null | Snapshot date |
| `views_count` | INT | Default: 0 | Number of views |
| `likes_count` | INT | Default: 0 | Number of likes |
| `comments_count` | INT | Default: 0 | Number of comments |
| `shares_count` | INT | Default: 0 | Number of shares |
| `created_at` | TIMESTAMP | Not Null | Creation timestamp |

---

## 6. Recommended Tech Stack Options

* **Option 1: Modern Monolith (Primary Recommendation)**
  * **Framework:** Laravel 11/12 (Blade + Alpine.js / Livewire) or Inertia.js (Vue/React)
  * **Database:** MySQL / PostgreSQL
* **Option 2: Fullstack JavaScript/TypeScript**
  * **Framework:** Next.js (App Router) + Tailwind CSS + shadcn/ui
  * **ORM & DB:** Prisma ORM / Drizzle ORM + PostgreSQL
* **Option 3: Decoupled Architecture**
  * **Backend:** Express.js / NestJS + PostgreSQL
  * **Frontend:** React (Vite) + Tailwind CSS

---

## 7. API Endpoint Specification (REST)

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user | `201 Created` |
| `POST` | `/api/v1/auth/login` | Authenticate & issue token/session | `200 OK` |
| `GET` | `/api/v1/channels` | Retrieve user channels | `200 OK` |
| `POST` | `/api/v1/channels` | Add a new channel | `201 Created` |
| `GET` | `/api/v1/contents` | List contents (supports `?status=` & `?channel_id=`) | `200 OK` |
| `POST` | `/api/v1/contents` | Create a new content draft | `201 Created` |
| `GET` | `/api/v1/contents/:id` | Fetch content detail with checklists & metrics | `200 OK` |
| `PUT/PATCH`| `/api/v1/contents/:id` | Update content or transition status | `200 OK` |
| `DELETE` | `/api/v1/contents/:id` | Delete content & cascading children | `204 No Content` |
| `POST` | `/api/v1/contents/:id/checklists` | Add a checklist item | `201 Created` |
| `PATCH` | `/api/v1/checklists/:id/toggle` | Toggle checklist `is_completed` | `200 OK` |
| `POST` | `/api/v1/contents/:id/metrics` | Add a snapshot analytics metric log | `201 Created` |

---

## 8. Development & Quality Assurance Standards

### 8.1 Git Branching & Conventional Commits
* **Branching Strategy:**
  * `main` / `master`: Stable production-ready code.
  * `feature/<ticket-code>-feature-description` (e.g., `feature/CCP-02-auth-channel`).
* **Commit Message Format:**
  * `feat:` Add new features.
  * `fix:` Bug fixes.
  * `db:` Migrations/seeder updates.
  * `docs:` Documentation updates.

### 8.2 QA Test Cases Matrix

| Test ID | Action Steps | Expected Outcome |
| :--- | :--- | :--- |
| **TC-01** | Register with an already existing email address. | Validation fails with message: `"Email already taken"`. |
| **TC-02** | Submit content form leaving `title` blank. | Validation fails; prompt user that title is required. |
| **TC-03** | Update status to `published` without providing `published_url`. | Action rejected with clear error: URL required for published items. |
| **TC-04** | Delete content containing 3 checklists & 2 metric logs. | Content deleted along with all child records (no orphan records). |

---

## 9. Implementation Timeline & Evaluation Rubric

### 9.1 Sprint Timeline (2 Weeks / 14 Days)
* **Days 1–3:** Database setup, migrations, seeders, authentication, and channel management (`CCP-01`, `CCP-02`).
* **Days 4–7:** Content CRUD, pipeline display, and filter logic (`CCP-03`).
* **Days 8–10:** Production checklists, publish validation, and metric logging (`CCP-04`, `CCP-05`).
* **Days 11–12:** QA testing, manual test execution, and bug fixes.
* **Days 13–14:** Code review, README documentation, and final evaluation.

### 9.2 Developer Evaluation Rubric (Scale 1–4)

| Metric | Weight | Outstanding Standard (Score: 4) |
| :--- | :--- | :--- |
| **Database & Modeling** | 25% | Clean migrations/seeders, consistent naming, foreign keys & indexes properly set up. |
| **Logic & Data Validation** | 25% | Comprehensive server-side validation, robust error handling, publication rules strictly enforced. |
| **Clean Code & Git Workflow** | 20% | Clean directory layout, descriptive function names, conventional commit history per ticket. |
| **UI/UX & Responsiveness** | 20% | Clear pipeline design, intuitive status indications, clear feedback toast notifications. |
| **Documentation** | 10% | Clear README with local setup steps (migrations, seeders, `.env.example`, execution command). |