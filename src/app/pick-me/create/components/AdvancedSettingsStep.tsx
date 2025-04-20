import React from 'react';
import { PickMeFormData } from '../types';

interface AdvancedSettingsStepProps {
  formData: Pick<PickMeFormData, 'notificationEnabled' | 'autoPublishResults' | 'requireVerification' | 'privatePool'>;
  updateForm: (data: Partial<PickMeFormData>) => void;
}

const AdvancedSettingsStep: React.FC<AdvancedSettingsStepProps> = ({ formData, updateForm }) => {
  const { notificationEnabled, autoPublishResults, requireVerification, privatePool } = formData;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Notifications & Settings
      </h3>
      
      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-3">
          <input 
            type="checkbox" 
            className="toggle toggle-info" 
            checked={notificationEnabled}
            onChange={(e) => updateForm({ notificationEnabled: e.target.checked })}
          />
          <span className="label-text text-white/90">Enable Notifications</span>
        </label>
        <span className="label-text-alt text-white/60 mt-1 ml-10">Send notifications to winners and participants when the pool closes</span>
      </div>
      
      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-3">
          <input 
            type="checkbox" 
            className="toggle toggle-info" 
            checked={autoPublishResults}
            onChange={(e) => updateForm({ autoPublishResults: e.target.checked })}
          />
          <span className="label-text text-white/90">Auto-Publish Results</span>
        </label>
        <span className="label-text-alt text-white/60 mt-1 ml-10">Automatically publish results when the pool closes</span>
      </div>
      
      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-3">
          <input 
            type="checkbox" 
            className="toggle toggle-info" 
            checked={requireVerification}
            onChange={(e) => updateForm({ requireVerification: e.target.checked })}
          />
          <span className="label-text text-white/90">Require Winner Verification</span>
        </label>
        <span className="label-text-alt text-white/60 mt-1 ml-10">Winners must confirm within a time limit or backup winners will be selected</span>
      </div>
      
      <div className="card bg-blue-900/20 p-4 border border-blue-500/20 rounded-lg mb-4 mt-6">
        <label className="label cursor-pointer justify-start space-x-3">
          <input 
            type="checkbox" 
            className="toggle toggle-primary" 
            checked={privatePool}
            onChange={(e) => updateForm({ privatePool: e.target.checked })}
          />
          <span className="label-text text-white/90">Secure Access with Unique Link</span>
        </label>
        <p className="text-white/60 text-sm mt-2 ml-10">
          When enabled, your pool will only be accessible via a unique, hard-to-guess link. This prevents unauthorized access through URL guessing.
        </p>
        
        {privatePool && (
          <div className="bg-blue-900/30 p-3 rounded-lg mt-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-300 text-sm font-medium">Your pool will be protected</span>
            </div>
            <p className="text-white/60 text-xs mt-2">
              After creation, you'll receive a unique link that you can share with your audience. Only people with this link will be able to participate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSettingsStep;