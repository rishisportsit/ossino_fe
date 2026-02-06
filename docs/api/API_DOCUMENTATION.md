# Ossino FE API Documentation

Complete documentation for all API modules in the `/src/api` folder.

## Table of Contents

1. [Core Infrastructure](#core-infrastructure)
2. [Authentication & User Management](#authentication--user-management)
3. [Casino & Gaming](#casino--gaming)
4. [Wallet & Payments](#wallet--payments)
5. [Loyalty & Rewards](#loyalty--rewards)
6. [Sports Betting](#sports-betting)
7. [Content & Information](#content--information)
8. [Affiliate & Referral](#affiliate--referral)

---

## Core Infrastructure

### axiosClient.ts

**Purpose:**  
Base HTTP client that provides request/response interceptors for authentication and error handling. All API classes extend this base client.

**Key Features:**
- Automatically attaches access tokens from local storage to all requests
- Adds tokens to request body for non-GET requests
- Adds tokens to query params for GET requests
- Handles 401 (Unauthorized) responses by dispatching logout action
- Logs wallet-related API responses for debugging
- Validates decimal precision for wallet balances
- Logs all API errors with context

**Methods:**
- `protected get client()` - Returns the Axios instance
- `static setAccessToken(accessToken: string)` - Stores access token in local storage
- `static clearAccessToken()` - Removes access token from local storage

**Usage:**
```typescript
class MyApi extends AxiosClient {
  constructor() {
    super('https://api.example.com');
  }
}
```

---

## Authentication & User Management

### auth/auth.api.ts

**Purpose:**  
Handles all authentication-related operations including registration, login, logout, and password management.

**Endpoints:**

#### `register(data: RegisterRequestData)`
Registers a new player account.
- **Method:** POST
- **Endpoint:** `/api/v1/register`
- **Includes:** Client type, role (PLAYER), affiliate btag

#### `login(data: LoginRequestData)`
Authenticates a player with username/password.
- **Method:** POST
- **Endpoint:** `/api/v1/player/authenticate`
- **Returns:** User details and access token

#### `loginWithGoogle(data: GoogleLoginRequestData)`
Authenticates a player using Google OAuth.
- **Method:** POST
- **Endpoint:** `/api/v1/player/authenticate/custom`
- **Returns:** User details and access token

#### `getPlayerBalance()`
Retrieves current player balance.
- **Method:** POST
- **Endpoint:** `/api/v1/player/balance`

#### `logout(data: LogoutRequestData)`
Logs out the current player.
- **Method:** POST
- **Endpoint:** `/api/v1/player/logout`

#### `forgotPassword(data: ForgotPasswordRequestData)`
Initiates password reset flow.
- **Method:** POST
- **Endpoint:** `/v1/player/forgot/pin/request/email`

#### `changePassword(data: ChangePasswordRequestData)`
Changes player password.
- **Method:** POST
- **Endpoint:** `/api/v1/player/change/password`

---

### player/player.api.ts

**Purpose:**  
Manages player-specific data including history, bet history, and KYC documentation.

**Endpoints:**

#### `getAccountHistory(data: AccountHistoryRequest)`
Retrieves player account transaction history.
- **Endpoint:** `/api/v2/player/new/accounthistory`

#### `getHistory(data: PlayerHistoryRequest)`
Gets general player activity history.
- **Endpoint:** `/api/v1/player/history`

#### `getCasinoBetHistory(data: CasinoBetHistoryRequest)`
Fetches casino bet history.
- **Endpoint:** `/api/v1/player/casino/bethistory`

#### `getSportsBetHistory(data: SportsBetHistoryRequest)`
Retrieves sports betting history.
- **Endpoint:** `/api/v1/bethistory`
- **Headers:** Includes X-Client-Id

#### `getCasinoBetHistoryWithRound(data: CasinoBetHistoryWithRoundRequest)`
Gets detailed casino bet history with round information.
- **Endpoint:** `/api/v1/player/bethistory/casino/history`

#### `getCasinoBetHistoryWithRoundIdData(data: CasinoBetHistoryWithRoundRequest)`
Fetches casino bet history by specific round ID.
- **Endpoint:** `/api/v1/player/bethistory/casino/roundId`

#### `getKycTypes()`
Retrieves available KYC document types.
- **Endpoint:** `/api/v1/player/kyc/types`

#### `uploadKyc(data: UploadKycRequest, accessToken: string)`
Uploads KYC documents (ID, selfie).
- **Method:** POST
- **Endpoint:** `/fe/player/kyc/upload`
- **Content-Type:** multipart/form-data

---

### settings/settings.api.ts

**Purpose:**  
Manages player account settings, profile updates, and self-exclusion options.

**Endpoints:**

#### `getPlayerDetails()`
Retrieves current player profile details.
- **Endpoint:** `/api/v1/player/details`

#### `updatePlayerDetails(data: UpdatePlayerDetailsRequest, file?: File)`
Updates player profile information and avatar.
- **Method:** PUT
- **Endpoint:** `/fe/player/update`
- **Content-Type:** multipart/form-data
- **Supports:** Profile picture upload

#### `updateUserLimits(data: SelfExclusionRequest)`
Updates responsible gaming limits and self-exclusion settings.
- **Endpoint:** `/api/v1/player/userlimits/update`

---

## Casino & Gaming

### games/games.api.ts

**Purpose:**  
Handles game launching for both demo and real money play.

**Endpoints:**

#### `launchDemoGame(data: LaunchDemoGameRequest)`
Launches a game in demo mode.
- **Endpoint:** `/casino/v1/launchDemoGame`
- **Returns:** Game URL for iframe/redirect

#### `launchRealGame(data: LaunchRealGameRequest)`
Launches a game in real money mode.
- **Endpoint:** `/casino/v1/launchGame`
- **Returns:** Game URL with session token

---

### rgs/rgs.api.ts

**Purpose:**  
Interacts with Remote Gaming Server for game session management and real-time game operations.

---

## Wallet & Payments

### wallet/wallet.api.ts

**Purpose:**  
Manages cryptocurrency wallets, addresses, and wallet operations.

**Endpoints:**

#### `getWalletList({ currencyCode, currencyType }: WalletCurrencyRequestData)`
Retrieves list of player wallets.
- **Endpoint:** `/api/v1/player/wallet/list`
- **Params:** currencyCode, currencyType, channelType

#### `getAddressList({ currencyCode }: WalletAddressRequestData)`
Gets wallet addresses for a specific cryptocurrency.
- **Endpoint:** `/api/v1/player/wallet/addresses/list`
- **Default:** BTC_TEST

---

### wallet/tip.api.ts

**Purpose:**  
Handles tipping functionality between players.

---

### crypto/crypto.api.ts

**Purpose:**  
Manages cryptocurrency withdrawal operations.

**Endpoints:**

#### `withdraw(data: CryptoWithdrawRequestData)`
Initiates a cryptocurrency withdrawal.
- **Endpoint:** `/api/v1/crypto/withdraw`
- **Returns:** Withdrawal transaction details

---

### payment/payment.api.ts

**Purpose:**  
Manages payment configurations and user spending limits.

**Endpoints:**

#### `getPaymentConfig(data: PaymentConfigRequest)`
Retrieves payment gateway configuration.
- **Endpoint:** `/api/v1/payment/config`

#### `updateUserLimits(data: UserLimitsUpdateRequest)`
Updates deposit/withdrawal limits.
- **Endpoint:** `/api/v1/player/userlimits/update`

---

## Loyalty & Rewards

### loyalty/loyalty.api.ts

**Purpose:**  
Manages the loyalty program including levels, rewards, leaderboards, and redemptions.

**Key Features:**
- Basic authentication with loyalty service credentials
- Custom auth headers for all requests
- Base64 encoded credentials

**Endpoints:**

#### `getRedemptions(params: { userId, brand, platformId, operatorId, token })`
Fetches player redemption history.
- **Endpoint:** `/api/redemptionList`

#### `fetchLeaderboard(params: { brand, platformId, operatorId, limit, userId, username })`
Retrieves loyalty leaderboard data.
- **Endpoint:** `/api/getLeaderboard`
- **Returns:** Leaderboard rankings and current player position

#### `redeemPrize(data: RedeemPrizeRequestData)`
Claims a loyalty reward.
- **Endpoint:** `/api/Claimredemption`
- **Headers:** Custom authorization with loyalty credentials

**Additional Methods:** See loyalty.types.ts for full method list including:
- `getDailyRewards()` - Daily bonus rewards
- `getLoyaltyLevels()` - Available loyalty tiers
- `getRewardHistory()` - Reward claim history
- `burnCoins()` - Spend loyalty coins

---

### missions/missions.api.ts

**Purpose:**  
Manages player missions, challenges, and mission rewards.

**Endpoints:**

#### `getMissionRewards(data: MissionRewardRequest)`
Fetches available mission rewards for a player.
- **Endpoint:** `/promotion/v1/player/mission/reward`
- **Note:** Bypasses AxiosClient token injection

#### `claimMissionReward(data: ClaimRewardRequest)`
Claims a completed mission reward.
- **Endpoint:** `/promotion/v1/player/mission/claim/reward`
- **Headers:** Includes claimApiKey from environment

#### `createClaimRequest(promotionId, playerId, accessToken)`
Helper method to create properly formatted claim requests.

---

### badges/badges.api.ts

**Purpose:**  
Manages player achievement badges and badge progression.

---

### promotions/promotions.api.ts

**Purpose:**  
Handles promotional campaigns, leaderboards, and opt-in/opt-out functionality.

**Endpoints:**

#### `updateOpt(data: UpdateOptRequest)`
Updates player opt-in status for a promotion.
- **Endpoint:** `/promotion/v1/leaderboard/opt`
- **Returns:** Opt-in status and start time

#### `getLeaderboardPromotions(operatorId, providerName, playerId)`
Retrieves available leaderboard promotions.
- **Endpoint:** `/promotion/v1/leaderboard/promotions`
- **Params:** operatorId, providerName (optional), playerId (optional)

#### `getLeaderboard(data: GetLeaderboardRequest)`
Fetches leaderboard standings for a promotion.
- **Endpoint:** `/v1/leaderboard/standings`
- **Returns:** Leaderboard entries and current player position

---

### bonuses/bonuses.api.ts

**Purpose:**  
Manages bonus codes, bonus activation, and bonus tracking.

---

### registerBonuses/registerBonuses.api.ts

**Purpose:**  
Handles registration bonuses and post-registration bonus assignments.

---

## Sports Betting

### betConfig/betConfig.api.ts

**Purpose:**  
Retrieves betting configuration including bet limits, odds formats, and available markets.

**Endpoints:**

#### `getBetConfig({ 'X-Client-Id': clientId, 'X-Currency-Code': currencyCode })`
Gets betting configuration for the client.
- **Endpoint:** `/api/v1/new/betconfig`
- **Headers:** X-Client-Id, X-Currency-Code

---

### SportsHomePage/sportsHomePage.api.ts

**Purpose:**  
Provides sports homepage data including featured events and popular markets.

---

### discoverySearchSports/discoverySearchSports.api.ts

**Purpose:**  
Handles sports event search and discovery functionality.

---

### standings/standings.api.ts

**Purpose:**  
Retrieves league standings and tournament tables.

---

## Content & Information

### homepage/homepage.api.ts

**Purpose:**  
Provides homepage content including recent wins and player insights.

**Endpoints:**

#### `getRecentWins()`
Fetches recent big wins across the platform.
- **Endpoint:** `/api/v1/user/player-insights`
- **Params:** 
  - types: 'LAST_WINS'
  - gameTypes: 'CASINO,NE_GAMES'
  - fromDate: Last 30 days
  - toDate: Current date

---

### news/news.api.ts

**Purpose:**  
Retrieves sports news articles and updates.

**Endpoints:**

#### `getArticles(type: string = 'all')`
Fetches sports news articles.
- **Endpoint:** `/api/v1/sports/news`
- **Params:** type (all, sports, casino, etc.)

---

### content/content.api.ts

**Purpose:**  
Manages CMS content, promotional banners, and static page content.

---

### sidebar/sidebar.api.ts

**Purpose:**  
Provides sidebar navigation data and menu items.

---

### notifications/notifications.api.ts

**Purpose:**  
Manages player notifications, alerts, and in-app messages.

---

## Affiliate & Referral

### affiliate/affiliate.api.ts

**Purpose:**  
Handles affiliate program operations including game tracking and player analytics.

**Endpoints:**

#### `getAffiliateGames(data: GetAffiliateGamesRequestData)`
Fetches affiliate game data from loyalty API.
- **Endpoint:** `/api/getAffiliateGames`
- **Service:** Loyalty Service
- **Auth:** Basic authentication with hardcoded credentials
- **Method:** fetch API (not Axios)

#### `getPlayerDetailsByBtag(data: GetPlayerDetailsByBtagRequestData)`
Retrieves detailed player information by affiliate btag.
- **Endpoint:** `/api/affiliate/player/details/by/btag`
- **Headers:** Includes X-Trace-Id for request tracking

---

### referral/referral.api.ts

**Purpose:**  
Manages player referral program and referral tracking.

**Endpoints:**

#### `getAffiliateSummary(data: GetAffiliateSummaryRequestData)`
Gets affiliate performance summary.
- **Endpoint:** `/api/v1/affiliate/summary`

#### `getReferralDetails()`
Retrieves player's referral program details.
- **Endpoint:** `/api/v1/player/referral/details`
- **Auto-detects:** Client type (mobile/desktop) based on user agent

---

### vip/vip.api.ts

**Purpose:**  
Manages VIP program features, VIP games access, and affiliate approvals.

**Key Types:**
- `AffiliateApprovalRequestData` - Affiliate application data
- `AffiliateApprovalResponseData` - Affiliate approval result
- `VipGame` - VIP-exclusive game metadata

---

## Additional Modules

### player-insights/player-insights.api.ts

**Purpose:**  
Provides analytics and insights about player behavior and gaming patterns.

---

### google-auth/googleAuth.api.ts

**Purpose:**  
Handles Google OAuth authentication flow and token management.

---

### emailConfirmation/emailConfirmation.api.ts

**Purpose:**  
Manages email verification and confirmation processes.

---

### currency/currency.api.ts

**Purpose:**  
Handles currency conversion rates and multi-currency support.

---

## Type Definitions

Each API module includes corresponding TypeScript type definitions in `.types.ts` files:

- Request data types
- Response data types
- Nested object types
- Enum definitions

**Example:**
```typescript
// auth.types.ts
export interface LoginRequestData {
  userName: string;
  password: string;
  channelType?: string;
}

export interface LoginResponseData {
  accessToken: string;
  userId: string;
  playerDetails: PlayerDetails;
}
```

---

## Common Patterns

### Error Handling

All API calls should be wrapped in try-catch blocks:

```typescript
try {
  const response = await AuthApi.login(credentials);
  // Handle success
} catch (error) {
  // Handle error
  console.error('Login failed:', error);
}
```

### Service Response Type

Most endpoints return `ServiceResponse<T>`:

```typescript
interface ServiceResponse<T> {
  code: string;
  message: string;
  error: boolean;
  result: T;
  targetSystem: string;
}
```

### Client Type Constants

Use `CLIENT_TYPE` constant from `constants/clientType.ts` for all requests requiring channel/client identification.

---

## Environment Configuration

API base URLs are configured in `config/index.ts`:

- `wrapperServiceUrl` - Main backend wrapper
- `gamesServiceUrl` - Game launching service
- `loyaltyServiceUrl` - Loyalty/rewards service
- `javaWrapperServiceUrl` - Java backend services
- `newsStandingsServiceUrl` - News and standings service

---

## Best Practices

1. **Always use TypeScript types** - Import request/response types from `.types.ts` files
2. **Handle authentication** - AxiosClient automatically injects tokens
3. **Error boundaries** - Implement proper error handling for all API calls
4. **Loading states** - Show loaders during API requests
5. **Type safety** - Never use `any` for API responses, define proper interfaces
6. **Environment variables** - Use env vars for API keys and sensitive data
7. **Request tracing** - Include trace IDs for debugging complex flows
8. **Token management** - Use AxiosClient static methods for token operations

---

## Security Considerations

- Access tokens stored in local storage
- Basic auth credentials for loyalty service (should be env variables)
- CORS headers automatically handled by Axios
- 401 responses trigger automatic logout
- Sensitive data (passwords) never logged
- File uploads use multipart/form-data
- KYC documents handled securely

---

## Testing

When testing API integrations:

1. Mock the AxiosClient in tests
2. Test error scenarios (401, 500, network failures)
3. Validate request payloads
4. Verify response transformations
5. Test token injection/removal

---

## Migration Notes

When migrating from old API structure:

1. Replace direct axios calls with API class methods
2. Update import paths to use new API modules
3. Update type imports from `.types.ts` files
4. Ensure CLIENT_TYPE is included where required
5. Test authentication flows thoroughly

---

## Support

For questions or issues with API integration:

1. Check this documentation
2. Review API type definitions
3. Check browser network tab for actual requests
4. Review AxiosClient interceptors for request/response transformation
5. Consult backend API documentation

---

**Last Updated:** January 14, 2026  
**Version:** 1.0.0
