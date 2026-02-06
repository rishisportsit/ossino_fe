import axios from 'axios';

const baseURL = import.meta.env.VITE_JAVA_WRAPPER_SERVICE_URL;

export const BadgesApi = {
  async getAvailableBadges() {
    const response = await axios.get(`${baseURL}/v1/get/badge/available`);
    return response.data.result;
  },
  async getPlayerBadges(userId: string, brandId: string) {
    const response = await axios.get(
      `${baseURL}/v1/get/badge/player?userId=${userId}&brandId=${brandId}`,
    );
    return response.data.result;
  },
};
