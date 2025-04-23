'use client';

import { useState, FormEvent } from 'react';
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
  PlayIcon
} from '@/app/components/icons';

export default function Login() {
  const t = useTranslations('auth.login');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      router.push(callbackUrl);
      router.refresh();
    } catch (err: Error | unknown) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'twitch') => {
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
      console.error(`${provider} login error:`, err);
      setError(err instanceof Error ? err.message : `${provider} login failed. Please try again.`);
      setIsLoading(false);
    }
  };

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
                <PlayIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">{t('title')}</h1>
              <p className="text-white/80 mt-2">Sign in to your Stream Challenge account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-6 bg-opacity-20 backdrop-blur-md border-red-500/40">
                <WarningIcon className="h-6 w-6 shrink-0 stroke-current" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
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
                  <span className="label-text text-white/80">{t('passwordLabel')}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-purple-300" />
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

              <div className="flex items-center justify-between text-sm">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm bg-white/5 border-white/20"
                    />
                    <span className="label-text ml-2 text-white/80">Remember me</span>
                  </label>
                </div>

                <div>
                  <Link href="/auth/reset-password" className="text-purple-300 hover:text-white transition-colors">
                    {t('forgotPassword')}
                  </Link>
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
                    {t('signingIn')}
                  </div>
                ) : t('signIn')}
              </button>
            </form>

            {/* Social Login Options */}
            <div className="mt-8">
              <div className="divider text-white/60">{t('orContinueWith')}</div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="btn btn-outline btn-ghost bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  data-client-id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                >
                  <GoogleIcon />
                  <span className="ml-2">Google</span>
                </button>

                <button
                  onClick={() => handleSocialLogin('twitch')}
                  className="btn btn-outline btn-ghost bg-white/5 hover:bg-white/10 border-white/10 text-white"
                >
                  <TwitchIcon className="h-5 w-5 text-purple-400" />
                  <span className="ml-2">Twitch</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="py-4 px-8 bg-black/20 text-center">
            <p className="text-sm text-white/80">
              {t('noAccount')}{' '}
              <Link href="/auth/register" className="text-purple-300 hover:text-white font-medium transition-colors">
                {t('createAccount')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}