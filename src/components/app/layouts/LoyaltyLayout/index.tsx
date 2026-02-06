import { Link, Outlet, useLocation } from 'react-router-dom';

import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';
import { cn } from 'helpers/ui';
import { useEffect } from 'react';
import { getCoinsOverview } from 'store/coinsOverview/slice';
import { useAppDispatch } from 'store/index';

const options = [
  {
    label: 'Rewards',
    to: 'rewards',
  },
  {
    label: 'Coins',
    to: 'coins',
  },
  {
    label: 'Overview',
    to: 'overview',
  },
];

const LoyaltyLayout = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getCoinsOverview());
  }, [dispatch]);

  return (
    <div className="pb-[72px] md:pb-28 xl:pb-16 pt-[75px] md:pt-0">
      <PageHeader to="/" className="hidden xl:flex pt-5 mx-5">
        <PageHeaderBalance />
      </PageHeader>
      <div className="px-4 pt-5 xl:px-5 mb-4 xl:mb-5">
        <div className="flex border-b border-b-base-600">
          {options.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={cn(
                'font-medium py-0.5 flex-1 md:flex-none md:w-40 text-center relative',
                {
                  'after:block after:absolute after:right-0 after:left-0 after:-bottom-[1px] after:h-[1px] after:bg-primary-2 text-special-2':
                    pathname.includes(to),
                },
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LoyaltyLayout;
