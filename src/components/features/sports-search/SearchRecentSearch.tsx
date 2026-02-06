import Slider from 'components/shared/Slider';
import { cn } from 'helpers/ui';
import { SwiperSlide } from 'swiper/react';

const items = [
  {
    id: 1,
    label: 'Real Madrid vs Sevilla',
  },
  {
    id: 2,
    label: 'USA vs Nigeria',
  },
  {
    id: 3,
    label: 'Atlético Madrid vs Sevilla ',
  },
  {
    id: 4,
    label: 'NBA',
  },
  {
    id: 5,
    label: 'Soccer',
  },
  {
    id: 6,
    label: 'Real Madrid vs Sevilla',
  },
  {
    id: 7,
    label: 'USA vs Nigeria',
  },
  {
    id: 8,
    label: 'Atlético Madrid vs Sevilla ',
  },
  {
    id: 9,
    label: 'NBA',
  },
  {
    id: 10,
    label: 'Soccer',
  },
];

const SearchRecentSearch = ({ className }: { className?: string }) => {
  return (
    <Slider>
      {items.map((item) => (
        <SwiperSlide key={item.id} style={{ width: 'auto' }}>
          <div
            className={cn(
              'bg-base-750 w-full flex items-center justify-center gap-2 rounded-full body-txtColor-1 px-3 py-2 text-xs cursor-pointer',
              className,
            )}
          >
            {item.label}
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default SearchRecentSearch;
