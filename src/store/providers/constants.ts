import { type ProviderCode, PROVIDER_CODE } from 'api/content/content.types';

const API_ID_TO_PROVIDER_CODE: Record<string, ProviderCode> = {
  'Evolution_Gaming': PROVIDER_CODE.EVOLUTION,
  'Booming': PROVIDER_CODE.BOOMING,
  'Shacksevo': PROVIDER_CODE.ORYX_GAMING,
  'Onetouch_Table_Game': PROVIDER_CODE.PUSH_GAMING,
  'Live88': PROVIDER_CODE.LIVE_88,
  'Avatarux': PROVIDER_CODE.EVOLUTION,
  'Negames': PROVIDER_CODE.NEGAMES,
  'Stp': PROVIDER_CODE.ORYX_GAMING,
  'Nolimit_City': PROVIDER_CODE.PUSH_GAMING,
  'Hacksaw_Gaming': PROVIDER_CODE.PLAY_GO,
  'Kalamba': PROVIDER_CODE.EVOLUTION,
  'Onetouch_Generic': PROVIDER_CODE.PRAGMATIC_PLAY,
} as const;

export const mapApiIdToProviderCode = (apiId: string): ProviderCode | null => {
  return API_ID_TO_PROVIDER_CODE[apiId] || null;
};