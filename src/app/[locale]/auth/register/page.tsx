'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import { 
  GoogleIcon, 
  TwitchIcon, 
  EmailIcon, 
  LockIcon,
  WarningIcon,
  UserPlusIcon,
  UserIcon
} from '@/app/components/icons';

export default function Register() {
  const t = useTranslations('auth.register');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTableChecked, setIsTableChecked] = useState(false);

  const supabase = createClient();

  // Check if profiles table exists and create it if needed
  useEffect(() => {
    const checkAndCreateProfilesTable = async () => {
      try {
        // Try to query the profiles table to see if it exists
        const { error } = await supabase.from('profiles').select('id').limit(1);
        
        // If the table doesn't exist, create it
        if (error && error.message.includes('relation "public.profiles" does not exist')) {
          await fetch('/api/migrations/profiles', { method: 'POST' });
        }
      } catch (err) {
        console.error('Error checking profiles table:', err);
      } finally {
        setIsTableChecked(true);
      }
    };

    checkAndCreateProfilesTable();
  }, [supabase]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Register new user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?callbackUrl=${callbackUrl}`,
        },
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        router.push('/auth/login?message=check-email');
      } else {
        // The profile should be created automatically by the database trigger
        // No need to manually insert it anymore
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: Error | unknown) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'twitch') => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?callbackUrl=${callbackUrl}`,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (err: Error | unknown) {
      console.error(`${provider} signup error:`, err);
      setError(err instanceof Error ? err.message : `${provider} signup failed. Please try again.`);
      setIsLoading(false);
    }
  };

  // Show loading state while checking for profiles table
  if (!isTableChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-[15%] left-[15%] w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-[35%] right-[20%] w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[25%] left-[30%] w-64 h-64 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <div className="p-8">
            {/* Logo and Title */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <UserPlusIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">{t('title')}</h1>
              <p className="text-white/80 mt-2">{t('subtitle')}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-6 bg-opacity-20 backdrop-blur-md border-red-500/40">
                <WarningIcon className="h-6 w-6 shrink-0 stroke-current" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white/80">{t('emailLabel')}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EmailIcon className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-white/50"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white/80">{t('usernameLabel')}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-white/50"
                    placeholder={t('usernamePlaceholder')}
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white/80">{t('passwordLabel')}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-white/50"
                    placeholder={t('passwordPlaceholder')}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-none shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    {t('creatingAccount')}
                  </div>
                ) : t('createAccount')}
              </button>
            </form>

            {/* Social Login Options */}
            <div className="mt-8">
              <div className="divider text-white/60">{t('orContinueWith')}</div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialSignUp('google')}
                  className="btn btn-outline btn-ghost bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  data-client-id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                >
                  <GoogleIcon />
                  <span className="ml-2">Google</span>
                </button>

                <button
                  onClick={() => handleSocialSignUp('twitch')}
                  className="btn btn-outline btn-ghost bg-white/5 hover:bg-white/10 border-white/10 text-white"
                >
                  <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143h-1.715zM16.571 4.714h1.715v5.143h-1.715zM2.857 0l-2.857 2.857v18.285h5.714v2.857h2.857l2.857-2.857h4.286l5.714-5.714v-15.428h-18.571zM20.571 14.571l-3.428 3.428h-5.714l-2.857 2.857v-2.857h-4.571v-14.286h16.571v10.857z" />
                  </svg>
                  <span className="ml-2">Twitch</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="py-4 px-8 bg-black/20 text-center">
            <p className="text-sm text-white/80">
              {t('alreadyHaveAccount')}{' '}
              <Link href="/auth/login" className="text-purple-300 hover:text-white font-medium transition-colors">
                {t('signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}