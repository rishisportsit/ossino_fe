import { useEffect, useState, type ReactNode } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import type { PaginationOptions, Swiper as SwiperType } from 'swiper/types';

import SwiperHeader from 'components/shared/Slider/Header';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import styles from './slider.module.css';

SwiperCore.use([Controller, Navigation, Pagination, A11y]);

interface ISliderProps {
  children: ReactNode;
  label?: string;
  count?: number;
  showMore?: boolean;
  withShadow?: boolean;
  sportShadow?: boolean;
  navigation?: boolean;
  className?: string;
  classNameSwiper?: string;
  headerClassName?: string;
  loop?: boolean;
  controller?: SwiperType | null;
  to?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  slidesOffsetAfter?: number;
  slidesPerGroup?: number;
  pagination?: boolean | PaginationOptions;
  grabCursor?: boolean;
  direction?: 'horizontal' | 'vertical';
  showMoreComponent?: 'link' | 'button';
  onClick?: () => void;
  onSwiper?: (swiper: SwiperType) => void;
  tooltipText?: string;
}

const isDesktop = window.innerWidth >= 1024;

const Slider = ({
  children,
  count,
  label,
  showMore,
  className,
  withShadow,
  navigation,
  loop,
  controller,
  to = '#',
  slidesPerView,
  spaceBetween,
  slidesOffsetAfter,
  slidesPerGroup,
  pagination,
  grabCursor,
  direction,
  showMoreComponent,
  onClick,
  onSwiper,
  classNameSwiper,
  headerClassName,
  sportShadow,
  tooltipText,
}: ISliderProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const { screenWidth } = useBreakpoint();
  const xl = screenWidth >= BREAKPOINTS.xl;

  useEffect(() => {
    if (swiperInstance && controller) {
      if (swiperInstance.controller) {
        swiperInstance.controller.control = controller;
      }
    }
  }, [swiperInstance, controller]);

  return (
    <div className={cn('', className)}>
      {label && (
        <SwiperHeader
          tooltipText={tooltipText}
          label={label}
          count={count}
          swiper={swiperInstance}
          className={headerClassName}
          showMore={showMore}
          navigation={navigation}
          to={to}
          showMoreComponent={showMoreComponent}
          onClick={onClick}
        />
      )}
      <Swiper
        className={cn(
          "relative",
          {[styles.sliderShadowBlack]: isDesktop && withShadow && !sportShadow,
            [styles.sliderShadowGray]: isDesktop && withShadow && !sportShadow && xl,
            [styles.sliderShadowSport]: isDesktop && withShadow && sportShadow,
          },
          classNameSwiper
        )}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={spaceBetween || 12}
        freeMode
        slidesPerView={slidesPerView || 'auto'}
        touchReleaseOnEdges
        loop={
          !!loop &&
          typeof count === 'number' &&
          typeof slidesPerView === 'number' &&
          count > slidesPerView
        }
        controller={{ control: controller || undefined }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          if (controller) {
            // eslint-disable-next-line no-param-reassign
            swiper.controller.control = controller;
          }
          if (onSwiper) {
            onSwiper(swiper);
          }
        }}
        direction={direction}
        slidesOffsetAfter={slidesOffsetAfter}
        slidesPerGroup={slidesPerGroup}
        pagination={pagination}
        grabCursor={grabCursor}
        allowTouchMove
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Slider;
