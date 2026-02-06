export interface PaymentConfigRequest {
  accessToken?: string;
  clientType: string;
}

export interface PaymentConfigItem {
  createdDate: string;
  depositMaxLimit: number;
  depositMinLimit: number;
  id: number;
  updatedBy: number;
  updatedDate: string;
  withdrawMaxLimit: number;
  withdrawMinLimit: number;
}

export interface PaymentConfigResponse {
  data: PaymentConfigItem[];
  message: string;
  status: number;
}

export interface UserLimitsUpdateRequest {
  accessToken?: string;
  dailyDepositLimit: number;
  dailyStakeLimit: number;
  dailyWithdrawalLimit: number;
  monthlyDepositLimit: number;
  monthlyStakeLimit: number;
  monthlyWithdrawalLimit: number;
  selfExclusion: string;
  timeLimit: number;
  weeklyDepositLimit: number;
  weeklyStakeLimit: number;
  weeklyWithdrawalLimit: number;
}

export interface UserLimitsUpdateResponse {
  createdDate: number;
  dailyDepositLimit: number;
  dailyStakeLimit: number;
  dailyWithdrawalLimit: number;
  monthlyDepositLimit: number;
  monthlyStakeLimit: number;
  monthlyWithdrawalLimit: number;
  selfExcludePeriod: number;
  selfExclusion: string;
  timeLimit: number;
  updatedAt: string;
  weeklyDepositLimit: number;
  weeklyStakeLimit: number;
  weeklyWithdrawalLimit: number;
} 