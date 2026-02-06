export type GetAffiliateSummaryRequestData = {
  channel: string;
  bTag: string;
};

export type ReferralItem = {
  referredUserName: string;
  referrerUserName: string;
  signupDate: string;
  referralAmountEarned: number;
  totalSignups: number;
  totalReferralAmountEarned: number;
};

export type GetReferralDetailsResponseData = {
  result: ReferralItem[];
};
