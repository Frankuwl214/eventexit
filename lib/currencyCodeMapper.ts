// currencyCodeMapper.js

export const getCurrencyCode = (locale) => {
    // Add logic to map locale to currency code
    // Example:
    if (locale.startsWith('en-GB')) {
      return 'GBP';
    }
    // Add more mappings as needed
    return 'USD'; // Default
  };
  