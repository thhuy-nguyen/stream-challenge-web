import React from 'react';
import { PickMeFormData, Prize } from '../types';
import { CheckIcon, ClockIcon } from '../../../components/icons';

interface ReviewStepProps {
  formData: PickMeFormData;
  isProcessing: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, isProcessing }) => {
  const { 
    title, description, entryDuration, limitParticipants, maxParticipants, 
    subscribersOnly, numWinners, numBackupWinners, prizes, notificationEnabled,
    autoPublishResults, requireVerification, privatePool
  } = formData;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Review Your Pick Me Pool</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white/80 text-sm font-medium mb-2">Basic Information</h4>
            <p className="text-white text-lg font-semibold">{title}</p>
            <p className="text-white/70 mt-2">{description || 'No description provided'}</p>
            <div className="flex items-center mt-3">
              <ClockIcon className="text-blue-400 mr-2" />
              <span className="text-white/80">Duration: {entryDuration} minutes</span>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white/80 text-sm font-medium mb-2">Eligibility</h4>
            
            <div className="flex items-center mt-2">
              <CheckIcon className="text-green-400 mr-2" />
              <span className="text-white/80">
                {limitParticipants ? `Limited to ${maxParticipants} participants` : 'Unlimited participants'}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <CheckIcon className="text-green-400 mr-2" />
              <span className="text-white/80">
                {subscribersOnly ? 'Subscribers only' : 'Open to everyone'}
              </span>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white/80 text-sm font-medium mb-2">Winners</h4>
            <div className="flex items-center">
              <CheckIcon className="text-yellow-400 mr-2" />
              <span className="text-white/80">
                {numWinners} {numWinners === 1 ? 'winner' : 'winners'} will be selected
              </span>
            </div>
            <div className="flex items-center mt-2">
              <CheckIcon className="text-yellow-400 mr-2" />
              <span className="text-white/80">
                {numBackupWinners} backup {numBackupWinners === 1 ? 'winner' : 'winners'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white/80 text-sm font-medium mb-2">Prizes</h4>
            {prizes.filter(p => p.description.trim() !== '').length > 0 ? (
              <ul className="space-y-2">
                {prizes.filter(p => p.description.trim() !== '').map((prize, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 font-bold mr-2">#{index + 1}</span>
                    <div>
                      <p className="text-white/90">{prize.description}</p>
                      {prize.type === 'link' && prize.linkUrl && (
                        <p className="text-blue-400 text-sm mt-1 truncate">
                          {prize.linkUrl}
                        </p>
                      )}
                      {prize.type === 'image' && prize.imageUrl && (
                        <p className="text-blue-400 text-sm mt-1 truncate">
                          Image: {prize.imageUrl}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-yellow-400">No prizes defined yet</p>
            )}
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white/80 text-sm font-medium mb-2">Additional Settings</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${notificationEnabled ? 'text-green-400' : 'text-red-400'} mr-2`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d={notificationEnabled ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Notifications: {notificationEnabled ? 'Enabled' : 'Disabled'}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${autoPublishResults ? 'text-green-400' : 'text-red-400'} mr-2`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d={autoPublishResults ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Auto-publish results: {autoPublishResults ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${requireVerification ? 'text-green-400' : 'text-red-400'} mr-2`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d={requireVerification ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Require winner verification: {requireVerification ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${privatePool ? 'text-green-400' : 'text-red-400'} mr-2`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d={privatePool ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Secure access: {privatePool ? 'Private link' : 'Public URL'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Note about creation */}
      <div className="alert alert-info mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold">Ready to create?</h3>
          <div className="text-xs">After creation, you'll be redirected to the pool management page where you can share your pool with participants.</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;