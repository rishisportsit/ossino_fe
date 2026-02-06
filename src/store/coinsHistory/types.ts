export enum CoinHistoryType {
  GameReward = 'game_reward',
  CoinsBurn = 'coins_burn',
  FriendDeposit = 'friend_deposit',
  MissionCompleted = 'mission_completed',
  BetLost = 'betlost',
  Burn = 'burn',
  Signup = 'signup',
}

export type CoinHistory = {
  id: string; 
  gameName: string;
  value: number;
  date: string;
  type: CoinHistoryType;
  loyaltyType: any;
  transactionType: 'credit' | 'debit';
  coinsCredit?: number;
  coinsDebit?: number;
  amount: number;
  loyaltyLevel: string;
  created_date: string;
  betId?: string;
  missionId?: string;
};