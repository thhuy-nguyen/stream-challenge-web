'use client';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/utils/hooks/useToast';
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
// Import icon components
import { 
  ChevronLeftIcon, 
  CopyIcon, 
  LightningIcon, 
  InfoIcon, 
  DocumentIcon, 
  LinkExternalIcon, 
  WarningIcon, 
  CheckCircleIcon, 
  CheckIcon, 
  ClockIcon, 
  TrophyIcon, 
  GiftIcon, 
  UsersIcon, 
  StarIcon
} from '@/app/components/icons';

interface Participant {
  id: string;
  userId: string;
  displayName: string;
  joinedAt: string;
}

interface Winner extends Participant {
  position: number;
  isBackup: boolean;
  verified: boolean;
}

interface Prize {
  id: string;
  type: 'text' | 'image' | 'link';
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  position: number;
}

interface PoolDetail {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'cancelled';
  endTime: string;
  subscribersOnly: boolean;
  maxParticipants: number | null;
  numWinners: number;
  numBackupWinners: number;
  createdAt: string;
  completedAt: string | null;
  participantCount: number;
  isCreator: boolean;
}

export default function PoolDetailPage() {
  const params = useParams();
  const poolId = params.id as string;

  const [pool, setPool] = useState<PoolDetail | null>(null);
  const [winners, setWinners] = useState<{
    primaryWinners: Winner[];
    backupWinners: Winner[];
  } | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);

  const { showToast } = useToast();

  // Calculate remaining time in seconds
  const calculateTimeRemaining = (endTime: string): number => {
    const now = new Date();
    const end = new Date(endTime);
    const diffInSeconds = Math.floor((end.getTime() - now.getTime()) / 1000);

    // If end time has passed, return 0
    return diffInSeconds > 0 ? diffInSeconds : 0;
  };

  // Update time remaining every second
  useEffect(() => {
    if (!pool || pool.status !== 'active') return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pool]);

  // Fetch pool data
  useEffect(() => {
    async function fetchPoolDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pick-me/pools/${poolId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch pool details');
        }

        const data = await response.json();
        setPool(data.pool);
        setParticipants(data.participants || []);
        setPrizes(data.prizes || []);

        // Calculate initial time remaining if pool is active
        if (data.pool.status === 'active') {
          setTimeRemainingSeconds(calculateTimeRemaining(data.pool.endTime));
        }

        // Fetch winners if pool is completed
        if (data.pool.status === 'completed') {
          const winnersResponse = await fetch(`/api/pick-me/pools/${poolId}/draw`);
          if (winnersResponse.ok) {
            const winnersData = await winnersResponse.json();
            setWinners({
              primaryWinners: winnersData.primaryWinners || [],
              backupWinners: winnersData.backupWinners || []
            });
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPoolDetails();
  }, [poolId]);

  // Handle copy share URL
  const handleCopyShareUrl = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        showToast({
          title: "URL Copied!",
          message: "Pool URL has been copied to your clipboard",
          variant: "success"
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        showToast({
          title: "Copy Failed",
          message: "Failed to copy URL to clipboard",
          variant: "error"
        });
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error || !pool) {
    return (
      <div className="min-h-screen bg-base-200 py-8">
        <div className="container mx-auto px-4">
          <div className="alert alert-error shadow-lg">
            <div>
              <WarningIcon className="stroke-current flex-shrink-0 h-6 w-6" />
              <span>{error || 'Pool not found'}</span>
            </div>
            <div className="flex-none">
              <Link href="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Convert seconds to minutes and seconds for display
  const displayMinutes = Math.floor(timeRemainingSeconds / 60);
  const displaySeconds = timeRemainingSeconds % 60;

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Pick Me Pool</h1>
              <div className="mt-1 flex items-center gap-2">
                <div className={`badge badge-lg 
                  ${pool.status === 'active' ? 'badge-success' : 
                    pool.status === 'completed' ? 'badge-info' : 'badge-error'}`}>
                  {pool.status === 'active' ? 'Active' : 
                   pool.status === 'completed' ? 'Completed' : 'Cancelled'}
                </div>
                <span className="text-base-content/70">ID: {pool.id.substring(0, 8)}</span>
              </div>
            </div>

            <Link 
              href="/dashboard" 
              className="btn btn-primary btn-outline gap-2"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Dashboard
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Pool Information Card */}
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title text-2xl">{pool.title}</h2>
                <p className="text-base-content/80">{pool.description}</p>
                
                {/* Share URL feature */}
                <div className="mt-4 join w-full">
                  <input 
                    type="text" 
                    value={window.location.href} 
                    readOnly
                    className="input input-bordered join-item w-full"
                  />
                  <button 
                    onClick={handleCopyShareUrl}
                    className="btn join-item btn-primary"
                    aria-label="Copy share URL"
                  >
                    <CopyIcon className="h-5 w-5" />
                    Copy
                  </button>
                </div>
                
                <div className="divider"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="stat p-2">
                    <div className="stat-title text-sm">Participants</div>
                    <div className="stat-value text-2xl">{participants.length}</div>
                    <div className="stat-desc">{pool.maxParticipants ? `Maximum: ${pool.maxParticipants}` : 'No limit'}</div>
                  </div>
                  
                  <div className="stat p-2">
                    <div className="stat-title text-sm">Winners</div>
                    <div className="stat-value text-2xl">{pool.numWinners}</div>
                    <div className="stat-desc">Backup: {pool.numBackupWinners}</div>
                  </div>
                  
                  <div className="stat p-2">
                    <div className="stat-title text-sm">Created</div>
                    <div className="stat-value text-lg">{new Date(pool.createdAt).toLocaleDateString()}</div>
                    <div className="stat-desc">{new Date(pool.createdAt).toLocaleTimeString()}</div>
                  </div>
                  
                  {pool.completedAt && (
                    <div className="stat p-2">
                      <div className="stat-title text-sm">Completed</div>
                      <div className="stat-value text-lg">{new Date(pool.completedAt).toLocaleDateString()}</div>
                      <div className="stat-desc">{new Date(pool.completedAt).toLocaleTimeString()}</div>
                    </div>
                  )}
                  
                  {pool.subscribersOnly && (
                    <div className="stat p-2">
                      <div className="stat-title text-sm">Eligibility</div>
                      <div className="stat-value text-lg">Restricted</div>
                      <div className="stat-desc">Subscribers only</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Prizes Display */}
            {prizes.length > 0 && (
              <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body">
                  <h3 className="card-title text-xl flex items-center">
                    <DocumentIcon className="h-5 w-5 mr-2 text-warning" />
                    Prizes
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {prizes.map((prize) => (
                      <div key={prize.id} className="card bg-base-200 shadow-lg">
                        <div className="card-body p-4">
                          <h4 className="card-title text-lg flex items-center">
                            {prize.position === 1 ? (
                              <div className="badge badge-warning gap-1 mr-2">
                                <StarIcon className="h-4 w-4" />
                                First Prize
                              </div>
                            ) : (
                              <span className="badge mr-2">#{prize.position}</span>
                            )}
                            {prize.description.slice(0, 20)}{prize.description.length > 20 ? '...' : ''}
                          </h4>
                          
                          <p className="text-base-content/80">{prize.description}</p>
                          
                          {prize.type === 'image' && prize.imageUrl && (
                            <figure className="mt-3">
                              <Image 
                                src={prize.imageUrl} 
                                alt={`Prize ${prize.position}`} 
                                className="rounded-lg max-h-32 object-contain mx-auto" 
                                width={150}
                                height={150}
                              />
                            </figure>
                          )}
                          
                          {prize.type === 'link' && prize.linkUrl && (
                            <div className="card-actions justify-end mt-3">
                              <a 
                                href={prize.linkUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-sm btn-warning"
                              >
                                <LinkExternalIcon className="h-4 w-4 mr-1" />
                                View Prize
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Participants List */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2 text-info" />
                  Participants
                  <span className="badge badge-info ml-2">{participants.length}</span>
                </h3>
                
                {participants.length > 0 ? (
                  <div className="overflow-x-auto mt-4">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Display Name</th>
                          <th>User ID</th>
                          <th>Joined At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((participant) => (
                          <tr key={participant.id}>
                            <td>{participant.displayName}</td>
                            <td className="text-base-content/70 font-mono text-xs">{participant.userId}</td>
                            <td>{new Date(participant.joinedAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert mt-4">
                    <InfoIcon className="stroke-info shrink-0 w-6 h-6" />
                    <span>No participants have joined yet</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Status Display - Right Column */}
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                {pool.status === 'active' && (
                  <>
                    <h3 className="card-title text-xl text-success flex items-center">
                      <LightningIcon className="h-6 w-6 mr-2" />
                      Active Pool
                    </h3>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base-content/80">Ends:</span>
                        <span className="font-semibold">{new Date(pool.endTime).toLocaleString()}</span>
                      </div>
                      
                      {timeRemainingSeconds > 0 ? (
                        <div className="mt-4">
                          <div className="text-base-content/80 mb-2">Time remaining:</div>
                          <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
                            {/* Days - only show if > 0 */}
                            {Math.floor(timeRemainingSeconds / 86400) > 0 && (
                              <div className="flex flex-col">
                                <span className="countdown font-mono text-4xl">
                                  <span style={{ "--value": Math.floor(timeRemainingSeconds / 86400) } as React.CSSProperties}></span>
                                </span>
                                day{Math.floor(timeRemainingSeconds / 86400) !== 1 ? 's' : ''}
                              </div>
                            )}
                            
                            {/* Hours - only show if > 0 */}
                            {Math.floor((timeRemainingSeconds % 86400) / 3600) > 0 && (
                              <div className="flex flex-col">
                                <span className="countdown font-mono text-4xl">
                                  <span style={{ "--value": Math.floor((timeRemainingSeconds % 86400) / 3600) } as React.CSSProperties}></span>
                                </span>
                                hr{Math.floor((timeRemainingSeconds % 86400) / 3600) !== 1 ? 's' : ''}
                              </div>
                            )}
                            
                            {/* Minutes - only show if > 0 */}
                            {Math.floor((timeRemainingSeconds % 3600) / 60) > 0 && (
                              <div className="flex flex-col">
                                <span className="countdown font-mono text-4xl">
                                  <span style={{ "--value": Math.floor((timeRemainingSeconds % 3600) / 60) } as React.CSSProperties}></span>
                                </span>
                                min{Math.floor((timeRemainingSeconds % 3600) / 60) !== 1 ? 's' : ''}
                              </div>
                            )}
                            
                            {/* Seconds - always show */}
                            <div className="flex flex-col">
                              <span className="countdown font-mono text-4xl">
                                <span style={{ "--value": timeRemainingSeconds % 60 } as React.CSSProperties}></span>
                              </span>
                              sec{timeRemainingSeconds % 60 !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="alert alert-warning mt-4">
                          <WarningIcon className="stroke-current shrink-0 h-6 w-6" />
                          <span>Ending soon!</span>
                        </div>
                      )}
                    </div>
                    
                    <progress 
                      className="progress progress-success w-full mt-4" 
                      value={100 - (timeRemainingSeconds / (calculateTimeRemaining(pool.endTime) + (pool.endTime ? (Math.floor((new Date().getTime() - new Date(pool.createdAt).getTime()) / 1000)) : 0))) * 100} 
                      max="100"
                    ></progress>
                  </>
                )}
                
                {pool.status === 'completed' && (
                  <>
                    <h3 className="card-title text-xl text-success flex items-center">
                      <CheckCircleIcon className="h-6 w-6 mr-2" />
                      Draw Complete
                    </h3>
                    
                    <div className="alert alert-success mt-4">
                      <CheckCircleIcon className="stroke-current shrink-0 h-6 w-6" />
                      <span>Winners have been selected successfully!</span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base-content/80">Completed:</span>
                        <span className="font-semibold">{pool.completedAt ? new Date(pool.completedAt).toLocaleString() : 'N/A'}</span>
                      </div>
                    </div>
                  </>
                )}
                
                {pool.status === 'cancelled' && (
                  <>
                    <h3 className="card-title text-xl text-error flex items-center">
                      <WarningIcon className="h-6 w-6 mr-2" />
                      Pool Cancelled
                    </h3>
                    
                    <div className="alert alert-error mt-4">
                      <WarningIcon className="stroke-current shrink-0 h-6 w-6" />
                      <span>This pool has been cancelled</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Winners Display (if completed) */}
            {pool.status === 'completed' && winners && (
              <div className="space-y-6">
                {/* Primary Winners */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl flex items-center">
                      <TrophyIcon className="h-5 w-5 mr-2 text-warning" />
                      Primary Winners
                    </h3>
                    
                    {winners.primaryWinners.length > 0 ? (
                      <div className="mt-4 space-y-3">
                        {winners.primaryWinners.map((winner) => (
                          <div key={winner.id} className="flex items-center p-3 bg-base-200 rounded-lg">
                            <div className="avatar placeholder mr-3">
                              <div className="bg-primary text-primary-content rounded-full w-10">
                                <span>{winner.position}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{winner.displayName}</div>
                              <div className="text-xs opacity-70">{winner.userId.substring(0, 12)}...</div>
                            </div>
                            <div>
                              {winner.verified ? (
                                <div className="badge badge-success gap-1">
                                  <CheckIcon className="h-3 w-3" />
                                  Verified
                                </div>
                              ) : (
                                <div className="badge badge-warning gap-1">
                                  <ClockIcon className="h-3 w-3" />
                                  Pending
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="alert mt-4">
                        <InfoIcon className="stroke-info shrink-0 w-6 h-6" />
                        <span>No primary winners</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Backup Winners */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl flex items-center">
                      <StarIcon className="h-5 w-5 mr-2 text-info" />
                      Backup Winners
                    </h3>
                    
                    {winners.backupWinners.length > 0 ? (
                      <div className="mt-4 space-y-3">
                        {winners.backupWinners.map((winner) => (
                          <div key={winner.id} className="flex items-center p-3 bg-base-200 rounded-lg">
                            <div className="avatar placeholder mr-3">
                              <div className="bg-info text-info-content rounded-full w-10">
                                <span>{winner.position}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{winner.displayName}</div>
                              <div className="text-xs opacity-70">{winner.userId.substring(0, 12)}...</div>
                            </div>
                            <div className="badge badge-info">Backup</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="alert mt-4">
                        <InfoIcon className="stroke-info shrink-0 w-6 h-6" />
                        <span>No backup winners</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}