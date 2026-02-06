import type { BannerData } from 'api/content/content.types';
import type { GameIconProps } from 'components/features/main-page/GameIcon/GameCard';

export const mapItem = (item: BannerData): GameIconProps => {
  // Use the main image for the banner display
  const mainImage = item.imagepath ? item.imagepath.trim() : '';

  // Use thumbnail for the slider if available, otherwise use the main image
  const thumbnailImage = item.tumbnailimageurl ? item.tumbnailimageurl.trim() : mainImage;

  return {
    image: mainImage,
    title: item.banner_name,
    mobileImage: item.mobileimageurl,
    thumbnailImage: thumbnailImage,
    link: item.banner_link,
  };
};
