import { FC, useState } from 'react';

interface AvatarProps {
  withIndicator?: boolean;
  levelImage?: string | null;
  levelName?: string | null;
  isLoading?: boolean;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  withIndicator = false,
  levelImage,
  levelName,
  isLoading = false,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    console.error('Failed to load level image:', levelImage);
    console.error('Error event:', e);
    setImageError(true);
  };

  const shouldShowLevelImage = levelImage && !imageError && !isLoading;

  return (
    <div className={`relative ${className}`}>
      <div className="w-8 h-8 bg-base-600 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-base-600 animate-pulse rounded-full" />
        ) : shouldShowLevelImage ? (
          <img
            src={levelImage}
            alt={levelName || 'User Avatar'}
            className="p-1 w-8 h-8 object-contain cursor-pointer"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {levelName ? (
              <span className="text-sm body-txtColor-1 font-bold">
                {levelName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <span className="text-sm body-txtColor-1 font-medium">👤</span>
            )}
          </div>
        )}
      </div>

      {withIndicator && (
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-base-800" />
      )}
    </div>
  );
};

export default Avatar;
