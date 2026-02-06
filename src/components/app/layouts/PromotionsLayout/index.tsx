import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from 'components/shared/PageHeader';
import { cn } from 'helpers/ui';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from 'store/index';
import { selectPromotionsData } from 'store/promotions/selectors';

const PromotionsLayout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');

  // Get all promotions and extract unique categories
  const allPromotions = useAppSelector(selectPromotionsData());
  const categories = useMemo(() => {
    if (!allPromotions) return [];
    const set = new Set<string>();
    allPromotions.forEach((promo) => {
      if (promo.categories) {
        promo.categories.split(',').forEach((cat) => set.add(cat.trim()));
      }
    });
    return Array.from(set);
  }, [allPromotions]);

  // Only use backend categories for tabs
  const tabOptions = useMemo(
    () => categories.map((cat) => ({ label: cat, key: cat })),
    [categories],
  );

  useEffect(() => {
    if (!type && tabOptions.length > 0) {
      navigate(`?type=${tabOptions[0].key}`, { replace: true });
    }
  }, [type, navigate, tabOptions]);

  return (
    <div className="pt-[75px] md:pt-0">
      <PageHeader to="/" className="pt-5 px-4 mb-0" />
      <div className="px-4 pt-5 xl:px-5 mb-4 xl:mb-5">
        <div className="flex border-b border-b-base-600">
          {tabOptions.map(({ label, key }) => (
            <Link
              key={label}
              to={`?type=${key}`}
              className={cn(
                'font-medium py-0.5 flex-1 md:flex-none md:w-40 text-center relative',
                {
                  'after:block after:absolute after:right-0 after:left-0 after:-bottom-[1px] after:h-[1px] after:bg-primary-2 text-special-2':
                    type === key,
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

export default PromotionsLayout;
