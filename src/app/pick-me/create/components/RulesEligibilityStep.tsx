import React from 'react';
import { PickMeFormData } from '../types';

interface RulesEligibilityStepProps {
  formData: Pick<PickMeFormData, 'limitParticipants' | 'maxParticipants' | 'subscribersOnly' | 'numWinners' | 'numBackupWinners'>;
  updateForm: (data: Partial<PickMeFormData>) => void;
}

const RulesEligibilityStep: React.FC<RulesEligibilityStepProps> = ({ formData, updateForm }) => {
  const { limitParticipants, maxParticipants, subscribersOnly, numWinners, numBackupWinners } = formData;

  return (
    <div className="space-y-6">
      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-3">
          <input 
            type="checkbox" 
            className="toggle toggle-info" 
            checked={limitParticipants}
            onChange={(e) => updateForm({ limitParticipants: e.target.checked })}
          />
          <span className="label-text text-white/90">Limit Maximum Participants</span>
        </label>
        
        {limitParticipants && (
          <div className="mt-3 pl-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white/90">Maximum Participants</span>
              </label>
              <div className="flex space-x-2 items-center">
                <input 
                  type="range" 
                  min="5" 
                  max="1000" 
                  step="5"
                  className="range range-primary flex-1" 
                  value={maxParticipants}
                  onChange={(e) => updateForm({ maxParticipants: parseInt(e.target.value) })}
                />
                <div className="relative">
                  <input 
                    type="number" 
                    className="input input-bordered bg-white/10 text-white w-24" 
                    min="1"
                    value={maxParticipants}
                    onChange={(e) => updateForm({ maxParticipants: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <span className="label-text-alt text-white/60 mt-1">The pool will automatically close once this many people join</span>
            </div>
          </div>
        )}
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-3">
          <input 
            type="checkbox" 
            className="toggle toggle-info" 
            checked={subscribersOnly}
            onChange={(e) => updateForm({ subscribersOnly: e.target.checked })}
          />
          <span className="label-text text-white/90">Subscribers Only</span>
        </label>
        <span className="label-text-alt text-white/60 mt-1 ml-10">Limit participation to subscribers only</span>
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white/90">Number of Winners*</span>
        </label>
        <div className="flex space-x-2 items-center">
          <input 
            type="range" 
            min="1" 
            max="10" 
            className="range range-secondary flex-1" 
            value={numWinners}
            onChange={(e) => updateForm({ numWinners: parseInt(e.target.value) })}
          />
          <span className="bg-indigo-900/60 rounded-md px-2 py-1 text-white min-w-[3rem] text-center">
            {numWinners}
          </span>
        </div>
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white/90">Number of Backup Winners</span>
        </label>
        <div className="flex space-x-2 items-center">
          <input 
            type="range" 
            min="0" 
            max="10" 
            className="range range-secondary flex-1" 
            value={numBackupWinners}
            onChange={(e) => updateForm({ numBackupWinners: parseInt(e.target.value) })}
          />
          <span className="bg-indigo-900/60 rounded-md px-2 py-1 text-white min-w-[3rem] text-center">
            {numBackupWinners}
          </span>
        </div>
        <span className="label-text-alt text-white/60 mt-1">Backup winners in case primary winners are unavailable</span>
      </div>
    </div>
  );
};

export default RulesEligibilityStep;