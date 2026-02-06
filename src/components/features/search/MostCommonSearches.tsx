import { FILTERS } from 'constants/filters';
import { useAppDispatch } from 'store/index';
import { useNavigate } from 'react-router-dom';
import Slider from 'components/shared/Slider';
import { SwiperSlide } from 'swiper/react';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';

interface MostCommonSearchesProps {
  searchItems: { id: number; label: string }[];
}

const MostCommonSearches = ({ searchItems }: MostCommonSearchesProps) => {
  const { applyFilter } = useCustomQueryParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (item: { id: number; label: string }) => {
    // Apply search filter
    // applyFilter(FILTERS.search, item.label);

    // Set current game in Redux and navigate to details page
    if (item.id) {
      dispatch({ type: 'games/setCurrentGameId', payload: { id: item.id.toString() } });
      const slug = item.label.replace(/\s+/g, '-');
      navigate(`/game-details/${encodeURIComponent(slug)}`);
    }
  };

  return (
    <Slider>
      {searchItems.map((item) => (
        <SwiperSlide key={item.id} style={{ width: 'auto' }}>
          <div
            onClick={() => handleClick(item)}
            className="bg-base-750 w-full flex items-center justify-center gap-2 rounded-full body-txtColor-1 px-3 py-2 text-xs cursor-pointer capitalize">
            {item.label}
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default MostCommonSearches;