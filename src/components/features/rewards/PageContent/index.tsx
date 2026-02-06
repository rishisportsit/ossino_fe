import { useNavigate } from 'react-router-dom';
import BookmarkIcon from 'assets/icons/BookmarkIcon';
import CupIcon from 'assets/icons/CupIcon';
import GiftIcon from 'assets/icons/GiftIcon';
import NoteIcon from 'assets/icons/NoteIcon';

interface Option {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const options: Option[] = [
  {
    label: 'Redemptions',
    icon: GiftIcon,
    route: '/loyalty/rewards/redemption',
  },
  {
    label: 'Missions',
    icon: NoteIcon,
    route: '/loyalty/rewards/missions',
  },
  {
    label: 'Badges',
    icon: BookmarkIcon,
    route: '/loyalty/rewards/badges',
  },
  {
    label: 'Leaders',
    icon: CupIcon,
    route: '/loyalty/rewards/leaderboard',
  },
];

const PageContent = () => {
  const navigate = useNavigate();

  const handleOptionClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-4 gap-2 mb-8 px-4 xl:mb-5 xl:px-5">
      {options.map(({ icon: Icon, label, route }) => (
        <div
          key={label}
          onClick={() => handleOptionClick(route)}
          className="rounded-xl pt-3 pb-2.5 px-4 flex flex-col items-center gap-1 bg-base-750 cursor-pointer hover:bg-base-680 transition-colors duration-200 active:scale-95 transform transition-transform"
        >
          <Icon className="fill-primary-2" />
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default PageContent;
