'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { LockResetIcon } from '@/app/components/icons';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.getSession();
      
      // Handle any errors that occur during the OAuth flow
      if (error) {
        console.error('Error during OAuth callback:', error);
        router.push('/auth/login?error=Authentication%20failed');
        return;
      }

      // Either redirect to the callback URL or to the dashboard
      try {
        router.push(callbackUrl);
      } catch (err: Error | unknown) {
        console.error('Redirect error:', err);
        router.push('/dashboard');
      }
    };

    handleAuthCallback();
  }, [callbackUrl, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 text-center max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <LockResetIcon className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Authenticating...</h2>
          <p className="text-white/80 mb-6">Please wait while we complete your authentication.</p>
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </div>
    </div>
  );
}