import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Create our i18n configuration for loading message files
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is actually one we support
  if (locale !== 'en' && locale !== 'vi') {
    notFound();
  }
 
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});