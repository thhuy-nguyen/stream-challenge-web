'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import BasicInfoStep from './components/BasicInfoStep';
import RulesEligibilityStep from './components/RulesEligibilityStep';
import PrizesStep from './components/PrizesStep';
import AdvancedSettingsStep from './components/AdvancedSettingsStep';
import ReviewStep from './components/ReviewStep';
import { PoolFormData } from './types';

export default function PickMeCreatePage() {
  const t = useTranslations('pickMe.create');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const supabase = createClient();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PoolFormData>({
    title: '',
    description: '',
    numberOfWinners: 1,
    participantsLimit: 0, // 0 means unlimited
    eligibilityCriteria: '',
    rules: '',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    prizes: [{ name: '', description: '', image: null }],
    entryOptions: { subscription: false, follow: false, manual: true },
    visibility: 'public',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?callbackUrl=/pick-me/create');
    }
  }, [isLoading, user, router]);

  const handleNextStep = () => {
    setStep(prevStep => Math.min(prevStep + 1, 5));
  };

  const handlePrevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const updateFormData = (data: Partial<PoolFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    if (isSubmitting || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // Format data for the database
      const poolData = {
        title: formData.title,
        description: formData.description,
        rules: formData.rules,
        eligibility_criteria: formData.eligibilityCriteria,
        start_time: formData.startTime,
        end_time: formData.endTime,
        number_of_winners: formData.numberOfWinners,
        participants_limit: formData.participantsLimit,
        creator_id: user.id,
        status: 'active',
        entry_options: formData.entryOptions,
        visibility: formData.visibility,
        prizes: formData.prizes.map(prize => ({
          name: prize.name,
          description: prize.description,
          image_url: prize.image || null,
        })),
      };
      
      // Insert the pool data
      const { data, error } = await supabase
        .from('pools')
        .insert(poolData)
        .select('id')
        .single();
      
      if (error) throw error;
      
      // Redirect to the pool page
      router.push(`/pick-me/pools/${data.id}`);
    } catch (err: Error | unknown) {
      console.error('Error creating pool:', err);
      alert(err instanceof Error ? err.message : 'Failed to create pool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 drop-shadow-md">
              {t('title')}
            </h1>
            <p className="text-indigo-300 mt-2 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
          <Link 
            href="/dashboard" 
            className="btn btn-outline btn-primary gap-2 text-white hover:bg-primary hover:text-white hover:border-primary transition-all self-start shadow-sm hover:shadow-md hover:shadow-primary/30"
          >
            {t('backToDashboard')}
          </Link>
        </div>
        
        <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-8 overflow-hidden hover:border-white/20 transition-all duration-300">
          <div className="card-body p-6">
            <ul className="steps steps-horizontal w-full">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <li 
                  key={stepNumber} 
                  className={`step transition-all duration-300 cursor-pointer ${stepNumber <= step ? 'step-primary text-white' : 'text-gray-400'}`}
                  onClick={() => {
                    if (stepNumber <= step) {
                      setStep(stepNumber);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <span>{t(`steps.step${stepNumber}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-all duration-500 hover:border-indigo-500/20 hover:shadow-indigo-500/5">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                {step === 1 && <BasicInfoStep formData={formData} updateFormData={updateFormData} />}
                {step === 2 && <RulesEligibilityStep formData={formData} updateFormData={updateFormData} />}
                {step === 3 && <PrizesStep formData={formData} updateFormData={updateFormData} />}
                {step === 4 && <AdvancedSettingsStep formData={formData} updateFormData={updateFormData} />}
                {step === 5 && <ReviewStep formData={formData} />}
              </div>
              
              <div className="flex justify-between items-center mt-10 gap-4">
                <button 
                  type="button" 
                  className="btn btn-outline text-white hover:bg-white/10 hover:text-white hover:border-white/40 group shadow-sm hover:shadow-md"
                  onClick={handlePrevStep}
                  disabled={step === 1}
                >
                  {t('previous')}
                </button>
                
                {step < 5 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary group rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/30"
                    onClick={handleNextStep}
                  >
                    {t('next')}
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className="btn bg-gradient-to-r from-primary to-secondary rounded-lg group hover:shadow-lg hover:shadow-indigo-500/30 transition-all border-0 min-w-[160px] whitespace-nowrap" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        {t('processing')}
                      </>
                    ) : (
                      <>
                        {t('createPool')}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}