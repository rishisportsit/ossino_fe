import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';

interface Market {
  id: string;
  name: string;
}

interface MarketSelectorProps {
  markets: Market[];
  selectedMarket: string;
  onMarketChange: (marketId: string) => void;
}

const MarketSelector = ({ markets, selectedMarket, onMarketChange }: MarketSelectorProps) => {
  return (
    <Slider
      withShadow
      sportShadow
      navigation
      spaceBetween={8}
      loop={false}
    >
      {markets.map((market) => (
        <SwiperSlide key={market.id} className="!w-auto">
          <button
            onClick={() => onMarketChange(market.id)}
            className={`flex items-center justify-center w-[120px] h-[40px] rounded-xl text-xs font-normal body-txtColor-1 whitespace-nowrap transition-colors border-2 ${
              selectedMarket === market.id
                ? 'bg-base-750 text-special-2 border-special-2'
                : 'bg-base-750 hover:bg-base-600 border-transparent'
            }`}
          >
            <span>{market.name}</span>
          </button>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default MarketSelector;
