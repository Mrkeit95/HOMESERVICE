import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Returns a handler that goes to the *actual* previous page (browser history),
// not a hard-coded destination. Falls back to Discover only when there's no
// in-app history to return to (e.g. the user opened a deep link directly).
export function useGoBack(fallback = '/') {
  const navigate = useNavigate();
  return useCallback(() => {
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback);
  }, [navigate, fallback]);
}
