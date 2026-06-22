// Promo/ad "to" targets are usually routes, but some are in-app actions
// (prefixed with '#'). This routes them: '#invite' opens the referral modal,
// anything else navigates normally.
export function runAdTarget(to: string, navigate: (path: string) => void) {
  if (to === '#invite') {
    window.dispatchEvent(new CustomEvent('doora:invite'));
    return;
  }
  navigate(to);
}
