import React from 'react';
import { PickMeFormData } from '../types';

interface AdvancedSettingsStepProps {
  formData: Pick<PickMeFormData, 'notificationEnabled' | 'autoPublishResults' | 'requireVerification'>;
  updateForm: (data: Partial<PickMeFormData>) => void;
}

const AdvancedSettingsStep: React.FC<AdvancedSettingsStepProps> = ({ formData, updateForm }) => {
  const { notificationEnabled, autoPublishResults, requireVerification } = formData;

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
    </div>
  );
};

export default AdvancedSettingsStep;