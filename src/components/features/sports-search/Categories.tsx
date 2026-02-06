import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import Slider from 'components/shared/Slider';
import { cn } from 'helpers/ui';

const categories = ['All Sports', 'Soccer', 'Basketball', 'Tennis'];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  return (
    <Slider spaceBetween={12} className="mb-5 pl-4" sportShadow>
      {categories.map((label) => {
        return (
          <SwiperSlide key={label} className="!w-auto">
            <button
              type="button"
              className={cn(
                'h-10 bg-base-700 rounded-xl px-3 text-xs box-border',
                selectedCategory === label
                  ? 'border border-primary-2 text-primary-2 font-medium'
                  : 'body-txtColor-1',
              )}
              onClick={() => setSelectedCategory(label)}
            >
              {label}
            </button>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
};

export default Categories;
