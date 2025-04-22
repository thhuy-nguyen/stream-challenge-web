'use client';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/utils/hooks/useToast';
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-400"></div>
          <p className="mt-4 text-white/70">Loading pool details...</p>
        </div>
      </div>
    );
  }

  if (error || !pool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 py-12">
        <div className="container mx-auto px-6">
          <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
            <p className="text-red-400">{error || 'Pool not found'}</p>
            <div className="mt-6">
              <Link 
                href="/dashboard" 
                className="btn btn-primary"
              >
                Return to Dashboard
              </Link>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Pick Me Pool</h1>
            <p className="text-indigo-300 mt-2">
              {pool.status === 'active' ? 'Active selection pool' : pool.status === 'completed' ? 'Completed selection' : 'Cancelled selection'}
            </p>
          </div>

          <Link 
            href="/dashboard" 
            className="btn btn-outline btn-primary gap-2 text-white hover:bg-primary hover:text-white hover:border-primary transition-all self-start shadow-sm hover:shadow-md hover:shadow-primary/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        
        {/* Pool Information Card */}
        <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-8">
          <div className="card-body p-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{pool.title}</h2>
                <p className="text-white/70 mt-2">{pool.description}</p>
                
                {/* Share URL feature */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={window.location.href} 
                      readOnly
                      className="input input-bordered input-sm w-full bg-indigo-900/30 border-indigo-500/30 text-white pr-10"
                    />
                    <button 
                      onClick={handleCopyShareUrl}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-indigo-100 transition-colors"
                      aria-label="Copy share URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-blue-400">Status</h3>
                    <p className="text-white">
                      {pool.status === 'active' && (
                        <span className="badge badge-success">Active</span>
                      )}
                      {pool.status === 'completed' && (
                        <span className="badge badge-info">Completed</span>
                      )}
                      {pool.status === 'cancelled' && (
                        <span className="badge badge-error">Cancelled</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-400">Participants</h3>
                    <p className="text-white">{participants.length} {pool.maxParticipants ? `/ ${pool.maxParticipants}` : ''}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-400">Winners</h3>
                    <p className="text-white">{pool.numWinners}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-400">Backup Winners</h3>
                    <p className="text-white">{pool.numBackupWinners}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-400">Created</h3>
                    <p className="text-white">{new Date(pool.createdAt).toLocaleString()}</p>
                  </div>
                  {pool.completedAt && (
                    <div>
                      <h3 className="text-sm font-medium text-blue-400">Completed</h3>
                      <p className="text-white">{new Date(pool.completedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Status Display */}
              <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
                {pool.status === 'active' && (
                  <div className="bg-indigo-900/20 rounded-xl p-4 text-center border border-indigo-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white">Active Pool</h3>
                    <div className="text-indigo-300 text-sm mt-1">
                      <p>Ends: {new Date(pool.endTime).toLocaleString()}</p>
                      
                      {timeRemainingSeconds > 0 ? (
                        <div className="mt-3">
                          <p className="text-white/70 mb-1">Time remaining:</p>
                          <div className="flex justify-center gap-2">
                            <div className="flex flex-col">
                              <div className="bg-indigo-800/50 text-yellow-300 font-mono font-bold text-xl rounded-md px-3 py-1 min-w-[3rem]">
                                {displayMinutes.toString().padStart(2, '0')}
                              </div>
                              <span className="text-xs text-indigo-300 mt-1">min</span>
                            </div>
                            <div className="text-yellow-300 font-bold text-2xl self-center pb-1">:</div>
                            <div className="flex flex-col">
                              <div className="bg-indigo-800/50 text-yellow-300 font-mono font-bold text-xl rounded-md px-3 py-1 min-w-[3rem]">
                                {displaySeconds.toString().padStart(2, '0')}
                              </div>
                              <span className="text-xs text-indigo-300 mt-1">sec</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 badge badge-warning gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Ending soon...
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {pool.status === 'completed' && (
                  <div className="bg-green-900/20 rounded-xl p-4 text-center border border-green-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white">Draw Complete</h3>
                    <p className="text-green-300 text-sm mt-1">Winners have been selected</p>
                  </div>
                )}
                
                {pool.status === 'cancelled' && (
                  <div className="bg-red-900/20 rounded-xl p-4 text-center border border-red-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h3 className="text-lg font-medium text-white">Pool Cancelled</h3>
                    <p className="text-red-300 text-sm mt-1">This pool was cancelled</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Prizes Display */}
        {prizes.length > 0 && (
          <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-8">
            <div className="card-body p-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
                Prizes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prizes.map((prize) => (
                  <div key={prize.id} className="card bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-600/20 shadow-lg">
                    <div className="card-body p-4">
                      <h4 className="card-title text-white text-lg flex items-center">
                        {prize.position === 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V2zm4 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 010-2zm1 3a1 1 0 100 2h6a1 1 0 100-2H7zm0 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        Prize #{prize.position}
                      </h4>
                      
                      <p className="text-white/80">{prize.description}</p>
                      
                      {prize.type === 'image' && prize.imageUrl && (
                        <div className="mt-3">
                          <Image 
                            src={prize.imageUrl} 
                            alt={`Prize ${prize.position}`} 
                            className="rounded-lg max-h-40 object-cover mx-auto" 
                            width={200}
                            height={200}
                          />
                        </div>
                      )}
                      
                      {prize.type === 'link' && prize.linkUrl && (
                        <div className="mt-3">
                          <a 
                            href={prize.linkUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-sm btn-outline btn-warning w-full"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
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
        
        {/* Winners Display (if completed) */}
        {pool.status === 'completed' && winners && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary Winners */}
            <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="card-body p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Primary Winners
                </h3>
                
                {winners.primaryWinners.length > 0 ? (
                  <div className="space-y-4">
                    {winners.primaryWinners.map((winner) => (
                      <div key={winner.id} className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-500/20 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                            <span>{winner.position}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{winner.displayName}</h4>
                            <p className="text-white/60 text-xs">User ID: {winner.userId}</p>
                          </div>
                        </div>
                        <div>
                          {winner.verified ? (
                            <span className="badge badge-success gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Verified
                            </span>
                          ) : (
                            <span className="badge badge-warning gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70">No primary winners</p>
                )}
              </div>
            </div>
            
            {/* Backup Winners */}
            <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="card-body p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  Backup Winners
                </h3>
                
                {winners.backupWinners.length > 0 ? (
                  <div className="space-y-4">
                    {winners.backupWinners.map((winner) => (
                      <div key={winner.id} className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                            <span>{winner.position}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{winner.displayName}</h4>
                            <p className="text-white/60 text-xs">User ID: {winner.userId}</p>
                          </div>
                        </div>
                        <div>
                          <span className="badge badge-info gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0l-3 3m3-3l3 3M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                            Backup
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70">No backup winners</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Participants List */}
        <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mt-8">
          <div className="card-body p-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Participants ({participants.length})
            </h3>
            
            {participants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra bg-transparent w-full">
                  <thead>
                    <tr className="text-indigo-300 border-indigo-800/50">
                      <th>User ID</th>
                      <th>Display Name</th>
                      <th>Joined At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant) => (
                      <tr key={participant.id} className="text-white border-indigo-800/30 bg-transparent hover:bg-white/5">
                        <td>{participant.userId}</td>
                        <td>{participant.displayName}</td>
                        <td>{new Date(participant.joinedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/70">No participants have joined yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}