export type AffiliateApprovalRequestData = {
  affiliatePin: string;
  applyDefaultCommissionPercentage: boolean;
  channel: string;
  commissionPercentage: number;
  firstName: string;
  gender: string;
  lastName: string;
  password: string;
  payoutCycle: number;
  role: string;
  setupCost: number;
  state: string;
  updatedBy: string;
  updatedDate: string;
  userName: string;
};

export type AffiliateApprovalResponseData = {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    status: number;
    data: {
      id: number;
      userName: string;
      firstName: string;
      lastName: string;
      affiliatePin: string;
      phoneNumber: string;
      url: string;
      commissionPercentage: number;
      setupCost: number;
      payoutCycle: number;
      btag: string;
    };
    message: string;
  };
};

export type Game = {
  gameName: string;
  aggregator_type: string;
  provider: string;
  game_code: string;
  gameCode?: string;
  image: {
    url: string;
    configurl: string;
  };
  gametype?: string;
  name?: string;
  active?: boolean;
};

export type VipGamesListRequestData = {
  operatorId: string;
  platformId: number;
  brand: string;
  userId: string;
  affiliateId: string;
  games: Game[];
  userName: string;
};

export type VipGamesListResponseData = {
  data: {
    code: number;
    message: string;
  };
};

export type SelectedGameRequestData = {
  operatorId: string;
  platformId: number;
  brand: string;
  userId: string;
  affiliateId: string;
  userName: string;
};

export type SelectedGameResponseData = {
  data: {
    data: {
      affiliateId: string;
      userName: string;
      games: Game[];
    };
  };
};

export type VipReportRequestData = {
  accessToken: string;
  bTag: string;
  channel: string;
};

export type VipReportResponseData = {
  result: {
    data: any;
  };
};

export type AffiliateEarningsRequestData = {
  bTag: string;
  channel: string;
  endDate: string;
  itemsPerPage: number;
  pageNumber: number;
  startDate: string;
};

export type AffiliateEarningsResponseData = {
  result: {
    data: any;
  };
};

export type CoinsHistoryRequestData = {
  operatorId: string;
  platformId: number;
  brand: string;
  userId: string;
  transactionType?: string;
};

export type CoinsHistoryResponseData = {
  data: any;
};