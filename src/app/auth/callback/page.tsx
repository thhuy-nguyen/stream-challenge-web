'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract authentication details from URL parameters
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh_token');
    const email = searchParams.get('email');
    const displayName = searchParams.get('display_name');

    if (token && refreshToken) {
      try {
        // Store tokens in cookies
        setCookie('token', token, { maxAge: 60 * 60 * 24 }); // 1 day
        setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
        
        if (email) {
          const userData = {
            email,
            displayName: displayName || email.split('@')[0],
          };
          localStorage.setItem('user', JSON.stringify(userData));
        }
        
        // Redirect to dashboard or another protected page
        router.push('/dashboard');
      } catch (err) {
        console.error('Error processing authentication callback:', err);
        setError('Failed to process authentication. Please try again.');
      }
    } else {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-red-600">Authentication Error</h1>
          <p className="text-center">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Signing you in...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}