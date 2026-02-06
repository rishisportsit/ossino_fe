import { RecentSearchResponse } from 'api/discoverySearchSports/discoverySearchSports.types';
import Slider from 'components/shared/Slider';
import { cn } from 'helpers/ui';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch } from 'store/index';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { SwiperSlide } from 'swiper/react';

interface SearchRecentSearchProps {
  className?: string;
  recentSearchData: RecentSearchResponse | null;
  recentSearchDataLoading?: boolean;
  onRecentSearchClick?: (searchTerm: string) => void;
}

const SearchRecentSearch = ({ className, recentSearchData, onRecentSearchClick, recentSearchDataLoading }: SearchRecentSearchProps) => {
  const dispatch = useAppDispatch();
  const { screenWidth } = useBreakpoint();
  const isMobile = screenWidth < BREAKPOINTS.md;

  const handleSearchClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const searchTerm = target.textContent || '';
    if (onRecentSearchClick) {
      onRecentSearchClick(searchTerm);
    }
    if (isMobile) {
      dispatch(openDialog({ id: DIALOG_TYPE.search }));
    }
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center pt-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-base-300"></div>
    </div>
  );

  if (recentSearchDataLoading) return <LoadingSpinner />;

  return (
    <Slider>
      {(Array.isArray(recentSearchData)
        ? recentSearchData
        : recentSearchData?.result || []
      )?.map((item, index) => (
        <SwiperSlide key={item + index} style={{ width: 'auto' }}>
          <div
            className={cn(
              'bg-base-750 w-full flex items-center justify-center gap-2 rounded-full body-txtColor-1 px-3 py-2 text-xs cursor-pointer',
              className
            )}
            onClick={handleSearchClick}
          >
            {item}
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default SearchRecentSearch;
