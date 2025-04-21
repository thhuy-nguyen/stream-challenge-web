import React from 'react';
import { PickMeFormData } from '../types';
import { useTranslations } from 'next-intl';

interface AdvancedSettingsStepProps {
  formData: PickMeFormData;
  updateForm: (data: Partial<PickMeFormData>) => void;
}

const AdvancedSettingsStep: React.FC<AdvancedSettingsStepProps> = ({ formData, updateForm }) => {
  const t = useTranslations('pickMe.create.advancedSettings');
  
  const handleToggleNotification = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ notificationEnabled: e.target.checked });
  };

  const handleToggleAutoPublish = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ autoPublishResults: e.target.checked });
  };

  const handleToggleVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ requireVerification: e.target.checked });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">{t('title')}</h3>
      
      <div className="alert bg-white/5 shadow-lg mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-semibold text-white">{t('helpTitle')}</h3>
          <div className="text-sm text-white/70 mt-1">{t('helpText')}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control w-full">
          <label className="cursor-pointer label justify-start p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden flex items-start">
            <input 
              type="checkbox" 
              className="toggle toggle-primary mr-2 sm:mr-4 flex-shrink-0 mt-1" 
              checked={formData.notificationEnabled}
              onChange={handleToggleNotification}
            />
            <div className="flex-1 min-w-0">
              <div className="label-text text-white font-medium break-words">{t('notifications.title')}</div>
              <div className="label-text text-white/60 text-sm w-full break-words whitespace-normal">{t('notifications.description')}</div>
            </div>
          </label>
        </div>
        
        <div className="form-control w-full">
          <label className="cursor-pointer label justify-start p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden flex items-start">
            <input 
              type="checkbox" 
              className="toggle toggle-primary mr-2 sm:mr-4 flex-shrink-0 mt-1" 
              checked={formData.autoPublishResults}
              onChange={handleToggleAutoPublish}
            />
            <div className="flex-1 min-w-0">
              <div className="label-text text-white font-medium break-words">{t('autoPublish.title')}</div>
              <div className="label-text text-white/60 text-sm w-full break-words whitespace-normal">{t('autoPublish.description')}</div>
            </div>
          </label>
        </div>
        
        <div className="form-control w-full">
          <label className="cursor-pointer label justify-start p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden flex items-start">
            <input 
              type="checkbox" 
              className="toggle toggle-primary mr-2 sm:mr-4 flex-shrink-0 mt-1" 
              checked={formData.requireVerification}
              onChange={handleToggleVerification}
            />
            <div className="flex-1 min-w-0">
              <div className="label-text text-white font-medium break-words">{t('verification.title')}</div>
              <div className="label-text text-white/60 text-sm w-full break-words whitespace-normal">{t('verification.description')}</div>
              {formData.requireVerification && (
                <div className="label-text text-yellow-400 text-xs mt-2 break-words whitespace-normal">{t('verification.warning')}</div>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsStep;