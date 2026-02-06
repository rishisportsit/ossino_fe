import { config } from 'config/index';
import { type AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import { LocalStorageHelper } from 'helpers/storage';
import type {
  ApiBadge,
  ApiGameItem,
  ApiMission,
  ApiProvider,
  ApiRedemption,
  BannerResponse,
  CmsPromotionResponse,
  FooterContentResponse,
  OtherLinkInfoResponse,
  TopGamesResponse,
} from './content.types';

const { contentServiceUrl, brandId } = config;

class ContentApi extends AxiosClient {
  async getMissions(): Promise<AxiosResponse<ApiMission[]>> {
    const result = await this.client.get(
      `${contentServiceUrl}/api/v5/Content/loyalty/missions/${brandId}`,
    );

    return result;
  }

  async getBadges(): Promise<AxiosResponse<ApiBadge[]>> {
    const result = await this.client.get(
      `${contentServiceUrl}/api/v5/Content/loyalty/badges/${brandId}`,
    );

    return result;
  }

  async getRedemptions(): Promise<AxiosResponse<ApiRedemption[]>> {
    const result = await this.client.get(
      `${contentServiceUrl}/api/v5/Content/loyalty/redemptions/${brandId}`,
    );

    return result;
  }

  async getProviders(): Promise<AxiosResponse<ApiProvider[]>> {
    const result = await this.client.get(
      `${contentServiceUrl}/api/v5/Content/providers/${brandId}`,
    );

    return result;
  }

  async getBanners(): Promise<AxiosResponse<BannerResponse>> {
    const result = await this.client.get(`${contentServiceUrl}/api/v5/Content/banner/${brandId}`);
    return result;
  }

  async getGames(): Promise<AxiosResponse<ApiGameItem[]>> {
    const cacheKey = `games_cache_${brandId}`;
    const cacheTimestampKey = `games_cache_timestamp_${brandId}`;
    const cached = LocalStorageHelper.getItem<ApiGameItem[]>(cacheKey);
    const cachedTimestamp = LocalStorageHelper.getItem<number>(cacheTimestampKey);
    const now = Date.now();
    if (cached && cachedTimestamp && now - Number(cachedTimestamp) < 2 * 60 * 1000) {
      // Return cached data as AxiosResponse-like object
      return {
        data: cached,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<ApiGameItem[]>;
    }
    const result = await this.client.get(`${contentServiceUrl}/api/v5/Content/casino/${brandId}`);
    LocalStorageHelper.setItem(cacheKey, result.data);
    LocalStorageHelper.setItem(cacheTimestampKey, now);
    return result;
  }

  async getTopGames(): Promise<AxiosResponse<TopGamesResponse>> {
    const result = await this.client.get(`${contentServiceUrl}/api/v5/Content/topgames/${brandId}`);
    return result;
  }

  async getPromotions(): Promise<AxiosResponse<CmsPromotionResponse[]>> {
    const result = await this.client.post(
      `${contentServiceUrl}/api/v5/Content/offerlinkinfo/${brandId}`
    );
    return result;
  }
  async getOtherLinkInfo(menuTypeId: number): Promise<AxiosResponse<OtherLinkInfoResponse>> {
    const result = await this.client.get(
      `${contentServiceUrl}/api/v5/Content/otherlink/${brandId}?menuTypeId=${menuTypeId}`
    );
    return result;
  }
  async getFooterInfo(): Promise<AxiosResponse<FooterContentResponse>> {
    const result = await this.client.get(
      `${contentServiceUrl}/api/v5/Content/footer/${brandId}`
    );
    return result;
  }
}

const ContentInstance = new ContentApi(contentServiceUrl);

export {
  ContentInstance as ContentApi
};
