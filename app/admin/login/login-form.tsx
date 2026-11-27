"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { login, type LoginState } from "../actions";
import { buttonClass, inputClass } from "../_components/ui";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "password-error" : undefined}
          className={inputClass}
        />
        {state.error && (
          <p id="password-error" role="alert" className="text-sm text-red-800">
            {state.error}
          </p>
        )}
      </div>
      <button disabled={pending} className={buttonClass("primary", "w-full")}>
        {pending && (
          <LoaderCircle
            className="size-4 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        )}
        Sign in
      </button>
    </form>
  );
}
