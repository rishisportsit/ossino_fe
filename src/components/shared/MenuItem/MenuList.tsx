import type { MenuItem as MenuItemType } from 'components/shared/MenuItem/menuItems';
import MenuItem from 'components/shared/MenuItem/index';
import { cn } from 'helpers/ui';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { selectGameCountMap } from 'store/games/selectors';

interface IMenuList {
  isOpen?: boolean;
  list: MenuItemType[];
  onClick?: (itemId: number | string, label?: string, href?: string, menu_type_name?: string) => void;
  withBorder?: boolean;
}

const MenuList = ({ list, isOpen, onClick, withBorder }: IMenuList) => {
  const { pathname } = useLocation();
  const categoryCountMap = useAppSelector(selectGameCountMap);

  const handleClick = (item: MenuItemType) => {
    if (onClick) {
      onClick(item.id, item.label, item.href, item.menu_type_name);
    }
  };

  return (
    <ul className={cn('flex flex-col gap-2 items-center')}>
      {list.map((item: MenuItemType) => {
        const selected = () => {
          const href = item.href as string | undefined;
          if (!href) return false;

          if (href === '/' || href === '/sports') {
            return pathname === href;
          }
          const decodedPathname = decodeURIComponent(pathname);
          return decodedPathname.includes(item.href as string);

        };

        const count = categoryCountMap[item.label as string] || 0;

        return (
          <li key={`${item.id}-${item.label}`} className="w-full">
            <MenuItem
              id={item.id}
              isOpen={isOpen}
              onClick={() => handleClick(item)}
              dialogId={item.dialogId}
              label={item.label}
              selected={selected()}
              icon={item.icon}
              count={withBorder ? item.count || count : undefined}
              background={!!item.count}
              href={item.href}
              withBorder={withBorder}
              hideIconWhenExpanded={item.hideIconWhenExpanded}
              data={item.data}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;