import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LegacyView from '../components/LegacyView';
import { renderProviderHTML } from '../legacy/render';
import { CATS } from '../data/categories';

export default function Provider() {
  const { cat = 'massage', idx = '0' } = useParams();
  const html = useMemo(() => renderProviderHTML(cat, parseInt(idx)), [cat, idx]);
  const back = CATS[cat]
    ? { label: '← Back to results', to: `/category/${cat}` }
    : { label: '← Back to discover', to: '/' };
  return <LegacyView html={html} back={back} />;
}
