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
import { PickMeFormData, Prize } from './types';

export default function PickMeCreatePage() {
  const t = useTranslations('pickMe.create');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const supabase = createClient();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PickMeFormData>({
    title: '',
    description: '',
    entryDuration: 5, // Default: 5 minutes
    limitParticipants: false,
    maxParticipants: 100,
    subscribersOnly: false,
    numWinners: 1,
    numBackupWinners: 0,
    prizes: [],
    notificationEnabled: true,
    autoPublishResults: true,
    requireVerification: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?callbackUrl=/pick-me/create');
    }
  }, [isLoading, user, router]);

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, boolean> = {};
    
    switch (currentStep) {
      case 1: // Basic Info
        if (!formData.title.trim()) {
          errors.title = true;
        }
        break;
      case 2: // Rules & Eligibility
        if (formData.limitParticipants && (!formData.maxParticipants || formData.maxParticipants <= 0)) {
          errors.maxParticipants = true;
        }
        break;
      case 3: // Prizes
        // Validation for prizes if needed
        break;
      case 4: // Advanced Settings
        // Validation for advanced settings if needed
        break;
      case 5: // Review
        // Final validation
        if (!formData.title.trim()) {
          errors.title = true;
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prevStep => Math.min(prevStep + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Highlight validation errors
      // This will trigger UI updates in the respective step components
    }
  };

  const handlePrevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to update all form data
  const updateFormData = (data: Partial<PickMeFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear validation errors for updated fields
    const updatedErrors = { ...validationErrors };
    Object.keys(data).forEach(key => {
      if (updatedErrors[key]) {
        delete updatedErrors[key];
      }
    });
    setValidationErrors(updatedErrors);
  };
  
  // Function specifically for updating prizes array
  const updatePrizes = (prizes: Prize[]) => {
    setFormData(prev => ({ ...prev, prizes }));
  };

  const handleSubmit = async () => {
    if (isSubmitting || !user) return;
    
    if (!validateStep(5)) {
      return; // Don't submit if final validation fails
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate end time based on entry duration (in minutes)
      const now = new Date();
      const endTime = new Date(now);
      endTime.setMinutes(now.getMinutes() + formData.entryDuration);
      
      // Format data for the database
      const poolData = {
        title: formData.title,
        description: formData.description,
        max_participants: formData.limitParticipants ? formData.maxParticipants : null,
        subscribers_only: formData.subscribersOnly,
        num_winners: formData.numWinners,
        num_backup_winners: formData.numBackupWinners,
        creator_id: user.id,
        status: 'active',
        created_at: new Date().toISOString(),
        end_time: endTime.toISOString(),
        notification_enabled: formData.notificationEnabled,
        auto_publish_results: formData.autoPublishResults,
        require_verification: formData.requireVerification
      };
      
      // Insert the pool data
      const { data, error } = await supabase
        .from('pick_me_pools')
        .insert(poolData)
        .select('id')
        .single();
      
      if (error) throw error;
      
      // Insert prizes if any
      if (formData.prizes.length > 0) {
        const prizesData = formData.prizes.map((prize, index) => ({
          pool_id: data.id,
          type: prize.type,
          description: prize.description,
          image_url: prize.imageUrl || null,
          link_url: prize.linkUrl || null,
          position: index + 1
        }));
        
        const { error: prizesError } = await supabase
          .from('pick_me_prizes')
          .insert(prizesData);
        
        if (prizesError) throw prizesError;
      }
      
      // Redirect to the pool page
      router.push(`/pick-me/pools/${data.id}`);
    } catch (err: unknown) {
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
                {step === 1 && <BasicInfoStep formData={formData} updateForm={updateFormData} validationErrors={validationErrors} />}
                {step === 2 && <RulesEligibilityStep formData={formData} updateForm={updateFormData} validationErrors={validationErrors} />}
                {step === 3 && <PrizesStep formData={formData} updatePrizes={updatePrizes} />}
                {step === 4 && <AdvancedSettingsStep formData={formData} updateForm={updateFormData} />}
                {step === 5 && <ReviewStep formData={formData} isProcessing={isSubmitting} />}
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