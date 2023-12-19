// localizationAndTranslationService.js

import { Translate } from '@google-cloud/translate';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
import { UrlQueryParams, RemoveUrlQueryParams } from '@/types';
import { getUserLanguagePreference, detectLanguage } from './userLanguageService';
import { cacheTranslations, getFromCache } from './translationCacheService';

require('dotenv').config();

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });
const defaultLanguage = 'en';
const userLocale = navigator.language || 'en-US'; // Locale detection for date and currency

const getLanguageToUse = async () => {
  const userPreferredLanguage = getUserLanguagePreference(); // Function to get the user's manual language setting
  if (userPreferredLanguage) {
    return userPreferredLanguage;
  }
  const detectedLanguage = await detectLanguage();
  return detectedLanguage || defaultLanguage;
};

const translateText = async (text, targetLanguage) => {
  const cacheKey = `${targetLanguage}_${text}`;
  const cachedTranslation = getFromCache(cacheKey);
  if (cachedTranslation) return cachedTranslation;

  try {
    let [translations] = await translate.translate(text, targetLanguage);
    cacheTranslations(cacheKey, translations); // Cache the translation
    return translations;
  } catch (error) {
    console.error('Error with translation:', error);
    return text; // Fallback to the original text in case of an error
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString) => {
  // dateTimeOptions, dateOptions, timeOptions remain the same as your previous code
  return {
    dateTime: new Date(dateString).toLocaleString(userLocale, dateTimeOptions),
    dateOnly: new Date(dateString).toLocaleString(userLocale, dateOptions),
    timeOnly: new Date(dateString).toLocaleString(userLocale, timeOptions),
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price) => {
  // Assuming getCurrencyCode is a function mapping userLocale to currency code
  const currencyCode = getCurrencyCode(userLocale);
  return new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(price));
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true });
};

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach(key => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true });
};

export const handleError = (error: unknown) => {
  console.error("Encountered Error:", error);
  throw error instanceof Error ? error : new Error(JSON.stringify(error));
};

// Export the translate function for use in the application
export { translateText as translate };
