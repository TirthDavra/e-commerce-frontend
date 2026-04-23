import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin Portal</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Secure admin authentication
            </h1>
            <p className="text-base leading-7 text-slate-600">
              Sign in to manage users and view the admin dashboard. This frontend keeps only auth and admin functionality.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
