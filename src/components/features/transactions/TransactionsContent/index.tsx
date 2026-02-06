import { Button } from "components/shared/ui/Button";
import { useTransactionTableQueryParams } from "helpers/transactions/hooks/useTransactionTableQueryParams";
import { cn } from "helpers/ui";
import { useEffect, useRef, useState } from "react";
import type { Category } from "store/transactions/types";
import { CATEGORY } from "store/transactions/constants";
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from '../../../../helpers/hooks';
import DepositTable from "../tables/DepositTable";
import SportsBetsTable from "../tables/SportsBetsTable";
import TipsTable from "../tables/TipsTable";
import WithdrawTable from "../tables/WithdrawTable";

import styles from './transactionsContent.module.css';
import CasinoBetsTable from "../tables/CasinoBetsTable";

const TransactionsContent = () => {
  const { getCategoryParam, updateCategoryParam } = useTransactionTableQueryParams();
  const [category, setCategory] = useState<Category>(getCategoryParam() as Category || CATEGORY.Deposit);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { screenWidth } = useBreakpoint();
  const { showBefore, showAfter } = useScrollShadows(containerRef);
  const isMobileView = screenWidth < BREAKPOINTS.md;

  useEffect(() => {
    const currentCategory = getCategoryParam();
    if (currentCategory && currentCategory !== category) {
      setCategory(currentCategory as Category);
    }
  }, [getCategoryParam, category]);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    updateCategoryParam(newCategory);
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current && isMobileView) {
      const scrollAmount = 71;
      containerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="p-0 xl:p-5 rounded-xl xl:bg-base-800 xl:rounded-xl">
      <div className="shadow-wrapper relative">
        <div
          className={cn(styles.buttons_wrapper, 'no-scrollbar overflow-x-auto', {
            [styles.show_before]: showBefore,
            [styles.show_after]: showAfter
          })}
          ref={containerRef}
        >
          <div className="category-buttons flex flex-row md:w-auto gap-2 mb-[10px]">
            <Button
              className={cn(
                'md:w-auto xl:w-[148px] px-4 py-3 h-10 font-normal rounded-xl bg-base-750 body-txtColor-1 text-xs border border-transparent',
                { 'border-special-2 text-special-2': category === CATEGORY.Deposit }
              )}
              variant='outline'
              onClick={() => {
                handleCategoryChange(CATEGORY.Deposit);
                handleScroll('left');
              }}
            >
              Deposit
            </Button>
            <Button
              className={cn('md:w-auto xl:w-[148px] px-4 py-3 h-10 font-normal rounded-xl bg-base-750 body-txtColor-1 text-xs border border-transparent', { 'border-special-2 text-special-2': category === CATEGORY.Withdraw })}
              variant='outline'
              onClick={() => { handleCategoryChange(CATEGORY.Withdraw) }}
            >
              Withdraw
            </Button>
            <Button
              className={cn('md:w-auto xl:w-[148px] px-4 py-3 h-10 font-normal rounded-xl bg-base-750 body-txtColor-1 text-xs border border-transparent', { 'border-special-2 text-special-2': category === CATEGORY.SportsBets })}
              variant='outline'
              onClick={() => handleCategoryChange(CATEGORY.SportsBets)}
            >
              Sports Bets
            </Button>
            <Button
              className={cn('md:w-auto xl:w-[148px] px-4 py-3 h-10 font-normal rounded-xl bg-base-750 body-txtColor-1 text-xs border border-transparent', { 'border-special-2 text-special-2': category === CATEGORY.CasinoBets })}
              variant='outline'
              onClick={() => handleCategoryChange(CATEGORY.CasinoBets)}
            >
              Casino Bets
            </Button>
            <Button
              className={cn('md:w-auto xl:w-[148px] px-4 py-3 h-10 font-normal rounded-xl bg-base-750 body-txtColor-1 text-xs border border-transparent', { 'border-special-2 text-special-2': category === CATEGORY.Tips })}
              variant='outline'
              onClick={() => {
                handleCategoryChange(CATEGORY.Tips);
                handleScroll('right');
              }}
            >
              Tips
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col">
        {category === CATEGORY.Deposit ? (<DepositTable />) : null}
        {category === CATEGORY.Withdraw ? (<WithdrawTable />) : null}
        {category === CATEGORY.SportsBets ? (<SportsBetsTable />) : null}
        {category === CATEGORY.CasinoBets ? (<CasinoBetsTable />) : null}
        {category === CATEGORY.Tips ? (<TipsTable />) : <div />}
      </div>
    </div>
  );
};

export default TransactionsContent;
