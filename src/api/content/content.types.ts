export const PROVIDER_CODE = {
  EVOLUTION: 'evolution',
  PRAGMATIC_PLAY: 'pragmatic-play',
  ORYX_GAMING: 'oryx-gaming',
  PUSH_GAMING: 'push-gaming',
  PLAY_GO: 'play-go',
  BOOMING: 'booming',
  LIVE_88: 'live88',
  NEGAMES: 'negames',
} as const;

export type ProviderCode = (typeof PROVIDER_CODE)[keyof typeof PROVIDER_CODE];

export type Game = {
  id: string;
  title: string;
  players: number;
  image: string;
  group: string;
  providers: ProviderCode[];
  categories: string[];
  favorite: boolean;
  url: string;

  aggregator_type?: string;
  categoryicon?: string;
  categoryname?: string;
  cmsstatus?: boolean;
  configname?: string;
  description?: string | null;
  game_code?: string;
  game_type?: string;
  gamekind?: string | null;
  gamevariant?: string | null;
  imageConfigUrl?: string;
  imageUrl?: string;
  name?: string;
  order?: number;
  provider?: string;
  url_thumb?: string | null;
  userTags?: string[];
};

export type ApiMission = {
  missionId: number;
  missionName: string;
  sponsorName: string;
  coins: number;
  missionProgressPerc: number;
  missionBannerUrl: string;
  missionIconUrl: string;
  missionLaunchUrl: string;
  rewarded: boolean;
  missionContent: string;
};

export type ApiBadge = {
  badgeId: number;
  badgeName: string;
  badgeType: string;
  badgeAchievementProgress: number;
  logoUrl: string;
  totalMilestones: number;
  currentMilestone: number;
  badgeStatus: string;
};

export type ApiRedemption = {
  redemptionId: number;
  redemptionName: string;
  redemptionDescription: string;
  redemptionAwardType: string;
  redemptionAwardValue: number;
  logoUrl: string;
  redemptionPoints: number;
};

export type ApiProvider = object;

export interface TopGame {
  aggregator_type: string;
  provider: string;
  name: string;
  configname: string;
  image: {
    url: string;
    configurl: string;
  };
  description: string;
  url: string;
  order: number;
  game_code: string;
  game_type: string;
  cmsstatus: boolean;
  url_thumb: string;
  gamekind: string;
  categoryname: string;
  categoryicon: string;
  gamevariant: string;
  playingCount: number;
}

export interface TopGamesResponse {
  code: string;
  status: string;
  gameList: TopGame[];
}

export interface BannerData {
  banner_id: number;
  banner_name: string;
  banner_image: string;
  banner_link: string;
  from_date: string;
  to_date: string;
  before_login: boolean;
  after_login: boolean;
  master_typeid: number;
  region_id: number;
  isbannerexpired: boolean;
  is_active: boolean;
  is_deleted: boolean;
  banner_region: string | null;
  displayorder: number;
  is_fixedbanner: boolean;
  languagecode: string | null;
  imagepath: string | null;
  backgroundcolor: string | null;
  textdark: string | null;
  textsmall: string | null;
  textmedium: string | null;
  dimensionsize: string | null;
  subbannertypeid: number;
  dimensionid: number;
  userTags?: string[];
  tumbnailimageurl?: string | null;
  mobileimageurl?: string | null;
  newwindow?: string;
}

export type BannerResponse = BannerData[];

export type ApiGame = {
  aggregator_type: string;
  provider: string;
  name: string;
  configname: string;
  image: {
    url: string;
    configurl: string;
  };
  description: string | null;
  url: string;
  order: number;
  game_code: string;
  game_type: string;
  cmsstatus: boolean;
  url_thumb: string | null;
  gamekind: string | null;
  categoryname: string;
  categoryicon: string;
  gamevariant: string | null;
  userTags: string[];
};

export type ApiGameItem = {
  game_type: string;
  game: ApiGame[];
};

export type CmsPromotionResponse = {
  offer_id: number;
  title: string;
  displayorder: number;
  regionid: number;
  region_code: string;
  mainofferitem: string;
  offerdescription: string | null;
  languagecode: string;
  is_active: boolean;
  is_detaileddescription: boolean;
  tags: string | null;
  categories: string;
  foropera: boolean;
  formobile: boolean;
  afterlogin: boolean;
  beforelogin: boolean;
  imageurl: string | null;
  detailedofferlink: string;
  offerimage: string;
  cmsData: any;
  promotionType: string;
  offerdetails: any;
  selectedpromotionid?: string | null;
};

export interface ApiOtherLinkInfo {
  id: number;
  link_name: string;
  menu_link: string;
  is_newwindow: string;
  is_content: string;
  region_id: number;
  region_code: string;
  is_active: boolean;
  eng_name: string;
  link_type: string;
  beforelogin: boolean;
  afterlogin: boolean;
  categoryname: string;
}

export type OtherLinkInfoResponse = ApiOtherLinkInfo[];

export interface ApiFooterContent {
  content_id: number;
  is_content: string | null;
  keyname: string;
  is_active: boolean;
  region_id: number;
  region_code: string;
}

export type FooterContentResponse = ApiFooterContent[];
