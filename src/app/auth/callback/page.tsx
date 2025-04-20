'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient();
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      
      try {
        // Try to get the session, checking if we were redirected from OAuth
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        // If we get here, the user is authenticated
        router.push(callbackUrl);
      } catch (err: any) {
        console.error('Error during auth callback:', err);
        setError(err.message || 'Authentication failed. Please try again.');
      }
    };
    
    handleCallback();
  }, [router, searchParams]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-8">
          {error ? (
            <div className="text-center">
              <div className="text-red-400 text-lg font-semibold mb-2">Authentication Error</div>
              <p className="text-white/80">{error}</p>
              <button 
                onClick={() => router.push('/auth/login')}
                className="btn btn-primary mt-4 w-full"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="loading loading-spinner loading-lg text-purple-400 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">Authenticating...</h3>
              <p className="text-white/70">Please wait while we complete your sign in.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}