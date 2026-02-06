import CardList from 'components/features/promotions/CardsList';
import { useSearchParams } from 'react-router-dom';
import PromotionSheet from 'components/features/promotions/PromotionSheet';
// import type { PromotionTypeExtended } from 'store/promotions/selectors';
import { CmsPromotionResponse } from 'api/content/content.types';

const PromotionsPage = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');

  return (
    <>
      <div className="px-4">
        <CardList
          category={type ?? undefined}
          type={type as CmsPromotionResponse['promotionType']}
        />
      </div>
      <PromotionSheet />
    </>
  );
};

export default PromotionsPage;
