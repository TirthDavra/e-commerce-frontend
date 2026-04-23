import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="h-[22rem] animate-pulse rounded-xl border bg-muted/40" />
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
