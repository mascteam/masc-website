# Club Website - Frontend

A modern club management and public-facing website built with **Next.js 16**, **React 19**, and **TypeScript**.

The platform provides public access to blogs and events while giving authorized administrators tools to manage content, users, attendance, and event engagement.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Application framework |
| **React 19** | UI development |
| **TypeScript** | Type-safe development |
| **Bun** | JavaScript runtime and package manager |
| **Zustand** | Global state management |
| **Axios** | API communication |
| **Tailwind CSS** | Styling and responsive UI |
| **Motion** | Animations and transitions |
| **Supabase S3** | Image storage |

## Rendering Architecture

The application uses a combination of **Server-Side Rendering (SSR)** and **Client-Side Rendering (CSR)**.

### SSR

Server-rendered pages are used where server-side rendering is beneficial for performance and SEO.

> **Vercel caching:** SSR pages may remain cached after database changes and may not reflect updates immediately.

### CSR

Client-rendered pages fetch data from the server and remain synchronized with the latest available data.

### Emergency SSR Refresh

If an SSR page needs to reflect database changes immediately:

1. Open the project's Vercel deployment.
2. Redeploy the latest commit or the `main` branch.
3. Wait for the deployment to complete.

This forces the application to rebuild the affected SSR pages.

---

# Routes

## Authentication

| Route | Description | Access |
|---|---|---|
| `/login` | Log in to an existing account | Public |
| `/register` | Register a new account | Public |

## Admin

| Route | Description |
|---|---|
| `/admin/nav` | Admin navigation |
| `/admin/team` | Grant or revoke admin access |
| `/admin/blogs` | Create, edit and delete blogs |
| `/admin/events` | Create, edit and delete events |
| `/admin/img-to-url` | Upload an image and generate its storage URL |
| `/admin/url-to-qr` | Generate QR codes from URLs |
| `/admin/update-student-details` | Reset a student's password |

> **Warning:** Deleted blogs and events cannot be restored.

## Blogs

| Route | Description | Access |
|---|---|---|
| `/blogs` | List all available blogs | Public |
| `/blogs/[slug]` | Read a specific blog | Public |
| `/blogs/[slug]/update` | Update an existing blog | Admin |
| `/blog/admin/create` | Create and publish a new blog | Admin |

## Events

| Route | Description | Access |
|---|---|---|
| `/events` | List public club events | Public |
| `/events/[slug]` | View event details and engage with the event | Public / Admin |
| `/events/create` | Create a new event | Admin |
| `/events/[slug]/update` | Update event information | Admin |
| `/events/[slug]/attendance` | Mark attendance by scanning student IDs | Admin |
| `/events/[slug]/feedback` | Generate a QR code for the feedback form | Admin |

## Home

| Route | Description |
|---|---|
| `/` | Main public landing page |

---

# Admin Capabilities

Authorized administrators can manage:

- **User Management** - Grant or revoke admin access
- **Blog Management** - Create, update and delete blogs
- **Event Management** - Create, update and delete events
- **Attendance** - Record event attendance by scanning student IDs
- **Event Data** - Export event information as Excel
- **Image Storage** - Upload images to the project's Supabase S3 bucket
- **QR Generation** - Generate QR codes for URLs and feedback forms
- **Password Management** - Reset student passwords when required

---

# Development

## Requirements

- [Bun](https://bun.sh/)
- Project environment variables
- Backend API

## Installation

```bash
bun install
```

## Development Server

```bash
bun dev
```

## Production Build

```bash
bun run build
```

## Start Production Server

```bash
bun start
```

---

# Environment Variables

Configure the required environment variables before running the application.

```env
NEXT_PUBLIC_STATUS=DEV
NEXT_PUBLIC_BACKENDURL=your_api_url
```

Additional environment variables may be required depending on the backend and storage configuration.

---

# Important Notes

- The project is written entirely in **TypeScript**.
- **Bun** is the primary JavaScript runtime.
- **Zustand** is used for global state management.
- **Axios** is used for API communication.
- **Tailwind CSS** is used for styling.
- **Motion** is used for animations.
- Images are stored using the project's **Supabase S3 bucket**.
- SSR pages may require a Vercel redeployment to reflect urgent database changes.
- Deleted blogs and events **cannot be restored**.

---

## `MADE BY SHREE BAVACHIKAR`

> Hey, stranger. Keep going. You're doing better than you think.

[Found something interesting? Say hello on LinkedIn](https://www.linkedin.com/in/shree-bavachikar-a16493375/)

[Want to see what else I've been building?](https://github.com/ssb-shree?tab=repositories)

---