import { AxiosClient } from 'api/axiosClient';
import { type AxiosResponse } from 'axios';
import { config } from 'config/index';
import type { GameCategory, TopMenuItem, BottomMenuItem } from './sidebar.types';

const { contentServiceUrl, brandId } = config;

class SidebarApi extends AxiosClient {
  async getTopMenu(): Promise<AxiosResponse<TopMenuItem[]>> {
    return this.client.get(`/api/v5/Content/Topmenu/${brandId}`);
  }

  async getBottomMenu(): Promise<AxiosResponse<BottomMenuItem[]>> {
    return this.client.get(`/api/v5/Content/BottomMenu/${brandId}`);
  }

  async getCategories(): Promise<AxiosResponse<GameCategory[]>> {
    return this.client.get(`/api/v5/Content/Categories/${brandId}`);
  }
}

const sidebarApiInstance = new SidebarApi(contentServiceUrl);

export {
  sidebarApiInstance as SidebarApi 
};
