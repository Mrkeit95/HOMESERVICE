// Audience filtering for the category grid.
// badge: 'e' = everyone/unisex, 'f' = women, 'm' = men.
import type { AudienceBadge, HomeCategoryGroup } from '../config/homeCategories';

export type AudienceFilter = 'all' | 'her' | 'him' | 'women' | 'men' | 'everyone';

export function matchesAudience(badge: AudienceBadge, filter: AudienceFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'her':
      return badge === 'f' || badge === 'e';
    case 'him':
      return badge === 'm' || badge === 'e';
    case 'women':
      return badge === 'f';
    case 'men':
      return badge === 'm';
    case 'everyone':
      return badge === 'e';
  }
}

// Filter each group's items by audience, dropping any group left empty.
export function filterGroups(
  groups: HomeCategoryGroup[],
  filter: AudienceFilter,
): HomeCategoryGroup[] {
  return groups
    .map((g) => ({ ...g, items: g.items.filter((i) => matchesAudience(i.badge, filter)) }))
    .filter((g) => g.items.length > 0);
}

export function countCategories(groups: HomeCategoryGroup[], filter: AudienceFilter): number {
  return filterGroups(groups, filter).reduce((n, g) => n + g.items.length, 0);
}
