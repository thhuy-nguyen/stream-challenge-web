'use client';

import { useState, useEffect, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/utils/hooks/useAuth';
import { useTranslations } from 'next-intl';
import AppLayout from '@/app/components/AppLayout';
import { CheckIcon } from '@/app/components/icons';

type ProfileData = {
  id: string;
  username: string;
  bio: string | null;
  created_at: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const t = useTranslations('profile');
  const navT = useTranslations('navigation');
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const supabase = createClient();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        // Don't use .single() to avoid PGRST116 error
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id);
        
        if (error) throw error;
        
        // Check if a profile was found
        if (data && data.length > 0) {
          setProfileData(data[0]);
          setUsername(data[0].username || '');
          setBio(data[0].bio || '');
        } else {
          // If no profile exists, create one
          console.log('No profile found, creating one...');
          
          const defaultUsername = user.email ? user.email.split('@')[0] : '';
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: user.id,
              username: user.user_metadata?.username || defaultUsername,
              // Don't include email in the profiles table as it's not in the schema
            }])
            .select();
          
          if (insertError) throw insertError;
          
          if (newProfile && newProfile.length > 0) {
            setProfileData(newProfile[0]);
            setUsername(newProfile[0].username || '');
            setBio(newProfile[0].bio || '');
          }
        }
      } catch (err) {
        console.error('Error fetching/creating profile:', err);
        setError(err instanceof Error ? err.message : t('fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, supabase, t]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    // Validate username is not empty
    if (!username || username.trim() === '') {
      setError(t('usernameRequired'));
      setIsSaving(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          bio,
          updated_at: new Date(),
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setSuccess(t('profileUpdated'));
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: unknown) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : t('updateError'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Define dashboard link for header
  const headerLinks = [
    { key: "dashboard", href: "/dashboard" },
  ];

  return (
    <AppLayout 
      headerLinks={headerLinks}
      withGradientBackground={true}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">{t('yourProfile')}</h1>
          
          {/* Profile Card */}
          <div className="space-y-6">
            {/* Profile Info Card */}
            <div className="card bg-white/10 backdrop-blur-md border border-white/10 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-white">{t('basicInfo')}</h2>
                
                {error && (
                  <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="alert alert-success">
                    <CheckIcon className="h-6 w-6 shrink-0 stroke-current" />
                    <span>{success}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {user && (
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-white">{t('email')}</span>
                      </label>
                      <input
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="input input-bordered w-full bg-white/5 border-white/20"
                      />
                      <label className="label">
                        <span className="label text-white/60 text-sm">{t('emailCannotBeChanged')}</span>
                      </label>
                    </div>
                  )}
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-white">{t('username')}</span>
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input input-bordered w-full bg-white/5 border-white/20"
                      placeholder={t('usernamePlaceholder')}
                    />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-white">{t('bio')}</span>
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="textarea textarea-bordered w-full bg-white/5 border-white/20 h-32"
                      placeholder={t('bioPlaceholder')}
                    ></textarea>
                  </div>
                  
                  <div className="card-actions justify-end mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          {t('saving')}
                        </>
                      ) : t('saveChanges')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}