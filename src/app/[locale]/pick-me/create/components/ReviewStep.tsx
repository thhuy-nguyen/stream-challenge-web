import React from 'react';
import { PickMeFormData } from '../types';
import { useTranslations } from 'next-intl';
import { 
  TrophyIcon, 
  GiftIcon, 
  UsersIcon, 
  ClockIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  GlobeIcon 
} from '@/app/components/icons';

interface ReviewStepProps {
  formData: PickMeFormData;
  isProcessing: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const t = useTranslations('pickMe.create.review');
  
  // Count valid prizes
  const validPrizes = formData.prizes.filter(p => p.description.trim() !== '');

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
        <TrophyIcon className="h-6 w-6 text-indigo-400 mr-2" />
        {t('title')}
      </h3>
      
      <div className="grid grid-cols-1 gap-3 text-sm">
        {/* Essential info in a compact card */}
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <h4 className="font-medium text-white mb-1 flex items-center">
            <UsersIcon className="h-4 w-4 text-blue-400 mr-2" />
            {formData.title}
          </h4>
          {formData.description && <p className="text-white/70 text-xs mb-2 ml-6">{formData.description}</p>}
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="badge badge-primary flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {t('badges.time', { minutes: formData.entryDuration })}
            </span>
            <span className="badge badge-secondary flex items-center gap-1">
              <TrophyIcon className="h-3 w-3" />
              {t('badges.winners', { count: formData.numWinners })}
            </span>
            {formData.numBackupWinners > 0 && (
              <span className="badge badge-ghost flex items-center gap-1">
                <UsersIcon className="h-3 w-3" />
                {t('badges.backup', { count: formData.numBackupWinners })}
              </span>
            )}
            {formData.limitParticipants && (
              <span className="badge badge-warning flex items-center gap-1">
                <UsersIcon className="h-3 w-3" />
                {t('badges.limit', { count: formData.maxParticipants })}
              </span>
            )}
            {formData.subscribersOnly && (
              <span className="badge badge-info flex items-center gap-1">
                <ShieldCheckIcon className="h-3 w-3" />
                {t('badges.subscribers')}
              </span>
            )}
          </div>
        </div>

        {/* Prizes as small chips */}
        {validPrizes.length > 0 && (
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="font-medium text-white/80 text-xs mb-2 flex items-center">
              <GiftIcon className="h-4 w-4 text-yellow-400 mr-2" />
              {t('prizes.title')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {validPrizes.map((prize, index) => (
                <div key={index} className="badge badge-outline gap-1 group hover:badge-warning transition-colors duration-200">
                  <span className="text-yellow-400 group-hover:text-yellow-300">#{index+1}</span>
                  <span className="truncate max-w-[12rem]">{prize.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Settings as a simple list of badges with icons */}
        <div className="flex flex-wrap gap-2">
          {formData.notificationEnabled && (
            <div className="badge badge-success text-xs gap-1">
              <BellIcon className="h-3 w-3" />
              {t('settings.notifications')}
            </div>
          )}
          {formData.autoPublishResults && (
            <div className="badge badge-success text-xs gap-1">
              <GlobeIcon className="h-3 w-3" />
              {t('settings.autoPublish')}
            </div>
          )}
          {formData.requireVerification && (
            <div className="badge badge-success text-xs gap-1">
              <ShieldCheckIcon className="h-3 w-3" />
              {t('settings.verification')}
            </div>
          )}
        </div>
      </div>
      
      {/* Compact note with trophy icon - responsive sizing for mobile */}
      <div className="text-xs text-white/60 mt-2 italic flex items-center">
        <TrophyIcon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-300 mr-2 animate-pulse" />
        {t('note.description')}
      </div>
    </div>
  );
};

export default ReviewStep;