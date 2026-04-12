"use client";

import { useActionState } from "react";

import { loginCustomer, type LoginFormState } from "@/app/actions/auth";
import Link from "next/link";

const initialState: LoginFormState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginCustomer,
    initialState,
  );

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-zinc-600">
        Use the email and password for your store account (classic customer
        accounts).
      </p>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        {state.error ? (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {state.error}
          </p>
        ) : null}

        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-lg border border-zinc-300 px-3 py-2 text-base font-normal text-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-800">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-lg border border-zinc-300 px-3 py-2 text-base font-normal text-zinc-900"
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-600">
        <Link href="/" className="font-medium text-zinc-900 underline">
          Continue shopping
        </Link>
      </p>
    </div>
  );
}
