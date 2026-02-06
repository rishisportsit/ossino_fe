import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import { CompetitionDetailsParams, CompetitionDetailsResponse, HeaderRequest, HotMultisRequest, HotMultisResponse, PopularHighlightsRequest, PopularHighlightsResponse, TopLeaguesRequest, TopLeaguesResponse, LiveMatchesCountRequest, LiveMatchesCountResponse, LeagueRequest, BetHistoryRequest, BetHistoryResponse, CashoutRequest, CashoutResponse } from './sportsHomePage.types';
import qs from 'qs';

const { cyrusServiceUrl, wrapperServiceUrl } = config;

class SportsHomePageApis extends AxiosClient {
    // All Sports API
    getAllSports(params: { isAllOutrightsRequired?: boolean; 'X-Client-Id': string; 'X-Api-Key': string; 'X-Language-Code'?: string }): Promise<AxiosResponse<any>> {
        return this.client.get(`/api/v3/sportsbook/sports`, {
            params: { isAllOutrightsRequired: params.isAllOutrightsRequired ?? false },
            headers: {
                'accept': '*/*',
                'X-Client-Id': params['X-Client-Id'],
                'X-Api-Key': params['X-Api-Key'],
                ...(params['X-Language-Code'] ? { 'X-Language-Code': params['X-Language-Code'] } : {})
            },
        });
    }
    getTopLeagues(data: TopLeaguesRequest): Promise<AxiosResponse<ServiceResponse<TopLeaguesResponse>>> {
        const { sportId, 'X-Client-Id': clientId, 'X-Api-Key': apiKey, minutes } = data;

        return this.client.get(`/api/v1/cms/top/tournaments`, {
            params: { sportId, minutes },
            headers: {
                'accept': '*/*',
                Authorization: `Basic ${data.accessToken}`,
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
            },
        });
    }

    getHotMultis(data: HotMultisRequest): Promise<AxiosResponse<ServiceResponse<HotMultisResponse>>> {
        const { sportId, accumulatorsType, 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode } = data;

        return this.client.get(`/api/v1/accumulator`, {
            params: { sportId, accumulatorsType },
            headers: {
                'accept': '*/*',
                Authorization: `Basic ${data.accessToken}`,
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
                'X-Language-Code': languageCode
            },
        });
    }

    getCompetitionDetails(params: CompetitionDetailsParams): Promise<AxiosResponse<ServiceResponse<CompetitionDetailsResponse>>> {
        const { competitionId, xClientId, xApiKey, xLanguageCode } = params;
        return this.client.get(`/api/v3/sportsbook/competition/details`, {
            params: { competitionId },
            headers: {
                'accept': '*/*',
                'X-Client-Id': xClientId,
                'X-Api-Key': xApiKey,
                ...(xLanguageCode ? { 'X-Language-Code': xLanguageCode } : {})
            },
        });
    }

    getMatchOfTheDay(data: HeaderRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey } = data;
        return this.client.get(`/api/v3/sportsbook/ossino/matches-of-the-day`, {
            headers: {
                'accept': '*/*',
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
            },
        });
    }

    getPopularHighlights(data: PopularHighlightsRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, isSelectedFromHeader, isNextBetRequired, sports } = data;

        return this.client.post(`/api/v4/sportsbook/top/competitions`,
            { sports },
            {
                params: { isNextBetRequired, isSelectedFromHeader },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${data.accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    }



    getLiveMatches(data: PopularHighlightsRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, sportId, markets, isNextBetRequired, isPrematchBookedReq } = data;

        return this.client.get(`/api/v3/sportsbook/live/competitions`,
            {
                params: { sportId, markets, isNextBetRequired, isPrematchBookedReq },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${data.accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,

                },
            });
    }



    getUpcomingMatches(data: PopularHighlightsRequest) {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, sportsid, markets, isNextBetRequired, minutes } = data;

        return this.client.get(`/api/v3/sportsbook/daily/competitions`, {
            params: { sportsid, markets, isNextBetRequired, minutes },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
            headers: {
                accept: '*/*',
                Authorization: `Basic ${data.accessToken}`,
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
                'X-Language-Code': languageCode
            }
        });
    }

    getLiveCompetitionsCount(data: LiveMatchesCountRequest): Promise<AxiosResponse<ServiceResponse<LiveMatchesCountResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, isPrematchBookedReq } = data;

        return this.client.get(`/api/v3/sportsbook/live/competitions/count`,
            {
                params: { isPrematchBookedReq },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${data.accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    }


    getLeagues(data: LeagueRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, sportId, categoryId, tournamentIds, isliveRequired, isNextBetRequired, markets, minutes } = data;
        return this.client.get(`/api/v3/sportsbook/competitions`, {
            params: { sportId, categoryId, tournamentIds, isliveRequired, isNextBetRequired, markets, minutes },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
            headers: {
                'accept': '*/*',
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
            },
        });
    }

    getPopularMatchesForInnerPage(data: PopularHighlightsRequest) {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, sportId, isNextBetRequired, markets } = data;

        return this.client.get(`/api/v3/sportsbook/top/tournament/fixtures`, {
            params: { sportId, isNextBetRequired, markets },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
            headers: {
                accept: '*/*',
                Authorization: `Basic ${data.accessToken}`,
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
                'X-Language-Code': languageCode
            }
        });
    }

    getUpcomingCompetitionsCount(data: LiveMatchesCountRequest): Promise<AxiosResponse<ServiceResponse<LiveMatchesCountResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, minutes } = data;

        return this.client.get(`/api/v3/sportsbook/daily/competitions/count`,
            {
                params: { minutes },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${data.accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    }
    getBetHistoryInSportsBook(data: BetHistoryRequest): Promise<AxiosResponse<ServiceResponse<BetHistoryResponse>>> {
        const { 'X-Client-Id': clientId, accessToken, channel, settled, fromDate, toDate, signal } = data;
        const wrapperClient = new SportsHomePageApis(wrapperServiceUrl);

        return wrapperClient.client.post(`/api/v1/bethistory`,
            { channel, settled, fromDate, toDate },
            {
                params: { "X-Client-Id": clientId },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${accessToken}`,
                },
                signal,
            });
    }
    getCashoutApi(data: CashoutRequest): Promise<AxiosResponse<ServiceResponse<CashoutResponse>>> {
        const { 'X-Client-Id': clientId, channel, cashoutStake, tId, accessToken } = data;
        const wrapperClient = new SportsHomePageApis(wrapperServiceUrl);

        return wrapperClient.client.post(`/api/v1/cashout`,
            { accessToken, cashoutStake, channel, tId },
            {
                params: { "X-Client-Id": clientId },
                headers: {
                    'accept': '*/*',
                },
            });
    }

    getRebetApi(data: PopularHighlightsRequest) {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, selectionId } = data;

        return this.client.get(`/api/v3/sportsbook/outcome/details`, {
            params: { selectionId },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
            headers: {
                accept: '*/*',
                Authorization: `Basic ${data.accessToken}`,
                'X-Client-Id': clientId,
                'X-Api-Key': apiKey,
                'X-Language-Code': languageCode
            }
        });
    }
}

const sportsHomePageApisInstance = new SportsHomePageApis(cyrusServiceUrl);

export { sportsHomePageApisInstance as SportsHomePageApis };