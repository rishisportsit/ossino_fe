import type { MenuItem } from 'components/shared/MenuItem/menuItems';
import { DIALOG_TYPE } from 'store/dialog/slice';

import lobby from '/icons/home2.svg?url';
import live from '/icons/sports/live.svg?url';
import promotions from '/icons/sports/promotions.svg?url';
import convertCard from '/icons/sports/convertCard.svg?url';
import soccer from '/icons/sports/soccer.svg?url';
import cricket from '/icons/sports/cricket.svg?url';
import soccerGreen from '/icons/sports/soccerGreen.svg?url';
import cricketGreen from '/icons/sports/cricketGreen.svg?url';
import baseball from '/icons/sports/baseball.svg?url';
import rugby from '/icons/sports/rugby.svg?url';
import politics from '/icons/sports/politics.svg?url';
import englandFlag from '/icons/sports/countries/england.svg?url';
import brazilFlag from '/icons/sports/countries/brazil.svg?url';
import portugalFlag from '/icons/sports/countries/portugal.svg?url';
import italyFlag from '/icons/sports/countries/italy.svg?url';
import germanyFlag from '/icons/sports/countries/germany.svg?url';
import bundesligaIcon from '/icons/sports/leagues/Bundesliga.svg?url';
import laligaIcon from '/icons/sports/leagues/LaLiga.svg?url';
import ligaPortugalIcon from '/icons/sports/leagues/LigaPortugal.svg?url';
import uefaEuropaLeagueIcon from '/icons/sports/leagues/UEFAEuropaLeague.svg?url';
import ligaProfesionalIcon from '/icons/sports/leagues/LigaProfesional.svg?url';

export const sportsTopMenuItems = (isDesktop: boolean): MenuItem[] => [
  {
    id: 's-1',
    icon: { id: 'home2Icon', href: lobby },
    label: 'Home',
    href: '/sports',
  },
  {
    id: 's-2',
    icon: { id: 'liveIcon', href: live },
    label: 'Live',
    href: '/sports/live',
  },
  {
    id: 's-3',
    icon: { id: 'promotionsIcon', href: promotions },
    label: 'Promotions',
    href: '/sports/promotions',
  },
  {
    id: 's-4',
    icon: { id: 'convertCardIcon', href: convertCard },
    label: 'P2P Trading',
    ...(isDesktop
      ? { href: '/sports/p2p' }
      : {
          href: '#',
          dialogId: DIALOG_TYPE.betslip,
          data: { tab: 'p2p_trade' },
        }),
  },
  {
    id: 's-5',
    icon: { id: 'soccerIcon', href: soccer },
    label: 'Soccer',
    href: '/sports/soccer',
  },
  {
    id: 's-6',
    icon: { id: 'cricketIcon', href: cricket },
    label: 'Cricket',
    href: '/sports/cricket',
  },
];

export const sportsCategoriesItems: MenuItem[] = [
  {
    id: 'sc-1',
    icon: { id: 'soccerGreenIcon', href: soccerGreen },
    label: 'Soccer',
    count: 1548,
    href: '/sports/soccer',
  },
  {
    id: 'sc-2',
    icon: { id: 'cricketGreenIcon', href: cricketGreen },
    label: 'Cricket',
    count: 856,
    href: '/sports/cricket',
  },
  {
    id: 'sc-3',
    icon: { id: 'baseballIcon', href: baseball },
    label: 'Baseball',
    count: 245,
    href: '/sports/baseball',
  },
  {
    id: 'sc-4',
    icon: { id: 'rugbyIcon', href: rugby },
    label: 'Rugby',
    count: 45,
    href: '/sports/rugby',
  },
  {
    id: 'sc-5',
    icon: { id: 'politicsIcon', href: politics },
    label: 'Politics',
    count: 8,
    href: '/sports/politics',
  },
];

export const sportsTopLeaguesItems: MenuItem[] = [
  {
    id: 'sl-1',
    icon: { id: 'bundesligaIcon', href: bundesligaIcon },
    label: 'Bundesliga',
    count: 97,
    href: '/sports/leagues/bundesliga',
    hideIconWhenExpanded: true,
  },
  {
    id: 'sl-2',
    icon: { id: 'laligaIcon', href: laligaIcon },
    label: 'LaLiga',
    count: 63,
    href: '/sports/leagues/laliga',
    hideIconWhenExpanded: true,
  },
  {
    id: 'sl-3',
    icon: { id: 'uefaEuropaLeagueIcon', href: uefaEuropaLeagueIcon },
    label: 'UEFA Europa League',
    count: 32,
    href: '/sports/leagues/uel',
    hideIconWhenExpanded: true,
  },
  {
    id: 'sl-4',
    icon: { id: 'ligaPortugalIcon', href: ligaPortugalIcon },
    label: 'Liga Portugal',
    count: 39,
    href: '/sports/leagues/liga-portugal',
    hideIconWhenExpanded: true,
  },
  {
    id: 'sl-5',
    icon: { id: 'ligaProfesionalIcon', href: ligaProfesionalIcon },
    label: 'Liga Profesional',
    count: 26,
    href: '/sports/leagues/liga-profesional',
    hideIconWhenExpanded: true,
  },
];

export const sportsCountriesItems: MenuItem[] = [
  {
    id: 'scn-1',
    icon: { id: 'englandFlagIcon', href: englandFlag },
    label: 'England',
    count: 56,
    href: '/sports/countries/england',
  },
  {
    id: 'scn-2',
    icon: { id: 'brazilFlagIcon', href: brazilFlag },
    label: 'Brazil',
    count: 27,
    href: '/sports/countries/brazil',
  },
  {
    id: 'scn-3',
    icon: { id: 'portugalFlagIcon', href: portugalFlag },
    label: 'Portugal',
    count: 27,
    href: '/sports/countries/portugal',
  },
  {
    id: 'scn-4',
    icon: { id: 'italyFlagIcon', href: italyFlag },
    label: 'Italy',
    count: 27,
    href: '/sports/countries/italy',
  },
  {
    id: 'scn-5',
    icon: { id: 'germanyFlagIcon', href: germanyFlag },
    label: 'Germany',
    count: 27,
    href: '/sports/countries/germany',
  },
];
