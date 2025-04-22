'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

// Define interface for pool items
interface Pool {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'cancelled';
  end_time: string;
  created_at: string;
}

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const commonT = useTranslations('common');
  const navT = useTranslations('navigation');
  
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  // Fix type error by properly typing the pools state
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoadingPools, setIsLoadingPools] = useState(true);
  const supabase = createClient();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
    
    // Fetch pools created by user
    const fetchPools = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('pick_me_pools')
          .select('*')
          .eq('creator_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setPools(data || []);
      } catch (error) {
        console.error('Error fetching pools:', error);
      } finally {
        setIsLoadingPools(false);
      }
    };

    fetchPools();
  }, [isLoading, router, supabase, user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading || isLoadingPools) {
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
                  <li><Link href="/profile" className="text-white">{navT('profile')}</Link></li>
                  <li><Link href="/settings" className="text-white">{navT('settings')}</Link></li>
                  <li><Link href="/help" className="text-white">{navT('help')}</Link></li>
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
                  <Link href="/profile" className="tab tab-md text-white hover:text-white">{navT('profile')}</Link>
                  <Link href="/settings" className="tab tab-md text-white hover:text-white">{navT('settings')}</Link>
                  <Link href="/help" className="tab tab-md text-white hover:text-white">{navT('help')}</Link>
                </div>
              </div>
            </div>
            
            <div className="navbar-end">
              <div className="flex items-center gap-3">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 ring ring-purple-500/30 ring-offset-base-100 ring-offset-1 flex items-center justify-center text-white font-bold">
                      <span className="inline-flex items-center justify-center w-full h-full">
                        {user?.user_metadata?.display_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-gradient-to-br from-indigo-900 to-purple-900 rounded-box w-52">
                    <li className="mb-2 disabled">
                      <a className="text-white font-medium">
                        <div className="flex flex-col items-start">
                          <span>{user?.user_metadata?.display_name || user?.email?.split('@')[0]}</span>
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
        {/* Welcome section */}
        <div className="card bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl mb-8">
          <div className="card-body p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">{t('welcomeBack', { name: user?.user_metadata?.display_name || user?.email?.split('@')[0] })}</span>
                  <span className="inline-flex ml-2 animate-pulse">👋</span>
                </h2>
                <p className="text-white/70">{t('readyMessage')}</p>
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
            
            {pools && pools.length > 0 ? (
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
      </main>
    </div>
  );
}