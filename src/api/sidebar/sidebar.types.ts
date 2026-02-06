export interface TopMenuItem {
  displayid: number;
  menutype_id: number;
  menu_name: string;
  menu_link: string;
  is_active: boolean;
  display_order: number;
  region_id: number;
  before_login: boolean;
  after_login: boolean;
  isDesktopMenu: boolean;
  isMobileMenu: boolean;
  icontags: string;
}

export type BottomMenuItem = TopMenuItem;

export type GameCategory = {
  displayid: number;
  menutype_id: number;
  menu_name: string;
  menu_link: string;
  is_active: boolean;
  display_order: number;
  region_id: number;
  before_login: boolean;
  after_login: boolean;
  isDesktopMenu: boolean;
  isMobileMenu: boolean;
  icontags: string;
  image: string;
  game_count: number;
};
