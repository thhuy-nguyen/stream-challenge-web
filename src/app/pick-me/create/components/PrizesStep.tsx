import React, { useState } from 'react';
import { PickMeFormData, Prize, PrizeType } from '../types';
import { TrashIcon, PlusIcon } from '../../../components/icons';

interface PrizesStepProps {
  formData: Pick<PickMeFormData, 'prizes'>;
  updatePrizes: (prizes: Prize[]) => void;
}

const PrizesStep: React.FC<PrizesStepProps> = ({ formData, updatePrizes }) => {
  const { prizes } = formData;
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState<number | null>(null);

  const addPrize = () => {
    const newPrize: Prize = { type: 'text', description: '' };
    updatePrizes([...prizes, newPrize]);
  };
  
  const removePrize = (index: number) => {
    const updatedPrizes = [...prizes];
    updatedPrizes.splice(index, 1);
    updatePrizes(updatedPrizes);
  };
  
  const updatePrize = (index: number, field: keyof Prize, value: string) => {
    const updatedPrizes = [...prizes];
    updatedPrizes[index] = { ...updatedPrizes[index], [field]: value };
    updatePrizes(updatedPrizes);
  };
  
  const updatePrizeType = (index: number, type: PrizeType) => {
    const updatedPrizes = [...prizes];
    updatedPrizes[index] = { ...updatedPrizes[index], type };
    updatePrizes(updatedPrizes);
  };
  
  // Handle drag and drop reordering
  const handleDragStart = (index: number) => {
    setDragItem(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (dragItem === null || dragItem === index) return;
    
    const newPrizes = [...prizes];
    const draggedItem = newPrizes[dragItem];
    
    // Remove the dragged item
    newPrizes.splice(dragItem, 1);
    // Insert at the new position
    newPrizes.splice(index, 0, draggedItem);
    
    updatePrizes(newPrizes);
    setDragItem(index);
  };

  // Return highlighted text indicating type of prize for preview
  const getPrizeTypeIndicator = (type: PrizeType) => {
    switch (type) {
      case 'text':
        return <span className="badge badge-accent">Text Description</span>;
      case 'image':
        return <span className="badge badge-info">Image Prize</span>;
      case 'link':
        return <span className="badge badge-secondary">Link Prize</span>;
      default:
        return null;
    }
  };

  // Prize preview modal
  const renderPrizePreview = (prize: Prize, index: number) => {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowPreview(null)}>
        <div className="bg-gradient-to-br from-gray-800 to-indigo-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-indigo-500/30" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-yellow-400">🏆</span> Prize Preview
            </h3>
            <button 
              className="btn btn-sm btn-circle btn-ghost text-white/70 hover:bg-white/10" 
              onClick={() => setShowPreview(null)}
            >
              ✕
            </button>
          </div>
          
          <div className="bg-white/10 rounded-xl p-5 mb-4 border border-white/20">
            {getPrizeTypeIndicator(prize.type)}
            
            <h4 className="text-lg font-medium text-white mt-3">{prize.description || "Prize Description"}</h4>
            
            {prize.type === 'image' && prize.imageUrl && (
              <div className="mt-4">
                <img 
                  src={prize.imageUrl} 
                  alt={prize.description} 
                  className="rounded-lg max-h-56 mx-auto object-contain border border-white/10 shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Preview';
                  }}
                />
                <p className="text-xs text-center text-white/60 mt-2">Prize Image</p>
              </div>
            )}
            
            {prize.type === 'link' && prize.linkUrl && (
              <div className="mt-4 flex items-center justify-center">
                <a 
                  href={prize.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Prize Link
                </a>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-white/70 text-sm">This is how your prize will appear to participants.</p>
            <div className="flex justify-center gap-3 mt-4">
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => setShowPreview(null)}
              >
                Looks Good
              </button>
              <button 
                className="btn btn-sm btn-ghost text-white/70"
                onClick={() => {
                  setShowPreview(null);
                  // Focus on description field after closing
                  setTimeout(() => {
                    const element = document.getElementById(`prize-description-${index}`);
                    if (element) element.focus();
                  }, 100);
                }}
              >
                Edit Prize
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Add Prizes</h3>
        <div className="text-sm text-white/70">
          {prizes.length} {prizes.length === 1 ? 'Prize' : 'Prizes'} Added
        </div>
      </div>
      
      <p className="text-white/80 mb-2">Add prizes that will be awarded to the winners of this pool. Drag to reorder priority.</p>
      
      <div className="bg-white/5 p-3 rounded-lg mb-6 border border-indigo-500/20">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Prize #1 will be awarded to the first winner, #2 to the second, and so on.</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {prizes.map((prize, index) => (
          <div 
            key={index} 
            className={`bg-white/5 rounded-lg border ${dragItem === index ? 'border-indigo-400' : 'border-white/10'} hover:border-indigo-500/30 transition-all shadow-md transform hover:-translate-y-1 hover:shadow-lg duration-300 overflow-hidden draggable-prize`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={() => setDragItem(null)}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-indigo-600/30 text-white rounded-full cursor-move">
                    {index + 1}
                  </div>
                  <span className="text-indigo-300">
                    {index === 0 ? 'First Prize' : index === 1 ? 'Second Prize' : index === 2 ? 'Third Prize' : `Prize #${index + 1}`}
                  </span>
                  {getPrizeTypeIndicator(prize.type)}
                </h4>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    className="btn btn-ghost btn-xs text-white/70 hover:text-white/90"
                    onClick={() => setShowPreview(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {prizes.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-ghost btn-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => removePrize(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="form-control sm:col-span-1">
                  <label className="label">
                    <span className="label-text text-white/90">Prize Type</span>
                  </label>
                  <select 
                    className="select select-bordered bg-white/10 text-white w-full" 
                    value={prize.type}
                    onChange={(e) => updatePrizeType(index, e.target.value as PrizeType)}
                  >
                    <option value="text">Text Description</option>
                    <option value="image">Image</option>
                    <option value="link">Link</option>
                  </select>
                </div>
                
                <div className="form-control sm:col-span-2">
                  <label className="label">
                    <span className="label-text text-white/90">Prize Description*</span>
                  </label>
                  <textarea 
                    id={`prize-description-${index}`}
                    className="textarea textarea-bordered bg-white/10 text-white" 
                    placeholder="Describe the prize"
                    value={prize.description}
                    onChange={(e) => updatePrize(index, 'description', e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              {/* Prize specific fields */}
              <div className="mt-4 animate-fade-in">
                {prize.type === 'image' && (
                  <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-white/90">Image URL</span>
                      </label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          className="input input-bordered bg-white/10 text-white flex-1" 
                          placeholder="https://example.com/image.jpg"
                          value={prize.imageUrl || ''}
                          onChange={(e) => updatePrize(index, 'imageUrl', e.target.value)}
                        />
                        {prize.imageUrl && (
                          <div className="w-12 h-12 rounded bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                            <img 
                              src={prize.imageUrl} 
                              alt="Preview" 
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error';
                              }} 
                            />
                          </div>
                        )}
                      </div>
                      <span className="label-text-alt text-white/60 mt-1">Add an image to make your prize more appealing</span>
                    </div>
                  </div>
                )}
                
                {prize.type === 'link' && (
                  <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-white/90">Link URL</span>
                      </label>
                      <input 
                        type="url" 
                        className="input input-bordered bg-white/10 text-white" 
                        placeholder="https://example.com"
                        value={prize.linkUrl || ''}
                        onChange={(e) => updatePrize(index, 'linkUrl', e.target.value)}
                      />
                      <span className="label-text-alt text-white/60 mt-1">Include a link to additional information or redemption</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Show a border based on prize type */}
            <div className={`h-1 w-full ${
              prize.type === 'text' ? 'bg-accent' : 
              prize.type === 'image' ? 'bg-info' : 
              'bg-secondary'
            }`}></div>
          </div>
        ))}
      </div>
      
      <button 
        type="button" 
        className="btn bg-gradient-to-r from-indigo-600/30 to-blue-600/30 hover:from-indigo-600/50 hover:to-blue-600/50 border-0 w-full justify-center text-white group transition-all duration-300 hover:shadow-md mt-6"
        onClick={addPrize}
      >
        <div className="bg-white/10 rounded-full p-1 mr-2 group-hover:bg-white/20 transition-colors">
          <PlusIcon className="h-4 w-4" />
        </div>
        Add Another Prize
      </button>
      
      {/* Prize template suggestions */}
      {prizes.length < 3 && (
        <div className="mt-8 bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
          <h4 className="font-medium text-white mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Quick Prize Templates
          </h4>
          <p className="text-white/70 text-sm mb-3">Need ideas? Add these popular prize templates with one click:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              type="button"
              className="text-left bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 hover:border-indigo-500/30 transition-all"
              onClick={() => {
                const newPrize: Prize = { 
                  type: 'text', 
                  description: 'Digital Game Key - Winner chooses from available selection' 
                };
                updatePrizes([...prizes, newPrize]);
              }}
            >
              <h5 className="font-medium text-indigo-300 text-sm">Digital Game Key</h5>
              <p className="text-white/60 text-xs">Winner's choice from selection</p>
            </button>
            
            <button 
              type="button"
              className="text-left bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 hover:border-indigo-500/30 transition-all"
              onClick={() => {
                const newPrize: Prize = { 
                  type: 'text', 
                  description: 'One Month Subscription Gift - Platform of choice' 
                };
                updatePrizes([...prizes, newPrize]);
              }}
            >
              <h5 className="font-medium text-indigo-300 text-sm">Subscription Gift</h5>
              <p className="text-white/60 text-xs">One month subscription</p>
            </button>
            
            <button 
              type="button"
              className="text-left bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 hover:border-indigo-500/30 transition-all"
              onClick={() => {
                const newPrize: Prize = { 
                  type: 'text', 
                  description: 'Gaming Session - Play together with the host for 1 hour' 
                };
                updatePrizes([...prizes, newPrize]);
              }}
            >
              <h5 className="font-medium text-indigo-300 text-sm">Gaming Session</h5>
              <p className="text-white/60 text-xs">Play together with host</p>
            </button>
          </div>
        </div>
      )}
      
      {/* Show preview modal */}
      {showPreview !== null && prizes[showPreview] && renderPrizePreview(prizes[showPreview], showPreview)}
      
      {/* Help text */}
      <div className="text-center mt-8">
        <p className="text-white/50 text-xs">
          Tip: You can add as many prizes as you need for multiple winners.
        </p>
      </div>
    </div>
  );
};

export default PrizesStep;