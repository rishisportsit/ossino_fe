import Hero from 'components/features/main-page/Hero';
import MainPageBlocks from 'components/features/main-page/MainPageBlocks';
import PromoBlock from 'components/features/main-page/PromoBlock';
import RecentlyPlayedGamesBlock from 'components/features/main-page/RecentlyPlayedGamesBlock';
import RecommendedGamesBlock from 'components/features/main-page/RecommendedGamesBlock';
import CategoriesBlock from 'components/shared/CategoriesBlock';
import { useState } from 'react';

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState<string[]>(['Lobby']);

  return (
    <div className="flex flex-col gap-5 md:gap-6 xl:gap-8 pt-[70px] md:pt-0">
      <div className="px-4 lg:px-5">
        <Hero />
      </div>
      <div className="pl-4 xl:pl-5 flex flex-col gap-9 xl:pr-5">
        <PromoBlock />

        <RecommendedGamesBlock />
        
        <RecentlyPlayedGamesBlock />

        <div className="xl:bg-base-800 xl:py-5 xl:px-5 flex flex-col gap-9 rounded-[12px]">
          <CategoriesBlock applyCurrentCategory={setCurrentCategory} currentCategory={currentCategory} />
          <MainPageBlocks category={currentCategory[0]} />
          {/* <BonusOffersBlock /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
