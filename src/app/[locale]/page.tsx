'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/utils/hooks/useAuth';
import AppLayout from '@/app/components/AppLayout';
import { 
  PlayIcon, 
  CheckmarkIcon, 
  ClockTimeIcon, 
  QuestionMarkIcon 
} from '@/app/components/icons';

export default function Home() {
  const t = useTranslations('home');
  const commonT = useTranslations('common');
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Initialize state at the top level, not conditionally
  const [showVideo, setShowVideo] = useState(false);

  // Auto-redirect authenticated users
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [isLoading, router, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-white"></div>
      </div>
    );
  }

  return (
    <AppLayout>
      {/* Hero Section - Modern gradient with animated elements */}
      <div className="relative overflow-hidden min-h-[70vh] bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 text-white">
        {/* Animated background elements - minimized and more subtle */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[15%] left-[15%] w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-[35%] right-[20%] w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[25%] left-[30%] w-32 h-32 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-28 lg:pt-32 pb-20">
          <div className={`flex flex-col items-center transition-all duration-1500 ease-in-out ${showVideo ? "md:flex-row md:items-start md:justify-between md:gap-12" : "justify-center"}`}>
            {/* Hero content - Will move to left on button click */}
            <div className={`transition-all duration-1500 ease-in-out transform text-center ${
              showVideo 
                ? "md:w-1/2 md:text-left" 
                : "max-w-3xl"
            }`}>
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                  🚀 {t('hero.launch')}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-3xl font-light mb-4">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg md:text-xl opacity-80 mb-12">
                {t('hero.description')}
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-5 ${showVideo ? "md:justify-start" : "justify-center"}`}>
                <button className="btn btn-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 border-0 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  {t('hero.cta')}
                </button>
                <button 
                  onClick={() => setShowVideo(!showVideo)} 
                  className="btn bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white btn-lg transition-all duration-300 shadow-md"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  {t('hero.watchVideo')}
                </button>
              </div>
            </div>
            
            {/* Video placeholder - Hidden by default, will appear on the right when button is clicked */}
            <div className={`mt-12 md:mt-0 transform transition-all duration-1000 w-full ${showVideo ? "md:w-1/2 opacity-100 translate-y-0" : "md:w-0 opacity-0 md:translate-y-8"}`}>
              {showVideo && (
              <div className="relative bg-black/60 backdrop-blur-sm p-3 rounded-2xl shadow-2xl overflow-hidden border border-white/20 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  {showVideo && (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="Stream Challenge Demo" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  )}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Wave separator - Fixed for all screen sizes */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden line-height-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none" 
            className="w-full h-[90px] md:h-[120px]"
            style={{ display: 'block', marginBottom: '-5px' }}
          >
            <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 bg-white" id="features">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4 inline-block">{commonT('features')}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('features.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('features.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Pick Me Feature */}
            <div className="bg-white rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 h-full border border-purple-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                    <Image src="/globe.svg" alt="Pick Me" width={36} height={36} className="text-white" />
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    {commonT('availableNow')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('features.pickMe.title')}</h3>
                <p className="text-gray-600 mb-6">{t('features.pickMe.description')}</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckmarkIcon className="h-6 w-6 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{t('features.pickMe.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon className="h-6 w-6 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{t('features.pickMe.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon className="h-6 w-6 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{t('features.pickMe.feature3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Challenge Me Feature */}
            <div className="bg-white rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 h-full border border-indigo-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                    <Image src="/file.svg" alt="Challenge Me" width={36} height={36} className="text-white" />
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    <ClockTimeIcon className="h-4 w-4 mr-1" />
                    {commonT('comingSoon')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('features.challengeMe.title')}</h3>
                <p className="text-gray-600 mb-6">{t('features.challengeMe.description')}</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckmarkIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{t('features.challengeMe.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{t('features.challengeMe.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{t('features.challengeMe.feature3')}</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                    {commonT('getStarted')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 bg-gradient-to-r from-indigo-800 to-purple-800 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-[30%] left-[10%] w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-6 border border-white/20">
            🚀 {t('cta.offer')}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">{t('cta.title')}</h2>
          <p className="text-xl max-w-2xl mx-auto mb-12 opacity-90">{t('cta.description')}</p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="btn btn-lg bg-white text-indigo-900 hover:bg-indigo-100 transition-all duration-300 font-bold px-8">
              {t('cta.primary')}
            </button>
            <button className="btn btn-lg bg-indigo-700/50 backdrop-blur-md border border-white/20 text-white hover:bg-indigo-700/80 transition-all duration-300">
              <QuestionMarkIcon className="w-5 h-5 mr-2" />
              {t('cta.secondary')}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}