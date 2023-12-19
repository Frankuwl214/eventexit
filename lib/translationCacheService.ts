// translationCacheService.js

let translationCache = {};

export const cacheTranslations = (key, translation) => {
  translationCache[key] = translation;
};

export const getFromCache = (key) => {
  return translationCache[key];
};
