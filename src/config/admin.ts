// Owner-only admin access. Add owner emails here; once the Supabase data
// migration lands this becomes a proper `role = admin` check via RLS.
export const ADMIN_EMAILS = ['keitdmitrijev95@gmail.com', 'marcus@gmail.com'];

export function isAdmin(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
