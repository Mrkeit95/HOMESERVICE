import { useMemo } from 'react';
import LegacyView from '../components/LegacyView';
import { renderMessagesHTML } from '../legacy/render';
import { THREADS } from '../data/threads';

export default function Messages() {
  // Rendered once on mount; thread switching + sending are handled imperatively
  // by the wiring layer (which mutates THREADS and re-renders the chat area).
  const html = useMemo(() => renderMessagesHTML(THREADS[0]?.id), []);
  return <LegacyView html={html} />;
}
