'use client';

import { useState } from 'react';
import { useAuth } from '@/utils/hooks/useAuth';
import Link from 'next/link';

export default function Profile() {
  const { user, isLoading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '');
  const [bio, setBio] = useState(user?.user_metadata?.bio || '');
  const [updateStatus, setUpdateStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-purple-400"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          bio,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      setUpdateStatus({
        type: 'success',
        message: 'Profile updated successfully',
      });
      
      setIsEditing(false);
    } catch (error: any) {
      setUpdateStatus({
        type: 'error',
        message: error.message || 'An error occurred while updating your profile',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-white">Stream Challenge</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-white/70 hover:text-white transition">Dashboard</Link>
                <Link href="/profile" className="text-white font-medium">Profile</Link>
                <Link href="/settings" className="text-white/70 hover:text-white transition">Settings</Link>
                <Link href="/help" className="text-white/70 hover:text-white transition">Help</Link>
              </nav>
            </div>
            
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Your Profile</h1>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            {updateStatus.message && (
              <div className={`alert ${updateStatus.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
                <div>
                  {updateStatus.type === 'success' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span>{updateStatus.message}</span>
                </div>
              </div>
            )}
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your display name"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white/70 mb-1">Email</h2>
                  <p className="text-white text-lg">{user?.email}</p>
                </div>
                
                <div>
                  <h2 className="text-white/70 mb-1">Display Name</h2>
                  <p className="text-white text-lg">{user?.user_metadata?.display_name || 'Not set'}</p>
                </div>
                
                <div>
                  <h2 className="text-white/70 mb-1">Bio</h2>
                  <p className="text-white">{user?.user_metadata?.bio || 'No bio provided'}</p>
                </div>
                
                <div>
                  <h2 className="text-white/70 mb-1">Member Since</h2>
                  <p className="text-white">{new Date(user?.created_at || '').toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}