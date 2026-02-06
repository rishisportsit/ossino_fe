import { CmsPromotionResponse } from 'api/content/content.types';
import { useNavigate } from 'react-router-dom';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';

interface PromotionCardProps {
  promotion: CmsPromotionResponse;
}

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  const { openDialog } = useDialog();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/promotions');
    openDialog(DIALOG_TYPE.promotion, { cmsData: promotion });
  };

  if (promotion.offerimage) {
    return (
      <div
        className="relative flex-shrink-0 w-[248px] lg:w-[376px] h-[120px] lg:h-[120px] cursor-pointer"
        dangerouslySetInnerHTML={{ __html: promotion.offerimage }}
        onClick={handleCardClick}
      />
    );
  }

  return (
    <div
      className="relative flex-shrink-0 w-[248px] lg:w-[376px] h-[120px] lg:h-[120px] rounded-xl p-3 lg:p-4 bg-gradient-to-r from-gradient-secondary-dark-1 to-gradient-secondary-dark-2 uppercase cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-1.5 lg:gap-2 justify-start">
        <div className="inline-block w-[60px] lg:w-[76px] py-0.5 px-1.5 rounded-[74px] lg:rounded-[100px] bg-accent-3 text-2xs lg:text-[10px] leading-[12px] text-center lg:leading-3 body-txtColor-2 font-bold">
          Hot Offer
        </div>
        <div className="flex flex-col gap-0 font-black body-txtColor-1">
          <p className="text-xs lg:text-[16px] leading-[14px] lg:leading-5">
            {promotion.title}
          </p>
          <p className="text-2xl lg:text-[32px] leading-[28px] lg:leading-[38px]">
            {/* Extract title or use fallback */}
          </p>
        </div>
        <div className="flex flex-row gap-0 items-center content-center mt-1.5 lg:mt-1 text-xs lg:text-sm leading-[14px] lg:leading-5 capitalize font-bold body-txtColor-1">
          <div>Learn More</div>
          <img
            src="/icons/arrowRight.svg"
            alt="right arrow"
            className="filter-invert-greyscale"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
