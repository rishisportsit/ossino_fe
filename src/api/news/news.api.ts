import { AxiosClient } from 'api/axiosClient';
import type { NewsResponse } from './news.types';
import { config } from 'config/index';
const { newsStandingsServiceUrl } = config;

class NewsApi extends AxiosClient {
  async getArticles(
  type: string = 'all',
  ): Promise<NewsResponse> {
    const res = await this.client.get(
      `${newsStandingsServiceUrl}/api/v1/sports/news?type=${type}`
    );
    return res.data;
  }
}



export const newsApi = new NewsApi(newsStandingsServiceUrl);
export default newsApi;
