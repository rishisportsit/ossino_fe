import globalLogo from '/icons/globalLogo.svg?url';
import footballLogo from '/icons/footballLogo.svg?url';
import cardsLogo from '/icons/cardsLogo.svg?url';
import britainLogo from '/icons/britainLogo.svg?url';
import germanyLogo from '/icons/germanyLogo.svg?url';
import ukraineLogo from '/icons/ukraineLogo.svg?url';

export type DropDownItem = {
  id: number;
  icon: string;
  iconId: string;
  title: string;
};

export const dropdownOptions: DropDownItem[] = [
  {
    id: 1,
    icon: globalLogo,
    iconId: 'globalLogo',
    title: 'Global',
  },
  {
    id: 2,
    icon: footballLogo,
    iconId: 'footballLogo',
    title: 'Football',
  },
  {
    id: 3,
    icon: cardsLogo,
    iconId: 'cardsLogo',
    title: 'Casino',
  },
  {
    id: 4,
    icon: britainLogo,
    iconId: 'britainLogo',
    title: 'English',
  },
  {
    id: 5,
    icon: germanyLogo,
    iconId: 'germanyLogo',
    title: 'German',
  },
  {
    id: 6,
    icon: ukraineLogo,
    iconId: 'ukraineLogo',
    title: 'Ukrainian',
  },
];
