'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import { 
  LockResetIcon, 
  EmailIcon, 
  WarningIcon, 
  CheckCircleIcon 
} from '@/app/components/icons';

export default function ResetPassword() {
  const t = useTranslations('auth.resetPassword');
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage(t('checkEmail'));
    } catch (err: Error | unknown) {
      console.error('Reset password error:', err);
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
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

            {/* Reset Password Form */}
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

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-none shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    {t('processing')}
                  </div>
                ) : t('resetPassword')}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-white/70 text-sm">
                  {t('rememberPassword')}{' '}
                  <Link href="/auth/login" className="text-purple-300 hover:text-white transition-colors">
                    {t('backToLogin')}
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-8 text-center text-sm text-white/60">
              <p>
                {t('needHelp')} <a href="mailto:support@streamchallenge.com" className="text-purple-300 hover:text-white transition-colors">{t('contactSupport')}</a>
              </p>
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