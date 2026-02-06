import CardList from 'components/features/promotions/CardsList';
import { useSearchParams } from 'react-router-dom';
import PromotionSheet from 'components/features/promotions/PromotionSheet';
import type { PromotionTypeExtended } from 'store/promotions/selectors';

const SportsPromotionsPage = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type') ?? 'all';

  return (
    <>
      <div className="pt-[76px] px-4 pb-4 md:pt-0 xl:px-5">
        <CardList type={type as PromotionTypeExtended} />
      </div>
      <PromotionSheet />
    </>
  );
};

export default SportsPromotionsPage;
