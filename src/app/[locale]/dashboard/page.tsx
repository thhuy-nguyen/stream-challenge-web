'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const commonT = useTranslations('common');
  const navT = useTranslations('navigation');
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [pools, setPools] = useState([]);
  const [poolsError, setPoolsError] = useState(null);
  
  const supabase = createClient();
  
  useEffect(() => {
    async function loadUserData() {
      setIsLoading(true);
      
      // Get user data
      const { data: { user }, error } = await supabase.auth.getUser();
      
      // If no user or error, redirect to login
      if (error || !user) {
        router.push('/auth/login');
        return;
      }
      
      setUser(user);
      
      // Get user metadata
      const name = user.user_metadata?.display_name || user.email?.split('@')[0];
      setDisplayName(name);
      
      // Fetch the user's Pick Me pools
      const { data: poolsData, error: poolsErr } = await supabase
        .from('pick_me_pools')
        .select(`
          id, 
          title, 
          description, 
          status, 
          end_time,
          created_at
        `)
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });
      
      if (poolsErr) {
        setPoolsError(poolsErr);
      } else {
        setPools(poolsData || []);
      }
      
      setIsLoading(false);
    }
    
    loadUserData();
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-500"></div>
          <p className="mt-4 text-white/70">{commonT('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
      {/* Enhanced Header with glassmorphism */}
      <header className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-indigo-800/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="navbar p-0">
            <div className="navbar-start">
              <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-gradient-to-br from-indigo-900 to-purple-900 rounded-box w-52">
                  <li><Link href="/dashboard" className="text-white font-medium">{navT('dashboard')}</Link></li>
                  <li><Link href="/profile" className="text-white/90">{navT('profile')}</Link></li>
                  <li><Link href="/settings" className="text-white/90">{navT('settings')}</Link></li>
                  <li><Link href="/help" className="text-white/90">{navT('help')}</Link></li>
                </ul>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 rotate-3 hover:rotate-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2 flex flex-col">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">{t('appName')}</span>
                  <span className="text-xs text-white/60 -mt-1">{t('appTagline')}</span>
                </div>
              </div>
              
              <div className="hidden lg:flex ml-10">
                <div className="tabs tabs-boxed bg-white/5 p-1 rounded-xl">
                  <Link href="/dashboard" className="tab tab-md text-white font-medium tab-active bg-white/10">{navT('dashboard')}</Link>
                  <Link href="/profile" className="tab tab-md text-white/70 hover:text-white">{navT('profile')}</Link>
                  <Link href="/settings" className="tab tab-md text-white/70 hover:text-white">{navT('settings')}</Link>
                  <Link href="/help" className="tab tab-md text-white/70 hover:text-white">{navT('help')}</Link>
                </div>
              </div>
            </div>
            
            <div className="navbar-end">
              <div className="flex items-center gap-3">
                <LanguageSwitcher className="w-28" />
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 ring ring-purple-500/30 ring-offset-base-100 ring-offset-1 flex items-center justify-center text-white font-bold">
                      <span className="inline-flex items-center justify-center w-full h-full">
                        {displayName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-gradient-to-br from-indigo-900 to-purple-900 rounded-box w-52">
                    <li className="mb-2 disabled">
                      <a className="text-white font-medium">
                        <div className="flex flex-col items-start">
                          <span>{displayName}</span>
                          <span className="text-xs text-green-400">{t('online')}</span>
                        </div>
                      </a>
                    </li>
                    <div className="divider my-0 h-px bg-white/10"></div>
                    <li><Link href="/profile" className="text-white/90">{t('myProfile')}</Link></li>
                    <li><Link href="/settings" className="text-white/90">{t('accountSettings')}</Link></li>
                    <div className="divider my-0 h-px bg-white/10"></div>
                    <li>
                      <button onClick={handleLogout} className="text-red-400 w-full text-left">
                        {navT('logout')}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome section with stats */}
        <div className="card bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl mb-8">
          <div className="card-body p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">{t('welcomeBack', { name: displayName })}</span>
                  <span className="inline-flex ml-2 animate-pulse">👋</span>
                </h2>
                <p className="text-white/70">{t('readyMessage')}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="badge badge-ghost gap-2 px-4 py-3 bg-indigo-600/30 text-indigo-300 font-semibold">
                  {t('streamerStatus')}: <span className="text-green-400">{t('online')}</span>
                </div>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow mt-8 w-full bg-white/5 backdrop-blur-md text-white">
              <div className="stat">
                <div className="stat-title text-purple-400 text-sm font-medium">{t('stats.totalChallenges')}</div>
                <div className="stat-value text-white text-2xl">28</div>
                <div className="stat-desc text-green-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  {t('stats.challengesIncrease')}
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-title text-blue-400 text-sm font-medium">{t('stats.activeViewers')}</div>
                <div className="stat-value text-white text-2xl">1,254</div>
                <div className="stat-desc text-green-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  {t('stats.viewersIncrease')}
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-title text-pink-400 text-sm font-medium">{t('stats.totalRewards')}</div>
                <div className="stat-value text-white text-2xl">$1,840</div>
                <div className="stat-desc text-green-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  {t('stats.rewardsIncrease')}
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-title text-yellow-400 text-sm font-medium">{t('stats.pickMePools')}</div>
                <div className="stat-value text-white text-2xl">7</div>
                <div className="stat-desc text-white/70 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {t('stats.activePoolsCount')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content with animated cards */}
        <h3 className="text-xl font-bold text-white/80 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {t('dashboardActions')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Challenge Card */}
          <div className="card bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl border border-purple-500/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:translate-y-[-5px] overflow-visible">
            <div className="absolute -top-3 right-3">
              <div className="badge badge-success badge-sm gap-1">{t('popular')}</div>
            </div>
            <div className="card-body">
              <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="card-title text-white group-hover:text-purple-300 transition-colors">{t('actions.createChallenge.title')}</h3>
              <p className="text-white/70 text-sm">{t('actions.createChallenge.description')}</p>
              <div className="card-actions justify-start mt-4">
                <button className="btn btn-primary btn-sm">
                  {t('actions.createChallenge.button')}
                </button>
                <button className="btn btn-ghost btn-sm btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Start Pick Me Card */}
          <div className="card bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:translate-y-[-5px]">
            <div className="card-body">
              <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="card-title text-white group-hover:text-blue-300 transition-colors">{t('actions.startPickMe.title')}</h3>
              <p className="text-white/70 text-sm">{t('actions.startPickMe.description')}</p>
              <div className="card-actions justify-start mt-4">
                <Link href="/pick-me/create" className="btn btn-info btn-sm text-white">
                  {t('actions.startPickMe.button')}
                </Link>
                <button className="btn btn-ghost btn-sm btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Stream Settings Card */}
          <div className="card bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-xl border border-pink-500/20 shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:translate-y-[-5px]">
            <div className="card-body">
              <div className="bg-pink-500/20 p-3 rounded-lg w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="card-title text-white group-hover:text-pink-300 transition-colors">{t('actions.streamSettings.title')}</h3>
              <p className="text-white/70 text-sm">{t('actions.streamSettings.description')}</p>
              <div className="card-actions justify-start mt-4">
                <button className="btn btn-secondary btn-sm">
                  {t('actions.streamSettings.button')}
                </button>
                <button className="btn btn-ghost btn-sm btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* My Pools Section */}
        <div className="card mt-12 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <h3 className="card-title text-white/90 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                {t('myPools.title')}
              </h3>
              <Link href="/pick-me/create" className="btn btn-primary btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {t('myPools.createNew')}
              </Link>
            </div>
            
            {poolsError ? (
              <div className="alert alert-error">
                <p>{t('myPools.loadError')}</p>
              </div>
            ) : pools && pools.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full bg-transparent">
                  <thead>
                    <tr className="text-indigo-300 border-indigo-800/50">
                      <th>{t('myPools.table.name')}</th>
                      <th>{t('myPools.table.status')}</th>
                      <th>{t('myPools.table.endDate')}</th>
                      <th>{t('myPools.table.created')}</th>
                      <th>{t('myPools.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pools.map((pool) => (
                      <tr key={pool.id} className="text-white hover:bg-white/5 border-indigo-800/30">
                        <td className="font-medium">{pool.title}</td>
                        <td>
                          {pool.status === 'active' && (
                            <span className="badge badge-success">{t('myPools.status.active')}</span>
                          )}
                          {pool.status === 'completed' && (
                            <span className="badge badge-info">{t('myPools.status.completed')}</span>
                          )}
                          {pool.status === 'cancelled' && (
                            <span className="badge badge-error">{t('myPools.status.cancelled')}</span>
                          )}
                        </td>
                        <td>{new Date(pool.end_time).toLocaleDateString()}</td>
                        <td>{new Date(pool.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="flex gap-2">
                            <Link 
                              href={`/pick-me/pools/${pool.id}`}
                              className="btn btn-xs btn-primary"
                            >
                              {t('myPools.actions.view')}
                            </Link>
                            {pool.status === 'active' && (
                              <button className="btn btn-xs btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-indigo-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="mt-4 text-white/70">{t('myPools.noPools')}</p>
                <Link href="/pick-me/create" className="btn btn-primary mt-4">
                  {t('myPools.createFirst')}
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick access drawer for mobile */}
        <div className="drawer drawer-end fixed bottom-6 right-6 lg:hidden z-20">
          <input id="quick-menu-drawer" type="checkbox" className="drawer-toggle" /> 
          <div className="drawer-content">
            <label htmlFor="quick-menu-drawer" className="drawer-button btn btn-primary btn-circle shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div> 
          <div className="drawer-side">
            <label htmlFor="quick-menu-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 min-h-full bg-gradient-to-br from-gray-800 to-indigo-900 text-white">
              <li className="menu-title text-white/70">{t('mobileMenu.quickActions')}</li>
              <li><a className="text-white">{t('mobileMenu.newChallenge')}</a></li>
              <li><a className="text-white">{t('mobileMenu.createPickMe')}</a></li>
              <li><a className="text-white">{t('mobileMenu.streamSettings')}</a></li>
              <li className="menu-title mt-4 text-white/70">{t('mobileMenu.navigation')}</li>
              <li><a className="text-white">{navT('dashboard')}</a></li>
              <li><a className="text-white">{navT('profile')}</a></li>
              <li><a className="text-white">{navT('settings')}</a></li>
              <li><a className="text-white">{navT('help')}</a></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}