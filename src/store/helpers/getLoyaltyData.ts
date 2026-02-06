import { RootState } from "..";

export const getLoyaltyData = (state: RootState) => {
  const { data } = state.user;

  if (!data?.id) {
    throw new Error('User id not found');
  }

  const brand = data.brand || 'ossino';

  return {
    brand: brand,
    userId: data.id.toString(),
  };
};