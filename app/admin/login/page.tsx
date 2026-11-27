import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/ui/brand-logo";
import { isAdmin, isAuthConfigured } from "@/lib/cms/auth";
import { Notice, panelClass } from "../_components/ui";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in · Content admin" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="grid min-h-svh place-items-center px-4 py-10">
      <div className={`${panelClass} grid w-full max-w-sm gap-6 p-6 sm:p-8`}>
        <div className="grid justify-items-center gap-3 text-center">
          <BrandLogo lang="en" />
          <div className="grid gap-1">
            <h1 className="text-xl text-ink">Content admin</h1>
            <p className="text-sm text-espresso/65">
              Sign in to manage the website content.
            </p>
          </div>
        </div>
        {isAuthConfigured() ? (
          <LoginForm />
        ) : (
          <Notice tone="error">
            Sign-in is disabled because ADMIN_PASSWORD is not set on the server.
          </Notice>
        )}
      </div>
    </main>
  );
}
