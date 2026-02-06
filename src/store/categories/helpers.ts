import type { ApiGameItem } from 'api/content/content.types';
import type { AxiosResponse } from 'axios';
import type { MenuItem } from 'components/shared/MenuItem/menuItems';

import iconSource from '/sprite-other-icons.svg?url';

export const handleResponse = (response: AxiosResponse<ApiGameItem[]>, selectedGameType?: string) => {
  const { data } = response;

  const shouldFilterByGameType = selectedGameType && 
    !['providers', 'favourites', 'discovery'].includes(selectedGameType.toLowerCase());
    
  const filteredGameItems = shouldFilterByGameType
    ? data.filter(gameItem => gameItem.game_type === selectedGameType)
    : data;

  const categoryMap = new Map<string, { icon: string; count: number; providerCounts: Record<string, number> }>();

  filteredGameItems.forEach(gameItem => {
    gameItem.game.forEach(game => {
      const categoryName = game.categoryname;
      const provider = game.provider;
      if (categoryName && categoryName !== 'null' && categoryName !== null) {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, {
            icon: game.categoryicon || 'cat32',
            count: 0,
            providerCounts: {},
          });
        }
        const entry = categoryMap.get(categoryName)!;
        entry.count += 1;
        if (provider) {
          entry.providerCounts[provider] = (entry.providerCounts[provider] || 0) + 1;
        }
      }
    });
  });

  const menuItems: MenuItem[] = Array.from(categoryMap.entries()).map(([categoryName, { icon, count, providerCounts }]) => ({
    id: categoryName.toLowerCase().replace(/\s+/g, '-'),
    icon: {
      id: icon,
      href: iconSource,
    },
    label: categoryName,
    count,
    providerCounts,
    protected: false,
    href: `/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return menuItems;
};
