import type { FieldErrors } from "./schema";

/** What every admin Server Action returns to its form. */
export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: FieldErrors };

export function failure(message: string, errors?: FieldErrors): ActionResult {
  return { ok: false, message, errors };
}

export function countErrors(errors: FieldErrors) {
  const count = Object.keys(errors).length;
  return count === 1
    ? "1 field needs attention."
    : `${count} fields need attention.`;
}
