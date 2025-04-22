import React, { useState, useEffect } from 'react';
import { PickMeFormData } from '../types';
import { useTranslations } from 'next-intl';

interface BasicInfoStepProps {
  formData: PickMeFormData;
  updateForm: (data: Partial<PickMeFormData>) => void;
  validationErrors?: Record<string, boolean>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, updateForm, validationErrors = {} }) => {
  const t = useTranslations('pickMe.create.basicInfo');
  
  const [titleLength, setTitleLength] = useState<number>(formData.title.length);
  const [descriptionLength, setDescriptionLength] = useState<number>(formData.description?.length || 0);
  const [titleTouched, setTitleTouched] = useState<boolean>(false);
  
  // Mark title as touched if there's a validation error
  useEffect(() => {
    if (validationErrors.title) {
      setTitleTouched(true);
    }
  }, [validationErrors]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ title: e.target.value });
    setTitleLength(e.target.value.length);
    setTitleTouched(true);
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateForm({ description: e.target.value });
    setDescriptionLength(e.target.value.length);
  };
  
  const handleEntryDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateForm({ entryDuration: parseInt(e.target.value) });
  };
  
  const isTitleValid = formData.title.trim().length > 0;
  const showTitleError = (titleTouched || validationErrors.title) && !isTitleValid;
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">{t('title')}</h3>
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-white/80">
            {t('poolName')} <span className="text-error">*</span>
          </span>
          <span className="label-text-alt text-white/60 whitespace-normal break-words">{titleLength}/60</span>
        </label>
        <input 
          type="text" 
          placeholder={t('poolNamePlaceholder')}
          className={`input input-bordered w-full bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10 validator ${
            showTitleError ? 'input-error' : ''
          }`}
          value={formData.title}
          onChange={handleTitleChange}
          onBlur={() => setTitleTouched(true)}
          maxLength={60}
          required
        />
        <label className="label">
          <span className="label-text-alt text-white/60 whitespace-normal break-words">{t('poolNameHelp')}</span>
          {showTitleError && (
            <span className="validator-hint text-error">{t('poolNameRequired')}</span>
          )}
        </label>
      </div>
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-white/80">{t('description')}</span>
          <span className="label-text-alt text-white/60 whitespace-normal break-words">{descriptionLength}/200</span>
        </label>
        <textarea 
          className="textarea textarea-bordered w-full bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10 min-h-24"
          placeholder={t('descriptionPlaceholder')}
          value={formData.description || ''}
          onChange={handleDescriptionChange}
          maxLength={200}
        />
        <label className="label">
          <span className="label-text-alt text-white/60 whitespace-normal break-words">{t('descriptionHelp')}</span>
        </label>
      </div>
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-white/80">{t('entryDuration')}</span>
        </label>
        <select 
          className="select select-bordered w-full bg-white/5 text-white focus:bg-white/10"
          value={formData.entryDuration}
          onChange={handleEntryDurationChange}
        >
          <option value="1">{t('duration.1min')}</option>
          <option value="5">{t('duration.5min')}</option>
          <option value="10">{t('duration.10min')}</option>
          <option value="15">{t('duration.15min')}</option>
          <option value="30">{t('duration.30min')}</option>
          <option value="60">{t('duration.1hour')}</option>
          <option value="120">{t('duration.2hours')}</option>
          <option value="240">{t('duration.4hours')}</option>
          <option value="480">{t('duration.8hours')}</option>
          <option value="1440">{t('duration.1day')}</option>
        </select>
        <label className="label">
          <span className="label-text-alt text-white/60 whitespace-normal break-words">{t('durationHelp')}</span>
        </label>
      </div>
      
      <div className="alert alert-info bg-info/20 border-info/40 text-info-content mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold text-white">{t('tip.title')}</h3>
          <div className="text-xs text-white">{t('tip.description')}</div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;