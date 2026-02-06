import { FC, useState } from 'react';
import { useAppSelector } from 'store/index';
import { selectPlayerDetails } from 'store/settings/selectors';
import { selectUserData } from 'store/user/selectors';

interface UserProfileAvatarProps {
  withIndicator?: boolean;
  levelImage?: string | null;
  levelName?: string | null;
  isLoading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserProfileAvatar: FC<UserProfileAvatarProps> = ({
  withIndicator = false,
  levelImage,
  levelName,
  isLoading = false,
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);
  const playerDetails = useAppSelector(selectPlayerDetails);
  const account = useAppSelector(selectUserData);

  // Get profile picture from API response or fallback to local
  const profilePath = playerDetails?.userOtherInfo?.profilePath;
  const profileImage = profilePath || account?.profileImage;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    console.error('Failed to load image:', e.currentTarget.src);
    setImageError(true);
  };

  // Size configurations
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const indicatorSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} bg-base-600 rounded-lg flex items-center justify-center overflow-hidden`}>
        {isLoading ? (
          <div className="w-full h-full bg-base-600 animate-pulse rounded-full" />
        ) : profileImage && !imageError ? (
          // Show profile picture if available
          <img
            src={profileImage}
            alt="Profile Avatar"
            className={`${sizeClasses[size]} object-cover cursor-pointer rounded-lg`}
            onError={handleImageError}
          />
        ) : levelImage && !imageError ? (
          // Fallback to level image
          <img
            src={levelImage}
            alt={levelName || 'User Avatar'}
            className={`p-1 ${sizeClasses[size]} object-contain cursor-pointer`}
            onError={handleImageError}
          />
        ) : (
          // Final fallback to initials or default icon
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
        <div className={`absolute bottom-0 right-0 ${indicatorSizes[size]} bg-green-500 rounded-full border border-base-800`} />
      )}
    </div>
  );
};

export default UserProfileAvatar;