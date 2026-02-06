import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import { Link, Outlet, useLocation } from 'react-router-dom';
import arrowLeft from '/icons/arrowLeft.svg?url';
import { useBlur } from './useBlur';

import styles from './index.module.css';

const options = [
  {
    label: 'Account',
    to: 'account',
  },
  {
    label: 'Verify',
    to: 'verify',
  },
  {
    label: 'Security',
    to: 'security',
  },
  {
    label: 'Notifications',
    to: 'notifications',
  },
  // {
  //   label: 'Sessions',
  //   to: 'sessions',
  // },
];

const SettingsLayout = () => {
  const { containerRef, showLeftBlur, showRightBlur } = useBlur();
  const { pathname } = useLocation();

  return (
    <div className="pb-[72px] md:pb-28 xl:pb-16 pt-[75px] md:pt-0 min-h-screen md:min-h-fit">
      <div className="flex gap-2 items-center mb-5 px-4 xl:mt-5">
        <Link
          to="/"
          className="bg-base-800 flex justify-center items-center rounded-lg w-8 h-8"
        >
          <Icon
            id="arrowLeftIcon"
            href={arrowLeft}
            className="w-4 h-4 fill-current body-txtColor-1"
          />
        </Link>
        <div className="bg-base-800 rounded-lg h-8 px-4 flex items-center w-fit text-sm font-medium text-primary-2 capitalize">
          Settings
        </div>
      </div>
      <div className="px-4 xl:px-5">
        <div className="xl:bg-base-800 xl:rounded-xl xl:p-5 xl:min-h-[666px]">
          <div className="relative overflow-hidden">
            <div
              className={cn(
                'absolute left-0 top-0 sm:hidden bottom-0 w-[71px] rotate-180 transition-opacity pointer-events-none',
                styles['bg-gradient'],
                {
                  'opacity-0': !showLeftBlur,
                  'opacity-100': showLeftBlur,
                },
              )}
            />
            <div
              ref={containerRef}
              className="flex items-center gap-2 mb-5 md:mb-8 xl:mb-5 overflow-x-scroll no-scrollbar"
            >
              {options.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'bg-base-750 min-w-[87px] flex-shrink-0 xl:w-[148px] px-[18.5px] rounded-xl h-10 text-xs leading-4 flex items-center justify-center',
                    {
                      'border border-primary-2 font-medium text-primary-2':
                        pathname.includes(to),
                    },
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div
              className={cn(
                'absolute -right-1.5 top-0 sm:hidden bottom-0 w-[71px] transition-opacity pointer-events-none',
                styles['bg-gradient'],
                {
                  'opacity-0': !showRightBlur,
                  'opacity-100': showRightBlur,
                },
              )}
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
