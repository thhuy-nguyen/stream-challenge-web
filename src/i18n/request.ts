import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  // Check if locale is undefined or not supported
  if (!locale || (locale !== 'en' && locale !== 'vi')) {
    // Default to English if the locale is undefined or not supported
    locale = 'en';
  }

  try {
    // Try to load the messages for the locale
    const messages = (await import(`@/messages/${locale}.json`)).default;
    
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}"`, error);
    
    // Fallback to English if there's an error loading the messages
    if (locale !== 'en') {
      const fallbackMessages = (await import('@/messages/en.json')).default;
      return {
        locale: 'en',
        messages: fallbackMessages
      };
    }
    
    // If even the fallback fails, return an empty messages object
    return {
      locale: 'en',
      messages: {}
    };
  }
});