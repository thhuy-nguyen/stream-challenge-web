import React from 'react';
import { PickMeFormData } from '../types';

interface BasicInfoStepProps {
  formData: Pick<PickMeFormData, 'title' | 'description' | 'entryDuration'>;
  updateForm: (data: Partial<PickMeFormData>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, updateForm }) => {
  const { title, description, entryDuration } = formData;

  return (
    <div className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white/90">Pool Title*</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered bg-white/10 text-white" 
          placeholder="e.g., Game Night Co-Player Selection"
          value={title}
          onChange={(e) => updateForm({ title: e.target.value })}
          required
        />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white/90">Description</span>
        </label>
        <textarea 
          className="textarea textarea-bordered bg-white/10 text-white h-24" 
          placeholder="Describe what this pool is for and what participants can expect"
          value={description}
          onChange={(e) => updateForm({ description: e.target.value })}
        ></textarea>
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white/90">Entry Duration (minutes)*</span>
        </label>
        <div className="flex space-x-2 items-center">
          <input 
            type="range" 
            min="1" 
            max="60" 
            className="range range-info flex-1" 
            value={entryDuration}
            onChange={(e) => updateForm({ entryDuration: parseInt(e.target.value) })}
          />
          <span className="bg-indigo-900/60 rounded-md px-2 py-1 text-white min-w-[3rem] text-center">
            {entryDuration}
          </span>
        </div>
        <span className="label-text-alt text-white/60 mt-1">The pool will automatically close and draw winners after this time</span>
      </div>
    </div>
  );
};

export default BasicInfoStep;