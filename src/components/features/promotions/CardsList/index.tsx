import { useDialog } from 'helpers/hooks';
import { useEffect, useMemo } from 'react';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectPromotionsData } from 'store/promotions/selectors';
import { getPromotions } from 'store/promotions/slice';
import type { CmsPromotionResponse } from 'api/content/content.types';

type CardListProps = {
  category?: string;
  type?: CmsPromotionResponse['promotionType'];
};

const CardList = ({ category, type }: CardListProps) => {
  const allPromotions = useAppSelector(selectPromotionsData());
  // For each category tab, show all promos that include that category
  const cards = useMemo(() => {
    if (!allPromotions || !category) return [];
    return allPromotions.filter((promo) => {
      if (!promo.categories) return false;
      return promo.categories
        .split(',')
        .map((cat) => cat.trim().toLowerCase())
        .includes(category.trim().toLowerCase());
    });
  }, [allPromotions, category]);
  const dispatch = useAppDispatch();

  // Dynamically extract unique categories from all promotions
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

  const { openDialog } = useDialog();

  const handleClick = (promotion: CmsPromotionResponse) => {
    openDialog(DIALOG_TYPE.promotion, {
      cmsData: promotion,
    });
  };

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  if (!cards) return null;

  return (
    <>
      {/* Example: Render category tabs dynamically if needed */}
      {/* <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button key={cat}>{cat}</button>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:rounded-xl xl:grid-cols-3 gap-3 xl:gap-y-2.5 xl:bg-base-800 xl:p-5 xl:pb-8">
        {cards.map((card) => (
          <div
            key={card.offer_id}
            className="bg-base-800 rounded-xl xl:border xl:border-base-700 cursor-pointer hover:bg-base-750 transition-colors"
            onClick={() => handleClick(card)}
          >
            <div dangerouslySetInnerHTML={{ __html: card.offerimage }} />
            <div className="p-4">
              <h3 className="text-sm font-medium body-txtColor-1 mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-base-400">
                {card.categories
                  ?.split(',')
                  .map((cat) => cat.trim())
                  .join(' • ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardList;
