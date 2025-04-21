'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Import types
import { PickMeFormData, Prize } from './types';

// Import step components
import {
  BasicInfoStep,
  RulesEligibilityStep,
  PrizesStep,
  AdvancedSettingsStep,
  ReviewStep
} from './components';

// Import icons
import { ChevronLeftIcon, ChevronRightIcon } from '@/app/components/icons';

export default function CreatePickMePage() {
  const t = useTranslations('pickMe.create');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    t('steps.basicInfo'),
    t('steps.rulesEligibility'),
    t('steps.prizes'),
    t('steps.advancedSettings'),
    t('steps.review')
  ];
  
  // Form state
  const [formData, setFormData] = useState<PickMeFormData>({
    title: '',
    description: '',
    entryDuration: 5, // Default 5 minutes
    limitParticipants: false,
    maxParticipants: 50, // Default to 50 if limit is enabled
    subscribersOnly: false,
    numWinners: 1,
    numBackupWinners: 1,
    prizes: [{ type: 'text', description: '' }],
    notificationEnabled: true,
    autoPublishResults: true,
    requireVerification: false,
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false); // New state for success feedback
  
  // Step validation
  const isStep1Valid = formData.title.trim() !== '';
  const isStep2Valid = true; // All optional or have defaults
  const isStep3Valid = formData.prizes.some(prize => prize.description.trim() !== '');
  const isStep4Valid = true; // All settings are optional

  // Get percentage of progress through the form
  const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100);
  
  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      // Show brief success animation when moving to next step
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 1000);
      
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Form update handler
  const updateForm = (newData: Partial<PickMeFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  };
  
  // Prize specific update handler
  const updatePrizes = (prizes: Prize[]) => {
    setFormData(prevData => ({
      ...prevData,
      prizes
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    
    try {
      // Calculate end time based on entry duration (minutes)
      const endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + formData.entryDuration);
      
      // Filter out empty prizes
      const validPrizes = formData.prizes.filter(prize => prize.description.trim() !== '');
      
      const response = await fetch('/api/pick-me/pools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          endTime: endTime.toISOString(),
          maxParticipants: formData.limitParticipants ? formData.maxParticipants : null, // null means unlimited
          subscribersOnly: formData.subscribersOnly,
          numWinners: formData.numWinners,
          numBackupWinners: formData.numBackupWinners,
          notificationEnabled: formData.notificationEnabled,
          autoPublishResults: formData.autoPublishResults,
          requireVerification: formData.requireVerification,
          prizes: validPrizes,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create Pick Me pool');
      }
      
      const data = await response.json();
      
      // Redirect to the pool management page
      router.push(`/pick-me/pools/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setCurrentStep(0); // Go back to first step if there's an error
    } finally {
      setIsProcessing(false);
    }
  };

  // Render the current step content
  function renderStepContent() {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep 
            formData={formData} 
            updateForm={updateForm} 
          />
        );
      case 1:
        return (
          <RulesEligibilityStep 
            formData={formData} 
            updateForm={updateForm} 
          />
        );
      case 2:
        return (
          <PrizesStep 
            formData={formData} 
            updatePrizes={updatePrizes} 
          />
        );
      case 3:
        return (
          <AdvancedSettingsStep 
            formData={formData} 
            updateForm={updateForm} 
          />
        );
      case 4:
        return (
          <ReviewStep 
            formData={formData} 
            isProcessing={isProcessing} 
          />
        );
      default:
        return null;
    }
  }

  // Check if the current step can proceed
  function canProceed() {
    switch (currentStep) {
      case 0: return isStep1Valid;
      case 1: return isStep2Valid;
      case 2: return isStep3Valid;
      case 3: return isStep4Valid;
      case 4: return true;
      default: return false;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 py-12 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-600 opacity-15 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-[15%] w-80 h-80 bg-indigo-600 opacity-15 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-[40%] w-96 h-96 bg-violet-800 opacity-10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-[10%] w-64 h-64 bg-blue-600 opacity-15 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTYgdi02aDZ2NnptMzAgMGgtNiB2LTZoNnY2em0tNTQgMGgtNnYtNmg2djZ6bTAgMjRoLTZ2LTZoNnY2em0yNCAwdi02aDZ2NmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with added estimated completion time */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in-down">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 drop-shadow-md">
              {t('title')}
            </h1>
            <p className="text-indigo-300 mt-2 max-w-2xl leading-relaxed">
              {t('subtitle')}
              <span className="ml-2 text-xs bg-indigo-500/30 px-2 py-1 rounded-full">
                {t('estimatedTime')}
              </span>
            </p>
          </div>
          <Link 
            href="/dashboard" 
            className="btn btn-outline btn-primary gap-2 text-white hover:bg-primary hover:text-white hover:border-primary transition-all self-start shadow-sm hover:shadow-md hover:shadow-primary/30"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            {t('backToDashboard')}
          </Link>
        </div>
        
        {/* Steps with enhanced visual feedback */}
        <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-8 overflow-hidden hover:border-white/20 transition-all duration-300 animate-fade-in-up">
          <div className="card-body p-6">
            <ul className="steps steps-horizontal w-full">
              {steps.map((step, index) => (
                <li 
                  key={index} 
                  className={`step transition-all duration-300 cursor-pointer ${index <= currentStep ? 'step-primary text-white' : 'text-gray-400'}`}
                  onClick={() => {
                    // Allow navigating to previous steps or the current step
                    if (index <= currentStep) {
                      setCurrentStep(index);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    <span className="hidden md:inline relative">
                      {step}
                      {index <= currentStep && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      )}
                    </span>
                    <span className="md:hidden">{index + 1}</span>
                    
                    {/* Step completion status */}
                    {index < currentStep && (
                      <span className="text-xs text-green-400 mt-1">{t('stepCompleted')}</span>
                    )}
                    {index === currentStep && (
                      <span className="text-xs text-blue-400 mt-1">{t('stepInProgress')}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Form Card with enhanced feedback */}
        <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-all duration-500 hover:border-indigo-500/20 hover:shadow-indigo-500/5 animate-fade-in-up animate-delay-300">
          <div className="card-body p-6 md:p-8">
            {error && (
              <div className="alert alert-error mb-6 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Current step indicator for mobile */}
              <div className="mb-6 text-center md:hidden">
                <span className="text-sm text-white/70">
                  {t('stepIndicator', { current: currentStep + 1, total: steps.length, step: steps[currentStep] })}
                </span>
              </div>
              
              <div key={currentStep} className="animate-fade-in transition-all duration-300 ease-in-out">
                {renderStepContent()}
              </div>
              
              {/* Enhanced Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 gap-4 animate-fade-in animate-delay-500">
                <button 
                  type="button" 
                  className="btn btn-outline text-white hover:bg-white/10 hover:text-white hover:border-white/40 group shadow-sm hover:shadow-md"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                  {t('previous')}
                </button>
                
                {/* Show form progress on mobile */}
                <div className="hidden xs:block text-center">
                  <span className="text-xs text-white/60">{t('percentComplete', { percent: progressPercentage })}</span>
                </div>
                
                {currentStep < steps.length - 1 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary group rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/30 relative overflow-hidden"
                    onClick={goToNextStep}
                    disabled={!canProceed()}
                  >
                    {/* Add subtle pulse effect to encourage progression */}
                    {canProceed() && (
                      <span className="absolute inset-0 bg-white/20 animate-pulse-slow rounded-lg"></span>
                    )}
                    <span className="relative z-10 flex items-center">
                      {t('next')}
                      <ChevronRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className="btn bg-gradient-to-r from-primary to-secondary rounded-lg group hover:shadow-lg hover:shadow-indigo-500/30 transition-all border-0 relative overflow-hidden min-w-[160px] whitespace-nowrap" 
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {/* Add subtle shine effect to final button */}
                    {!isProcessing && (
                      <span className="absolute inset-0 w-1/3 h-full bg-white/20 skew-x-15 transform -translate-x-full animate-shine"></span>
                    )}
                    
                    <span className="relative z-10 flex items-center justify-center">
                      {isProcessing ? (
                        <>
                          <span className="loading loading-spinner loading-sm mr-2"></span>
                          {t('processing')}
                        </>
                      ) : (
                        <>
                          {t('createPool')}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                )}
              </div>
              
              {/* Mobile progress indicator */}
              <div className="flex justify-center mt-4 xs:hidden">
                <span className="text-xs text-white/60">{t('percentComplete', { percent: progressPercentage })}</span>
              </div>
              
              {/* Add step-specific help text */}
              <div className="mt-6 text-center">
                <span className="text-xs text-white/50">
                  {currentStep === 0 && t('helpText.step1')}
                  {currentStep === 1 && t('helpText.step2')}
                  {currentStep === 2 && t('helpText.step3')}
                  {currentStep === 3 && t('helpText.step4')}
                  {currentStep === 4 && t('helpText.step5')}
                </span>
              </div>
            </form>
          </div>
        </div>
        
        {/* Enhanced Information Card - Shown only on the first step */}
        {currentStep === 0 && (
          <div className="mt-8 card bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl border border-blue-500/20 shadow-xl p-6 transform transition-all hover:border-blue-500/40 hover:shadow-blue-500/10 animate-fade-in-up animate-delay-500">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  {t('infoCard.title')}
                  <span className="ml-2 text-xs bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full">
                    {t('infoCard.quickGuide')}
                  </span>
                </h3>
                <p className="text-white/70 text-sm">
                  {t('infoCard.description')}
                </p>
                
                {/* Steps visualization to help users understand the flow */}
                <div className="mt-4 flex items-center justify-between text-xs text-white/80 max-w-md">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">1</div>
                    <span>{t('infoCard.flowSteps.step1')}</span>
                  </div>
                  <div className="h-0.5 bg-blue-500/20 flex-1 mx-1"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">2</div>
                    <span>{t('infoCard.flowSteps.step2')}</span>
                  </div>
                  <div className="h-0.5 bg-blue-500/20 flex-1 mx-1"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">3</div>
                    <span>{t('infoCard.flowSteps.step3')}</span>
                  </div>
                  <div className="h-0.5 bg-blue-500/20 flex-1 mx-1"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">4</div>
                    <span>{t('infoCard.flowSteps.step4')}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="badge badge-info gap-1 transform hover:scale-105 transition-transform cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {t('infoCard.badges.engagementBoost')}
                  </div>
                  <div className="badge badge-success gap-1 transform hover:scale-105 transition-transform cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {t('infoCard.badges.fairSelection')}
                  </div>
                  <div className="badge badge-warning gap-1 transform hover:scale-105 transition-transform cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('infoCard.badges.timeBased')}
                  </div>
                  <div className="badge badge-secondary gap-1 transform hover:scale-105 transition-transform cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {t('infoCard.badges.addPrizes')}
                  </div>
                </div>
                
                {/* New Feature Highlight with better visual hierarchy */}
                <div className="mt-5 flex items-center p-3 bg-blue-600/20 rounded-lg border border-blue-500/30 group hover:bg-blue-600/30 hover:scale-[1.01] transition-all cursor-pointer">
                  <div className="bg-blue-500/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300 group-hover:text-blue-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-blue-100">{t('infoCard.newFeature.title')}</h4>
                      <span className="ml-2 bg-blue-500/40 text-blue-200 text-xs px-1.5 py-0.5 rounded-full">{t('infoCard.newFeature.badge')}</span>
                    </div>
                    <p className="text-xs text-blue-200/70">{t('infoCard.newFeature.description')}</p>
                    <p className="text-xs text-blue-300 mt-1 underline underline-offset-2">{t('infoCard.newFeature.learnMore')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Add contextual help based on current step */}
        {currentStep === 2 && (
          <div className="mt-8 card bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 backdrop-blur-xl border border-purple-500/20 shadow-xl p-6 hover:border-purple-500/40 transition-all animate-fade-in-up">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('prizeIdeas.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-white/5 p-3 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all">
                <h4 className="font-medium text-purple-300 mb-1">{t('prizeIdeas.categories.digital.title')}</h4>
                <p className="text-white/70">{t('prizeIdeas.categories.digital.description')}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all">
                <h4 className="font-medium text-purple-300 mb-1">{t('prizeIdeas.categories.community.title')}</h4>
                <p className="text-white/70">{t('prizeIdeas.categories.community.description')}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all">
                <h4 className="font-medium text-purple-300 mb-1">{t('prizeIdeas.categories.experience.title')}</h4>
                <p className="text-white/70">{t('prizeIdeas.categories.experience.description')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add keyboard shortcut helper */}
      <div className="fixed bottom-4 right-4 text-xs text-white/50 bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
        <div className="flex items-center gap-2">
          <span>{t('keyboardShortcuts.title')}</span>
          <div className="flex items-center gap-1">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded">Tab</kbd>
            <span>{t('keyboardShortcuts.nextField')}</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded">Alt</kbd>
            <span>+</span>
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded">N</kbd>
            <span>{t('keyboardShortcuts.nextStep')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}