# Job Platform Frontend

A modern React frontend for a job platform application, built with Next.js 16, React 19, and TypeScript.

## Features

- User authentication and role-based dashboards
- Job browsing and application for candidates
- Job posting and management for recruiters
- Admin dashboard for platform management
- Responsive design with shadcn/ui components
- Real-time form validation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript
- **State Management**: Zustand with persistence
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Tables**: TanStack Table
- **Validation**: Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Backend server running (see backend README)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd job-platform/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables** (optional):
   If deploying or using a different backend URL, create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```
   Note: The app uses proxy configuration for API calls in development.

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

| Variable                  | Description                          | Default |
|---------------------------|--------------------------------------|---------|
| `NEXT_PUBLIC_API_BASE_URL`| Backend API base URL                 | http://localhost:5000 |

## Architectural Decisions

- **Next.js App Router**: Chosen for its modern routing, server components, and built-in optimizations. Trade-off: Steeper learning curve but provides better performance and SEO capabilities.

- **React 19**: Latest React version for improved performance and new features. Trade-off: Potential compatibility issues with older libraries, but future-proof.

- **Zustand for State Management**: Lightweight alternative to Redux with built-in persistence. Trade-off: Less opinionated than Redux, but simpler for small to medium applications.

- **shadcn/ui Components**: Headless UI components with Tailwind CSS for consistent design. Trade-off: Requires Tailwind setup but provides high customizability.

- **Zod Validation**: Runtime type validation for forms and API responses. Trade-off: Adds bundle size but ensures type safety at runtime.

- **Client-Side Routing with Guards**: Role-based route protection using React components. Trade-off: Initial page load may show loading state, but provides smooth navigation.

- **Proxy Configuration**: API calls proxied through Next.js for development simplicity. Trade-off: Development-only setup, production requires proper CORS configuration.

## Bonus Features

- **Input Validation with Zod**: Comprehensive form validation using Zod schemas, providing real-time feedback and type safety.

## Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   ├── admin/
│   ├── candidate/
│   ├── recruiter/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── ...
├── hooks/
├── lib/
├── store/
├── public/
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

- **RolePanel**: Auth guard component that redirects based on user role
- **RoleDashboardShell**: Layout component with sidebar navigation
- **Auth Store**: Zustand store for authentication state
- **API Layer**: Centralized API functions for backend communication

## Deployment

The app can be deployed to Vercel, Netlify, or any platform supporting Next.js. Ensure the backend API is accessible and update environment variables accordingly.
