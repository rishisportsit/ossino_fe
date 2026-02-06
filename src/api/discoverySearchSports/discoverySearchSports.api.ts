import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import { DiscoverySearchRequest, DiscoverySearchResponse, OverClubsRequest, RecentSearchRequest, RecentSearchResponse, TrendingGamesRequest, PopularParlaysRequest, PopularParlaysResponse, } from './discoverySearchSports.types';
import { PopularHighlightsResponse } from 'api/SportsHomePage/sportsHomePage.types';

const { cyrusServiceUrl } = config;

class discoverySearchSportsApis extends AxiosClient {

    getOverClubs(data: OverClubsRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, sportIds, matchStatus, dataFilterOrder, accessToken } = data;

        return this.client.get(`/api/v3/sportsbook/ossino/over/clubs`,
            {
                params: { sportIds, matchStatus, dataFilterOrder },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    };
    getFollowOrFade(data: OverClubsRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, sportIds, matchStatus, dataFilterOrder, accessToken } = data;

        return this.client.get(`/api/v3/sportsbook/ossino/player/follow`,
            {
                params: { sportIds, matchStatus, dataFilterOrder },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    };
    getHotDogs(data: OverClubsRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, sportIds, matchStatus, dataFilterOrder, accessToken } = data;

        return this.client.get(`/api/v3/sportsbook/ossino/hot/dogs`,
            {
                params: { sportIds, matchStatus, dataFilterOrder },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    }
    getTrendingGames(data: TrendingGamesRequest): Promise<AxiosResponse<ServiceResponse<PopularHighlightsResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, isLiveRequired, offset, accessToken } = data;

        return this.client.get(`/api/v3/sportsbook/trending/competition/selections`,
            {
                params: { isLiveRequired, offset },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    }
    getPopularParlays(data: PopularParlaysRequest): Promise<AxiosResponse<ServiceResponse<PopularParlaysResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, accessToken } = data;

        return this.client.get(`/api/v3/sportsbook/popular-parlays`,
            {
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                },
            });
    }

    getDiscoverySearch(data: DiscoverySearchRequest): Promise<AxiosResponse<ServiceResponse<DiscoverySearchResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, userId, searchString, signal } = data;

        return this.client.get(`/api/v3/sportsbook/search/by/sport`,
            {
                params: { userId, searchString },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${data.accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
                signal,
            });
    }

    getRecentSearchDiscoveryPage(data: RecentSearchRequest): Promise<AxiosResponse<ServiceResponse<RecentSearchResponse>>> {
        const { 'X-Client-Id': clientId, 'X-Api-Key': apiKey, 'X-Language-Code': languageCode, userId } = data;

        return this.client.get(`/api/v3/sportsbook/search/keywords`,
            {
                params: { userId },
                headers: {
                    'accept': '*/*',
                    Authorization: `Basic ${data.accessToken}`,
                    'X-Client-Id': clientId,
                    'X-Api-Key': apiKey,
                    'X-Language-Code': languageCode
                },
            });
    }
}

const discoverySearchSportsApisInstance = new discoverySearchSportsApis(cyrusServiceUrl);

export { discoverySearchSportsApisInstance as discoverySearchSportsApis };
