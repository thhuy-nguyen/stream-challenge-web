'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import { 
  LockResetIcon, 
  LockIcon, 
  WarningIcon,
  CheckCircleIcon
} from '@/app/components/icons';

export default function UpdatePassword() {
  const t = useTranslations('auth.updatePassword');
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSessionValid, setIsSessionValid] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        router.push('/auth/login?message=password-reset-link-expired');
      } else {
        setIsSessionValid(true);
      }
    };

    checkSession();
  }, [router, supabase]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }
    
    setError(null);
    setMessage(null);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage(t('passwordUpdated'));
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: Error | unknown) {
      console.error('Update password error:', err);
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSessionValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 flex items-center justify-center">
        <div className="p-8 text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
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
                <LockResetIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">{t('title')}</h1>
              <p className="text-white/80 mt-2">{t('subtitle')}</p>
            </div>

            {/* Success Message */}
            {message && (
              <div className="alert alert-success mb-6 bg-opacity-20 backdrop-blur-md border-green-500/40">
                <CheckCircleIcon className="h-6 w-6 shrink-0 stroke-current" />
                <span>{message}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-6 bg-opacity-20 backdrop-blur-md border-red-500/40">
                <WarningIcon className="h-6 w-6 shrink-0 stroke-current" />
                <span>{error}</span>
              </div>
            )}

            {/* Update Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white/80">{t('newPasswordLabel')}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-white/50"
                    placeholder={t('newPasswordPlaceholder')}
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white/80">{t('confirmPasswordLabel')}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-white/50"
                    placeholder={t('confirmPasswordPlaceholder')}
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
                    {t('updating')}
                  </div>
                ) : t('updatePassword')}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-white/70 text-sm">
                  <Link href="/auth/login" className="text-purple-300 hover:text-white transition-colors">
                    {t('backToLogin')}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}