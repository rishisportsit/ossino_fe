import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import SportTag from 'components/shared/SportTag';
import { LiveMatchesCountResults } from 'api/SportsHomePage/sportsHomePage.types';

interface SportSelectorProps {
  sports: LiveMatchesCountResults[];
  selectedSport: string;
  onSportChange: (sportId: string) => void;
}

const SportSelector = ({ sports, selectedSport, onSportChange }: SportSelectorProps) => {

  return (
    <Slider withShadow sportShadow navigation spaceBetween={8} loop={false}>
      {sports.map((sport: LiveMatchesCountResults) => (
        <SwiperSlide key={sport.sportId} className="!w-auto">
          <SportTag
            sport={sport}
            active={selectedSport === sport.sportId}
            onClick={() => onSportChange(sport?.sportId ?? '')}
          />
        </SwiperSlide>
      ))}

    </Slider>
  );
};

export default SportSelector;
