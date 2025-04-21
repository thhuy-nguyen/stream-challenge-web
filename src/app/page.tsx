import { redirect } from 'next/navigation';

// This is the root page that will redirect based on the user's preferred language
export default function Home() {
  // When someone visits the root page, redirect them to the English version
  // The middleware will handle locale detection for other paths
  redirect('/en');
}
