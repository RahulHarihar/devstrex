# DevStrex 🔥

> Create any dev challenge. Log your progress daily. Share your streak publicly.

[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)

**Live Demo** → [devstrex.vercel.app](https://devstrex.vercel.app)

---

## What is DevStrex?

DevStrex is a full stack MERN application for developers who run structured
learning challenges.

Create a challenge, define your daily tasks, log your progress every day, and
share your public profile with one link — no login required to view it.

Built during a 30-day MERN challenge. Used to track the same 30-day challenge
while building it.

---

## Features

- **Create Challenges** — define a title, description, total days, and daily
  tasks
- **Daily Logging** — log each day with a note and completion status
- **Streak Tracking** — automatically calculates your current streak
- **Progress Heatmap** — visual map of every completed day
- **Public Profiles** — shareable `/username` page, no login needed to view
- **JWT Authentication** — secure signup and login
- **Protected Routes** — dashboard and challenge pages require authentication
- **Fully Typed** — TypeScript across the entire stack

---

## Tech Stack

### Backend

| Technology   | Purpose               |
| ------------ | --------------------- |
| Node.js      | Runtime               |
| Express      | REST API framework    |
| TypeScript   | Type safety           |
| MongoDB      | Database              |
| Mongoose     | ODM                   |
| bcrypt       | Password hashing      |
| jsonwebtoken | JWT authentication    |
| dotenv       | Environment variables |
| cors         | Cross-origin requests |

### Frontend

| Technology        | Purpose             |
| ----------------- | ------------------- |
| React 18          | UI framework        |
| Vite              | Build tool          |
| TypeScript        | Type safety         |
| Tailwind v4       | Styling             |
| shadcn/ui + Radix | Component library   |
| Framer Motion     | Animations          |
| React Router v6   | Client-side routing |
| Lucide React      | Icons               |
| Vercel Analytics  | Usage tracking      |

### Deployment

| Service       | Purpose          |
| ------------- | ---------------- |
| Render        | Backend hosting  |
| Vercel        | Frontend hosting |
| MongoDB Atlas | Database hosting |

---

## Project Structure

```
devstrex/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── db.ts
│   │   ├── seed.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Challenge.ts
│   │   │   └── Log.ts
│   │   └── routes/
│   │       ├── authRoutes.ts
│   │       ├── challengeRoutes.ts
│   │       ├── logRoutes.ts
│   │       └── publicRoutes.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   ├── index.css
    │   ├── lib/
    │   │   └── utils.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   │   └── challengeService.ts
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── Spinner.tsx
    │   │   │   └── Badge.tsx
    │   │   ├── layout/
    │   │   │   └── Navbar.tsx
    │   │   ├── ChallengeCard.tsx
    │   │   └── HeatMap.tsx
    │   └── pages/
    │       ├── AuthPage.tsx
    │       ├── DashboardPage.tsx
    │       ├── NewChallengePage.tsx
    │       ├── ChallengePage.tsx
    │       └── PublicProfilePage.tsx
    ├── index.html
    ├── vercel.json
    ├── vite.config.ts
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/devstrex.git
cd devstrex
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devstrex-db
JWT_SECRET=your_super_secret_key
PORT=3000
```

Start the development server:

```bash
npm run dev
```

Seed the database with dummy data:

```bash
npm run seed
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` Backend runs on `http://localhost:3000`

---

## API Reference

### Auth Routes

| Method | Endpoint       | Description           | Auth |
| ------ | -------------- | --------------------- | ---- |
| POST   | `/auth/signup` | Register a new user   | No   |
| POST   | `/auth/login`  | Login and receive JWT | No   |

### Challenge Routes

| Method | Endpoint          | Description                     | Auth |
| ------ | ----------------- | ------------------------------- | ---- |
| GET    | `/challenges`     | Get all user challenges         | Yes  |
| GET    | `/challenges/:id` | Get one challenge with logs     | Yes  |
| POST   | `/challenges`     | Create a new challenge          | Yes  |
| PUT    | `/challenges/:id` | Update a challenge              | Yes  |
| DELETE | `/challenges/:id` | Delete a challenge and its logs | Yes  |

### Log Routes

| Method | Endpoint             | Description                  | Auth |
| ------ | -------------------- | ---------------------------- | ---- |
| GET    | `/logs/:challengeId` | Get all logs for a challenge | Yes  |
| POST   | `/logs`              | Log a day                    | Yes  |
| PUT    | `/logs/:id`          | Update a log                 | Yes  |

### Public Routes

| Method | Endpoint            | Description                                 | Auth |
| ------ | ------------------- | ------------------------------------------- | ---- |
| GET    | `/public/:username` | Get public profile with challenges and logs | No   |

---

## Data Models

### User

```typescript
{
	email: string; // unique, required
	username: string; // unique, required, 3-20 chars
	password: string; // hashed with bcrypt
	createdAt: Date;
	updatedAt: Date;
}
```

### Challenge

```typescript
{
  userId: ObjectId     // ref: User
  title: string        // required, max 100 chars
  description: string  // max 500 chars
  totalDays: number    // 1-365
  startDate: Date
  tasks: [{
    day: number
    title: string
  }]
  isPublic: boolean    // default: true
  createdAt: Date
  updatedAt: Date
}
```

### Log

```typescript
{
	userId: ObjectId; // ref: User
	challengeId: ObjectId; // ref: Challenge
	day: number; // unique per challenge
	note: string; // max 1000 chars
	completed: boolean; // default: true
	createdAt: Date;
	updatedAt: Date;
}
```

---

## Deployment

### Backend on Render

```
Build Command: npm install && npm run build
Start Command: node dist/server.js
```

Environment variables:

```
MONGO_URI
JWT_SECRET
PORT
```

### Frontend on Vercel

```
Build Command:    npm run build
Output Directory: dist
```

Environment variables:

```
VITE_API_URL → your Render backend URL
```

The `vercel.json` rewrite rule handles client-side routing:

```json
{
	"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Demo Credentials

```
Email:    alex@devstrex.io
Password: password123
```

Public profile: `devstrex.vercel.app/alex`

---

## Environment Variables

### Backend `.env.example`

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devstrex-db
JWT_SECRET=your_super_secret_key
PORT=3000
```

### Frontend `.env.example`

```env
VITE_API_URL=http://localhost:3000
```

---

## Scripts

### Backend

```bash
npm run dev    # Start development server
npm run build  # Compile TypeScript to dist/
npm run start  # Run compiled server
npm run seed   # Seed database with dummy data
```

### Frontend

```bash
npm run dev     # Start Vite development server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## What I Learned Building This

- Never pass `req.body` directly to `findByIdAndUpdate` — destructure only
  allowed fields
- TypeScript strict mode catches bugs before runtime — always enable it
- Seed your database before building UI — empty state is painful to develop
  against
- Get the data model right before writing routes — changing schemas mid-build is
  expensive
- Vercel needs a `vercel.json` rewrite rule for React Router — SPAs need it
- Environment variables are baked in at Vite build time — always redeploy after
  adding them
- `import * as jwt from "jsonwebtoken"` — CommonJS modules have no default
  export in strict TS

---

## Built During

This project was built during a **30-Day MERN Challenge** — one day at a time,
documented publicly on Twitter.

The meta story: DevStrex was used to track the same challenge it was built
during.

---

## License

This project is currently source-available but not open source.

Source code is publicly visible for portfolio and educational purposes only.
Rebranding, redistribution, reselling, and derivative products are strictly
prohibited.

Open source release planned for a future date.

See [LICENSE](LICENSE) for full details.

---

## Author

Built with 🔥 by [Rahul Harihar](https://twitter.com/iamRahul_H)

---

_If DevStrex helped you — give it a ⭐ on GitHub_
