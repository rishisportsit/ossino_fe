export interface CryptoWithdrawResponse {
    status: number
    data: {
        amount: number
        currencyCode: string
        status: string
        transactionId: string
    };
    message: string
}

export interface CryptoWithdrawRequestData {
    amount: number,
    currencyCode: string,
    networkType: string,
    oneTimeAddress: string,
    userId: number
}