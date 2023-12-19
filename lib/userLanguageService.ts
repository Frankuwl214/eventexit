// userLanguageService.js

export const getUserLanguagePreference = () => {
    // Implement logic to retrieve user's language preference
    // This could be from a database, user settings, etc.
  };
  
  export const detectLanguage = () => {
    // Implement logic to detect the user's language
    // For example, using the browser's language settings
    return navigator.language || navigator.userLanguage;
  };
  