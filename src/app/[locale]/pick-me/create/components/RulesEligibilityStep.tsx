import React, { useState, useEffect } from 'react';
import { PickMeFormData } from '../types';
import { useTranslations } from 'next-intl';

interface RulesEligibilityStepProps {
  formData: PickMeFormData;
  updateForm: (data: Partial<PickMeFormData>) => void;
  validationErrors?: Record<string, boolean>;
}

const RulesEligibilityStep: React.FC<RulesEligibilityStepProps> = ({ formData, updateForm, validationErrors = {} }) => {
  const t = useTranslations('pickMe.create.rulesEligibility');
  
  const [maxParticipantsTouched, setMaxParticipantsTouched] = useState<boolean>(false);
  
  // Mark fields as touched if there are validation errors
  useEffect(() => {
    if (validationErrors.maxParticipants) {
      setMaxParticipantsTouched(true);
    }
  }, [validationErrors]);
  
  const handleToggleLimitParticipants = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ limitParticipants: e.target.checked });
  };
  
  const handleMaxParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ maxParticipants: parseInt(e.target.value) || 1 });
    setMaxParticipantsTouched(true);
  };
  
  const handleToggleSubscribersOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ subscribersOnly: e.target.checked });
  };
  
  const isMaxParticipantsValid = !formData.limitParticipants || (formData.maxParticipants && formData.maxParticipants > 0);
  const showMaxParticipantsError = (maxParticipantsTouched || validationErrors.maxParticipants) && !isMaxParticipantsValid;
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">{t('title')}</h3>
      
      <div className="form-control w-full">
        <div className="alert bg-white/5 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-white">{t('helpTitle')}</h3>
            <div className="text-sm text-white/70 mt-1">{t('helpText')}</div>
          </div>
        </div>
      </div>
      
      <div className="form-control w-full">
        <label className="cursor-pointer label justify-start p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden flex items-start">
          <input 
            type="checkbox" 
            className="toggle toggle-primary mr-2 sm:mr-4 flex-shrink-0 mt-1" 
            checked={formData.limitParticipants}
            onChange={handleToggleLimitParticipants}
          />
          <div className="flex-1 min-w-0">
            <div className="label-text text-white font-medium break-words">{t('limitParticipants.title')}</div>
            <div className="label-text text-white/60 text-sm w-full break-words whitespace-normal">{t('limitParticipants.description')}</div>
          </div>
        </label>
        
        {formData.limitParticipants && (
          <div className="mt-3 ml-2 sm:ml-4">
            <label className="label">
              <span className="label-text text-white/80">{t('limitParticipants.maxCount')}</span>
            </label>
            <input 
              type="number" 
              className={`input input-bordered w-full max-w-xs bg-white/5 text-white focus:bg-white/10 mx-1 validator ${
                showMaxParticipantsError ? 'input-error' : ''
              }`}
              value={formData.maxParticipants}
              onChange={handleMaxParticipantsChange}
              onBlur={() => setMaxParticipantsTouched(true)}
              min={1}
              max={10000}
            />
            <label className="label">
              <span className="label-text-alt text-white/60 whitespace-normal break-words break-words whitespace-normal">{t('limitParticipants.maxHelp')}</span>
              {showMaxParticipantsError && (
                <span className="validator-hint text-error">{t('limitParticipants.maxRequired')}</span>
              )}
            </label>
          </div>
        )}
      </div>
      
      <div className="form-control w-full mt-6">
        <label className="cursor-pointer label justify-start p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden flex items-start">
          <input 
            type="checkbox" 
            className="toggle toggle-primary mr-2 sm:mr-4 flex-shrink-0 mt-1" 
            checked={formData.subscribersOnly}
            onChange={handleToggleSubscribersOnly}
          />
          <div className="flex-1 min-w-0">
            <div className="label-text text-white font-medium break-words">{t('subscribersOnly.title')}</div>
            <div className="label-text text-white/60 text-sm w-full break-words whitespace-normal">{t('subscribersOnly.description')}</div>
          </div>
        </label>
      </div>
      
      <div className="mt-8 p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg">
        <h4 className="text-white font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          {t('advancedNote.title')}
        </h4>
        <p className="text-white/70 text-sm mt-2">{t('advancedNote.description')}</p>
      </div>
    </div>
  );
};

export default RulesEligibilityStep;