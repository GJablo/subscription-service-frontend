# SubTrack Client

A React frontend for the Subscription Server API — sign up, sign in, and track subscriptions (create, edit, cancel, delete) with renewal dates, pricing, and payment methods.

## Features

- JWT cookie-based authentication (sign up, sign in, sign out) with session restore on reload
- Subscription dashboard with create, edit, cancel, and delete flows
- Form validation with react-hook-form + zod
- Server state caching and mutations via TanStack Query
- Tailwind CSS v4 with light/dark theming and a small local UI kit (button, input, select, card, dialog, badge, toast)

## Tech Stack

- React 19 + Vite
- React Router
- TanStack Query
- react-hook-form + zod
- Axios
- Tailwind CSS v4

## Project Structure

```
client/
├── src/
│   ├── api/            # axios instance + one file per backend resource
│   ├── components/
│   │   ├── layout/      # navbar, app shell, protected route
│   │   └── ui/           # button, input, card, dialog, badge, spinner...
│   ├── context/          # AuthContext, ToastContext
│   ├── features/
│   │   ├── auth/          # zod schemas
│   │   └── subscriptions/ # zod schema, query hooks, form, card
│   ├── lib/              # cn() helper, shared constants (enums)
│   ├── pages/            # route-level components
│   ├── App.jsx            # route table
│   └── main.jsx            # provider tree (Router, QueryClient, Toast, Auth)
└── vite.config.js
```

## Prerequisites

- Node.js 18+
- The `server` app running (see [Subscription Tracker repo](https://github.com/GJablo/subscription-service)) — this client expects it at the URL in `VITE_API_BASE_URL`

## Installation

```bash
npm install
```

Environment files are already provided:

- `.env.development` → `VITE_API_BASE_URL=http://localhost:5500/api/v1`
- `.env.production` → `VITE_API_BASE_URL=/api/v1` (adjust if the API isn't served from the same origin)

## Running

```bash
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
```
