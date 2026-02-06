import { useAppSelector } from 'store/index';
import { selectCategories } from 'store/categories/selectors';
import { useNavigate } from 'react-router-dom';
import ActionsBlock from 'components/shared/Actions/ActionsBlock';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import TopMenuList from './TopMenuList';
import arrowLeft from '/icons/arrowLeft.svg?url';
import arrowRight from '/icons/arrowRight.svg?url';
import mainLogo from '/icons/logo.svg?url';
import CategoriesMenuList from './CategoriesMenuList';
import { selectSiteMode } from 'store/siteMode/selectors';
import SportsCountriesLeaguesAccordion from '../MenuItem/SportsCountriesLeaguesAccordion';
import TopLeaguesSidebarList from './TopLeaguesSidebarList';
import { selectTopLeaguesData } from 'store/SportsHomePage/selectors';

interface ISideBarProps {
  toggleSidebar: (value: boolean) => void;
  isOpen: boolean;
}

const SideBar = ({ toggleSidebar, isOpen }: ISideBarProps) => {
  const categories = useAppSelector(selectCategories);
  const { screenWidth } = useBreakpoint();
  const xl = screenWidth >= BREAKPOINTS.xl;
  const navigate = useNavigate();
  const topLeaguesState = useAppSelector(selectTopLeaguesData);
  const topLeaguesLoading = topLeaguesState?.loading || false;
  const hasTopLeagues = topLeaguesState?.result && topLeaguesState.result.length > 0;

  const selectedHandler = () => {
    if (!xl) {
      toggleSidebar(false);
    }
  };
  const mode = useAppSelector(selectSiteMode);

  return (
    <div className="relative flex flex-col h-screen w-[250px] xl:w-[250px] md:w-[400px] z-[2000] side-bar-scroll">
      <div
        className={cn(
          'flex w-full items-center px-5 py-6',
          { 'justify-between xl:justify-start': isOpen },
        )}
      >
        <button
          type="button"
          onClick={() => navigate(mode === 'sports' ? '/sports' : '/')}
          className={cn(
            'h-[25px] w-[112px] hidden xl:block transition-margin duration-300 ease-in-out',
            { 'lg:mr-[66px]': isOpen },
            { 'xl:-ml-[112px]': !isOpen },
          )}
        >
          <Icon id="logoIcon" href={mainLogo} className="h-[25px] w-[112px] " />
        </button>
        <Button
          type="button"
          onClick={() => {
            toggleSidebar(!isOpen);
          }}
          className={cn(
            'border-base-700 rounded-lg border hidden body-txtColor-1 bg-transparent w-8 h-8 p-0 md:flex items-center justify-center',
            { 'lg:ml-1': !isOpen },
          )}
        >
          <Icon
            id={isOpen && xl ? 'arrowLeftIcon' : 'arrowRightIcon'}
            href={isOpen && xl ? arrowLeft : arrowRight}
            className="w-4 h-4 fill-current body-txtColor-1"
          />
        </Button>
        <div className="hidden md:block xl:hidden">
          <ActionsBlock toggleSideBar={selectedHandler} />
        </div>
      </div>

      <nav className="w-full flex-1 overflow-auto p-5 pt-0">
        <TopMenuList isOpen={isOpen} onClick={selectedHandler} />
        {((categories && categories.length > 0 && location.pathname === '/' && mode !== 'sports') ||
          (mode === 'sports' && (topLeaguesLoading || hasTopLeagues))) && (
            <div
              className={cn(
                'border-b border-base-600 mt-6 w-full transition-width duration-300',
                { 'xl:w-10': !isOpen },
              )}
            />
          )}
        {categories && categories.length > 0 && location.pathname === '/' && (
          <h2
            className={cn(
              'body-txtColor-1 text-base font-bold pt-6 pb-4 transition-color duration-300',
              { 'xl:text-transparent': !isOpen },
            )}
          >
            Categories
          </h2>
        )}
        <CategoriesMenuList isOpen={isOpen} onClick={selectedHandler} />
        {mode === 'sports' && (
          <>
            <TopLeaguesSidebarList isOpen={isOpen} onClick={selectedHandler} />
            <SportsCountriesLeaguesAccordion isOpen={isOpen} onClick={selectedHandler} />
            {/* Countries section (if still needed, can be moved below or removed) */}
            {/* <div
              className={cn(
                'border-b-2 border-base-700 mt-6 w-full transition-width duration-300',
                { 'xl:w-10': !isOpen },
              )}
            />
            <h2
              className={cn(
                'body-txtColor-1 text-base font-bold pt-6 pb-4 transition-color duration-300',
                { 'xl:text-transparent': !isOpen },
              )}
            >
              Countries
            </h2>
            <MenuList list={sportsCountriesItems} isOpen={isOpen} onClick={selectedHandler} withBorder /> */}
          </>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
