import { Capacitor } from '@capacitor/core';

const CACHE_AGE_WEB = 43200; // 12 hours
const CACHE_AGE_NATIVE = 604800; // 1 week

export const getCacheAge = () => {
  if (Capacitor.isNativePlatform()) {
    return CACHE_AGE_NATIVE;
  } else {
    return CACHE_AGE_WEB;
  }
};
