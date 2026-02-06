
export const CATEGORY_CODE = {
  TOP_GAMES: 'top-games',
  ORIGINALS: 'originals',
  SLOTS: 'slots',
  NEW_RELEASES: 'new-releases',
  CASINO: 'casino',
} as const;

export type CategoryCode = (typeof CATEGORY_CODE)[keyof typeof CATEGORY_CODE];

const API_ID_TO_CATEGORY_CODE: Record<string, CategoryCode> = {
  'Top Games': CATEGORY_CODE.TOP_GAMES,
  'top_games': CATEGORY_CODE.TOP_GAMES,
  'top-games': CATEGORY_CODE.TOP_GAMES,
  'Originals': CATEGORY_CODE.ORIGINALS,
  'originals': CATEGORY_CODE.ORIGINALS,
  'Slots': CATEGORY_CODE.SLOTS,
  'slots': CATEGORY_CODE.SLOTS,
  'New Releases': CATEGORY_CODE.NEW_RELEASES,
  'new_releases': CATEGORY_CODE.NEW_RELEASES,
  'new-releases': CATEGORY_CODE.NEW_RELEASES,
  'Casino': CATEGORY_CODE.CASINO,
  'casino': CATEGORY_CODE.CASINO,
} as const;

export const mapApiIdToCategoryCode = (apiId: string): CategoryCode | null => {
  return API_ID_TO_CATEGORY_CODE[apiId] || null;
};
export const SORT_METHOD = { asc: 'asc', desc: 'desc', mostPopular: 'most-popular', recentlyPlayed: 'recently-played', recentlyAdded: 'recently-added', random: 'random', } as const;