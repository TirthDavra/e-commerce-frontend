"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { register as registerAccount } from "@/api/auth/auth.api";
import type { RegisterInput } from "@/api/auth/types";
import { registerFormSchema } from "@/api/auth/schemas";
import { getApiErrorMessage } from "@/lib/api-error";
import { toast } from "sonner";


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [rootError, setRootError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    } as RegisterInput,
  });

  async function onSubmit(values: RegisterInput) {
    setRootError(null);
    try {
      const response = await registerAccount(values);
      toast.success(response.message);
      router.push("/login?registered=1");
    } catch (err) {
      setRootError(
        getApiErrorMessage(err, "Could not create your account. Try again.")
      );
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {rootError ? (
              <Field>
                <FieldError>{rootError}</FieldError>
              </Field>
            ) : null}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.email]} />
            </Field>
            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!form.formState.errors.password}
                {...form.register("password")}
              />
              <FieldDescription>
                At least 6 characters (same rules as the server).
              </FieldDescription>
              <FieldError errors={[form.formState.errors.password]} />
            </Field>
            <Field>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating account…" : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
