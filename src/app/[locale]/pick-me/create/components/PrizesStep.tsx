import React, { useState } from 'react';
import { PickMeFormData, Prize } from '../types';
import { PlusIcon, TrashIcon } from '@/app/components/icons';
import { useTranslations } from 'next-intl';

interface PrizesStepProps {
  formData: PickMeFormData;
  updatePrizes: (prizes: Prize[]) => void;
}

const PrizesStep: React.FC<PrizesStepProps> = ({ formData, updatePrizes }) => {
  const t = useTranslations('pickMe.create.prizes');
  
  const [winners, setWinners] = useState<number>(formData.numWinners);
  const [backupWinners, setBackupWinners] = useState<number>(formData.numBackupWinners);
  
  // Update the number of winners
  const handleWinnersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, parseInt(e.target.value) || 1));
    setWinners(value);
    updateForm({ numWinners: value });
  };
  
  // Update the number of backup winners
  const handleBackupWinnersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(50, parseInt(e.target.value) || 0));
    setBackupWinners(value);
    updateForm({ numBackupWinners: value });
  };
  
  // Add a new prize
  const addPrize = () => {
    const newPrizes = [...formData.prizes, { type: 'text', description: '' }];
    updatePrizes(newPrizes);
  };
  
  // Remove a prize
  const removePrize = (index: number) => {
    const newPrizes = formData.prizes.filter((_, i) => i !== index);
    updatePrizes(newPrizes);
  };
  
  // Update a prize
  const updatePrize = (index: number, prizeData: Partial<Prize>) => {
    const newPrizes = [...formData.prizes];
    newPrizes[index] = { ...newPrizes[index], ...prizeData };
    updatePrizes(newPrizes);
  };
  
  // Update form data
  const updateForm = (newData: Partial<PickMeFormData>) => {
    // This is just a simple wrapper for fields that aren't prizes
    if (newData.numWinners) {
      // Update prize count if reducing below current prize count
      if (newData.numWinners < formData.prizes.length) {
        updatePrizes(formData.prizes.slice(0, newData.numWinners));
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">{t('title')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white/80">{t('winnerCount')}</span>
          </label>
          <input 
            type="number" 
            className="input input-bordered w-full bg-white/5 text-white focus:bg-white/10"
            value={winners}
            onChange={handleWinnersChange}
            min={1}
            max={100}
          />
          <label className="label">
            <span className="label-text-alt text-white/60 whitespace-normal break-words">{t('winnerHelp')}</span>
          </label>
        </div>
        
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white/80">{t('backupCount')}</span>
          </label>
          <input 
            type="number" 
            className="input input-bordered w-full bg-white/5 text-white focus:bg-white/10"
            value={backupWinners}
            onChange={handleBackupWinnersChange}
            min={0}
            max={50}
          />
          <label className="label">
            <span className="label-text-alt text-white/60 whitespace-normal break-words">{t('backupHelp')}</span>
          </label>
        </div>
      </div>
      
      <div className="divider my-2 text-white/50">{t('prizeSection')}</div>
      
      <div className="alert alert-info mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold">{t('prizeInfo.title')}</h3>
          <div className="text-xs">{t('prizeInfo.description')}</div>
        </div>
      </div>
      
      {/* Prize List */}
      <div className="space-y-4">
        {formData.prizes.map((prize, index) => (
          <div key={index} className="prize-entry p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-500/20 transition-all relative group overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <label className="label py-0">
                <span className="label-text text-white/80 font-medium">{t('prizeLabel', { number: index + 1 })}</span>
              </label>
              <button 
                type="button" 
                className="btn btn-sm btn-ghost btn-circle opacity-80 transition-opacity"
                onClick={() => removePrize(index)}
                aria-label={t('removePrize')}
              >
                <TrashIcon className="h-4 w-4 text-red-400" />
              </button>
            </div>
            
            <div className="form-control w-full">
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <select 
                  className="select select-bordered w-full md:w-1/4 bg-white/5 text-white focus:bg-white/10"
                  value={prize.type}
                  onChange={(e) => updatePrize(index, { type: e.target.value as 'text' | 'link' | 'image' })}
                >
                  <option value="text">{t('prizeTypes.text')}</option>
                  <option value="link">{t('prizeTypes.link')}</option>
                  <option value="image">{t('prizeTypes.image')}</option>
                </select>
                
                <input 
                  type="text" 
                  className="input input-bordered flex-1 bg-white/5 text-white focus:bg-white/10 min-h-10"
                  placeholder={t('prizePlaceholder')}
                  value={prize.description}
                  onChange={(e) => updatePrize(index, { description: e.target.value })}
                  required
                />
              </div>
              
              {prize.type === 'link' && (
                <div className="mt-3">
                  <label className="label">
                    <span className="label-text text-white/80">{t('linkUrl')}</span>
                  </label>
                  <input 
                    type="url" 
                    className="input input-bordered w-full bg-white/5 text-white focus:bg-white/10"
                    placeholder={t('linkPlaceholder')}
                    value={prize.linkUrl || ''}
                    onChange={(e) => updatePrize(index, { linkUrl: e.target.value })}
                  />
                </div>
              )}
              
              {prize.type === 'image' && (
                <div className="mt-3">
                  <label className="label">
                    <span className="label-text text-white/80">{t('imageUrl')}</span>
                  </label>
                  <input 
                    type="url" 
                    className="input input-bordered w-full bg-white/5 text-white focus:bg-white/10"
                    placeholder={t('imagePlaceholder')}
                    value={prize.imageUrl || ''}
                    onChange={(e) => updatePrize(index, { imageUrl: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center">
          <button 
            type="button" 
            className="btn btn-primary btn-sm mt-4 gap-2 hover:gap-3 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/30"
            onClick={addPrize}
          >
            <PlusIcon className="h-4 w-4" />
            <span>{t('addPrize')}</span>
          </button>
        </div>
      </div>
      
      {formData.prizes.length === 0 && (
        <div className="text-center p-6">
          <div className="text-indigo-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-white/60">{t('noPrizes')}</p>
          <button 
            type="button" 
            className="btn btn-primary btn-sm mt-4"
            onClick={addPrize}
          >
            {t('getStarted')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PrizesStep;