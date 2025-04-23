'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import AppLayout from '@/app/components/AppLayout';
import { PlusIcon, CubeIcon, MailboxIcon } from '@/app/components/icons';

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

  // Define dashboard header links (no longer need settings)
  const headerLinks = [
    { key: "dashboard", href: "/dashboard" },
  ];

  return (
    <AppLayout 
      headerLinks={headerLinks}
      withGradientBackground={true}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
        <main className="container mx-auto px-6 py-8 pt-24">
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
                
                <div className="mt-4 md:mt-0">
                  <Link href="/pick-me/create" className="btn btn-primary">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    {t('createNewPool')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* My Pools Section */}
          <div className="card mt-12 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <h3 className="card-title text-white/90 flex items-center">
                  <CubeIcon className="h-5 w-5 mr-2 text-blue-400" />
                  {t('myPools.title')}
                </h3>
                <Link href="/pick-me/create" className="btn btn-primary btn-sm">
                  <PlusIcon className="h-4 w-4 mr-1" />
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
                  <MailboxIcon className="h-12 w-12 mx-auto text-indigo-500/50" />
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
    </AppLayout>
  );
}