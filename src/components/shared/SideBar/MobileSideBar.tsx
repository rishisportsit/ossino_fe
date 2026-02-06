import { useLocation } from 'react-router-dom';
import { selectCategories } from 'store/categories/selectors';
import { useAppSelector } from 'store/index';
import { selectSiteMode } from 'store/siteMode/selectors';

import TopMenuList from './TopMenuList';
import CategoriesMenuList from './CategoriesMenuList';
import TopLeaguesSidebarList from './TopLeaguesSidebarList';
import SportsCountriesLeaguesAccordion from '../MenuItem/SportsCountriesLeaguesAccordion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import ActionsBlock from 'components/shared/Actions/ActionsBlock';
import arrowRight from '/icons/arrowRight.svg?url';
import { cn } from 'helpers/ui';

interface MobileSideBarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  showActions?: boolean;
  // children: ReactNode;
  className?: string;
}

const MobileSideBar = ({
  isOpen,
  onOpenChange,
  showActions,
  // children,
  className,
}: MobileSideBarProps) => {
  const mode = useAppSelector(selectSiteMode);
  const location = useLocation();
  const categories = useAppSelector(selectCategories);
  return (
    <Sheet open={isOpen} onOpenChange={() => onOpenChange(false)}>
      <SheetContent
        side="right"
        className={cn(
          'w-[250px] p-0 bg-base-800 flex flex-col gap-8 z-[120]',
          className,
        )}
        overlayClassName="z-[110]"
      >
        <SheetTitle className="flex justify-between pt-5 px-5">
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            className="border-base-700 rounded-lg border body-txtColor-1 bg-transparent w-8 h-8 p-0 flex items-center justify-center"
          >
            <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
          </Button>
          {showActions && (
            <ActionsBlock toggleSideBar={() => onOpenChange(false)} />
          )}
        </SheetTitle>
        <SheetDescription hidden />
        <nav className="w-full flex-1 overflow-auto p-5 pt-0">
          <TopMenuList isOpen onClick={() => onOpenChange(false)} />
          {categories && categories.length > 0 && location.pathname === '/' && (
            <h2 className="body-txtColor-1 text-base font-bold pt-6 pb-4">Categories</h2>
          )}
          <CategoriesMenuList isOpen onClick={() => onOpenChange(false)} />
          {mode === 'sports' && (
            <>
              <TopLeaguesSidebarList isOpen onClick={() => onOpenChange(false)} />
              <SportsCountriesLeaguesAccordion isOpen onClick={() => onOpenChange(false)} />
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
