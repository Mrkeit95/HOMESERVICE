// Tracks whether a provider account has completed legal/KYC onboarding.
const key = (email: string) => `doora.onboarded.${email.toLowerCase()}`;

export function isOnboarded(email: string): boolean {
  try {
    return localStorage.getItem(key(email)) === '1';
  } catch {
    return false;
  }
}

export function markOnboarded(email: string) {
  try {
    localStorage.setItem(key(email), '1');
  } catch {
    /* ignore */
  }
}
