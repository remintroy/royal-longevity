import Link from "next/link";
import { isAdmin } from "@/lib/cms/auth";
import { landingSections } from "@/lib/cms/sections";
import { login, logout } from "./actions";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <form
        action={login}
        className="mx-auto mt-24 grid max-w-sm gap-4 rounded-3xl border border-border bg-white p-6"
      >
        <h1 className="text-xl">Content admin</h1>
        {!process.env.ADMIN_PASSWORD && (
          <p role="alert" className="text-sm text-red-700">
            ADMIN_PASSWORD is not configured on the server.
          </p>
        )}
        <label className="grid gap-2 text-sm">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="min-h-11 rounded-full border border-border px-4"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            Incorrect password.
          </p>
        )}
        <button className="min-h-11 rounded-full bg-espresso px-6 text-ivory">
          Sign in
        </button>
      </form>
    );
  }

  return (
    <>
      <header className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl">Landing page content</h1>
        <form action={logout}>
          <button className="min-h-11 rounded-full border border-border px-5 text-sm">
            Sign out
          </button>
        </form>
      </header>
      <p className="mb-6 text-sm text-espresso/70">
        Choose a section to edit every line of text in English and Arabic.
      </p>
      <Link
        href="/admin/catalogue"
        className="mb-3 block rounded-2xl border border-espresso bg-white p-5 hover:bg-white/60"
      >
        Services & categories — add new ones
      </Link>
      <ul className="grid gap-3 sm:grid-cols-2">
        {Object.entries(landingSections).map(([id, section]) => (
          <li key={id}>
            <Link
              href={`/admin/${id}`}
              className="block rounded-2xl border border-border bg-white p-5 hover:bg-white/60"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
