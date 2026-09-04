# MASC Website - Backend

The backend API powering the club website, providing authentication, content management, event management, attendance, image storage, and administrative functionality.

Built with **Bun**, **Express 5**, **TypeScript**, **MongoDB**, and **Supabase**.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Bun** | JavaScript runtime and package manager |
| **TypeScript** | Type-safe backend development |
| **Express 5** | HTTP server and API framework |
| **MongoDB** | Primary database |
| **Mongoose** | MongoDB ODM |
| **Supabase** | S3-compatible image storage |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Zod** | Request validation |
| **Multer** | File upload handling |
| **JSON2CSV** | Data export |
| **Pino** | Application logging |
| **Morgan** | HTTP request logging |
| **CORS** | Cross-origin request handling |
| **Cookie Parser** | Cookie handling |

## Runtime

```text
Entry Point: src/server.ts
Module System: ES Modules
Language: TypeScript
Runtime: Bun
```

## Architecture

```text
Client
  │
  ▼
Express API
  │
  ├── Authentication
  ├── User Management
  ├── Blog Management
  ├── Event Management
  ├── Attendance
  ├── File Uploads
  └── Data Export
       │
       ├── MongoDB
       └── Supabase Storage
```

## Core Features

### Authentication

- User registration and login
- JWT-based authentication
- Cookie-based session handling
- Password hashing with bcrypt
- Protected admin routes

### User & Admin Management

- Manage registered users
- Grant or revoke admin privileges
- Update student account details
- Reset student passwords

### Blog Management

- Create, update, delete and retrieve blogs
- Slug-based blog access

> **Warning:** Deleted blogs cannot be restored.

### Event Management

- Create, update, delete and retrieve events
- Manage event registrations
- Track attendance
- Export event data

> **Warning:** Deleted events cannot be restored.

### Attendance

Supports event attendance management using student identification data received from the frontend.

### File Storage

Images are stored using the project's **Supabase S3 bucket**.

The backend handles file uploads through Multer and returns the resulting storage URLs.

### Data Export

Event and registration data can be converted to CSV using `json2csv` for spreadsheet-compatible exports.

---
# Development

## Requirements

- [Bun](https://bun.sh/)
- MongoDB database
- Supabase project
- Required environment variables

## Installation

```bash
bun install
```

## Development Server

```bash
bun run dev
```

## Production

```bash
bun run start
```

# Environment Variables

Configure the required environment variables before starting the server.

```env
BUN_VERSION=1.4

CLIENT_URL=http://localhost:3000

JWT_SECRET=secret

MONGO_PASS=pass
MONGO_URI=uri
MONOGO_USER=username

PORT=8080
STATUS=DEV

SUPABASE_SECRET_KEY=secret
SUPABASE_URL=url

```

> env.sample is also provided in project

# Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start development server with watch mode |
| `bun run start` | Start production server |

---

# Important Notes

- **Bun** is the primary runtime.
- The project uses **TypeScript** with ES modules.
- MongoDB is accessed through **Mongoose**.
- Authentication uses **JWT** and cookies.
- Supabase is used for image storage.
- Multer handles incoming file uploads.
- Pino and Morgan provide application and HTTP logging.
- Deleted blogs and events cannot be restored.
- Never expose Supabase service-role keys or JWT secrets to the frontend.

---

## `MADE BY SHREE BAVACHIKAR`

> *Hey, stranger. Keep going. You're doing better than you think.*

[There's more on my GitHub, if you're curious →](https://github.com/ssb-shree?tab=repositories)  
[Here's my LinkedIn. Say hello too →](https://www.linkedin.com/in/shree-bavachikar-a16493375/)
