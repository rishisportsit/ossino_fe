import { SwiperSlide } from 'swiper/react';

import Slider from 'components/shared/Slider';
import SportTag from 'components/shared/SportTag';

const sports = [
  { id: 'all', name: 'All sports', icon: null },
  { id: 'soccer', name: 'Soccer', icon: '/icons/sports/soccer.svg' },
  { id: 'cricket', name: 'Cricket', icon: '/icons/sports/cricket.svg' },
  { id: 'baseball', name: 'Baseball', icon: '/icons/sports/baseball.svg' },
  { id: 'rugby', name: 'Rugby', icon: '/icons/sports/rugby.svg' },
  { id: 'tennis', name: 'Tennis', icon: '/icons/sports/tennis.svg' },
  {
    id: 'volleyball',
    name: 'Volleyball',
    icon: '/icons/sports/volleyball.svg',
  },
];

const SearchTags = () => {
  return (
    <Slider withShadow sportShadow navigation spaceBetween={8} loop={false}>
      {sports.map((sport) => (
        <SwiperSlide key={sport.id} className="!w-auto">
          <SportTag size="sm" sport={sport} active={sport.id === 'all'} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default SearchTags;
