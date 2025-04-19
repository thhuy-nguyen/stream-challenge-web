"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header - New section */}
      <header className="fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Stream Challenge</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-white/80 hover:text-white transition-colors">Features</Link>
              <Link href="#benefits" className="text-white/80 hover:text-white transition-colors">Benefits</Link>
              <Link href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</Link>
              <Link href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-4 py-2 text-white/90 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Modern gradient with animated elements */}
      <div className="relative overflow-hidden min-h-[60vh] bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 text-white">
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
                  🚀 Launching April 2025
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Stream Challenge
              </h1>
              <p className="text-xl md:text-3xl font-light mb-4">
                Gamify Your Stream. <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Engage Your Audience.</span>
              </p>
              <p className="text-lg md:text-xl opacity-80 mb-12">
                The ultimate platform that enhances interactivity between streamers and their audiences
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-5 ${showVideo ? "md:justify-start" : "justify-center"}`}>
                <button className="btn btn-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 border-0 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  Get Started
                </button>
                <button 
                  onClick={() => setShowVideo(!showVideo)} 
                  className="btn bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white btn-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                  {showVideo ? "Hide Demo" : "Watch Demo"}
                </button>
              </div>
            </div>
            
            {/* YouTube video - Will appear on the right with animation */}
            <div 
              className={`w-full md:w-1/2 transition-all duration-1500 ease-in-out transform ${
                showVideo 
                  ? "opacity-100 translate-y-0 mt-12 md:mt-0" 
                  : "opacity-0 absolute pointer-events-none translate-y-8 md:translate-x-32"
              }`}
            >
              <div className="relative bg-black/40 backdrop-blur-sm p-2 rounded-2xl shadow-2xl overflow-hidden border border-white/10 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-lg opacity-25 group-hover:opacity-50 transition duration-1000"></div>
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
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4 inline-block">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Tools for Streamers & Viewers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Unlock new ways to engage with your audience and create unforgettable streaming moments</p>
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
                    Available Now
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Pick Me</h3>
                <p className="text-gray-600 mb-6">A time-based raffle or selection pool where streamers choose random participants from their audience.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Join pools for special events and streams</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Get selected randomly by your favorite streamer</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Participate in exclusive activities</span>
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Challenge Me</h3>
                <p className="text-gray-600 mb-6">Viewers create missions or dares with rewards, incentivizing unique content from streamers.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Submit creative challenges to streamers</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Add optional rewards (points or money)</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Watch streamers complete your challenge</span>
                  </li>
                </ul>
                <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-indigo-700 text-sm font-medium mb-2">Join our waitlist for early access!</p>
                  <p className="text-gray-600 text-sm mb-3">Be among the first to try "Challenge Me" and receive exclusive bonuses.</p>
                  <button className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4 inline-block">Benefits</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Who Benefits?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our platform creates value for both sides of the streaming ecosystem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Streamers */}
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute w-32 h-32 bg-purple-200 rounded-full -top-10 -right-10 z-0 group-hover:bg-purple-300 transition-all duration-500"></div>
              <div className="absolute w-16 h-16 bg-indigo-200 rounded-full -bottom-4 -left-4 z-0 group-hover:bg-indigo-300 transition-all duration-500"></div>
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">For Streamers</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Boost engagement and viewer retention</span>
                      <p className="text-gray-600 mt-1 text-sm">Keep viewers coming back for interactive experiences</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Add monetizable mini-events</span>
                      <p className="text-gray-600 mt-1 text-sm">Create new revenue streams through challenges</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Build loyal communities</span>
                      <p className="text-gray-600 mt-1 text-sm">Create deeper connections through interactive content</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Seamless platform integration</span>
                      <p className="text-gray-600 mt-1 text-sm">Works with Twitch, YouTube and more</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Viewers */}
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute w-32 h-32 bg-indigo-200 rounded-full -top-10 -right-10 z-0 group-hover:bg-indigo-300 transition-all duration-500"></div>
              <div className="absolute w-16 h-16 bg-purple-200 rounded-full -bottom-4 -left-4 z-0 group-hover:bg-purple-300 transition-all duration-500"></div>
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">For Viewers</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Direct impact on content</span>
                      <p className="text-gray-600 mt-1 text-sm">Shape the direction of your favorite streams</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Feel recognized and valued</span>
                      <p className="text-gray-600 mt-1 text-sm">Meaningful interactions beyond just chat</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Create meaningful interactions</span>
                      <p className="text-gray-600 mt-1 text-sm">Stand out from the crowd in chat</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Simple reward system</span>
                      <p className="text-gray-600 mt-1 text-sm">Create and fund challenges easily</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4 inline-block">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[calc(100%_-_10px)] w-[calc(100%_-_30px)] h-0.5 bg-indigo-100 z-0"></div>

              <div className="bg-white rounded-3xl shadow-xl p-8 relative z-10 h-full border-2 border-transparent group-hover:border-purple-100 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">1</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h3>
                <p className="text-gray-600">Create your account as a streamer or viewer and link your streaming platforms like Twitch or YouTube</p>
              </div>
            </div>

            <div className="relative group">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[calc(100%_-_10px)] w-[calc(100%_-_30px)] h-0.5 bg-indigo-100 z-0"></div>

              <div className="bg-white rounded-3xl shadow-xl p-8 relative z-10 h-full border-2 border-transparent group-hover:border-purple-100 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">2</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Set Up Events</h3>
                <p className="text-gray-600">Streamers create "Pick Me" events or viewers submit challenges with rewards to enhance the stream</p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white rounded-3xl shadow-xl p-8 relative z-10 h-full border-2 border-transparent group-hover:border-purple-100 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">3</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Engage & Reward</h3>
                <p className="text-gray-600">Interact during streams with the overlay and reward successful challenges in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section - New section */}
      <div className="py-24 px-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-[50%] right-[15%] w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Transforming Streaming Experiences</h2>
            <p className="text-lg max-w-3xl mx-auto opacity-90">Join thousands of streamers and viewers who are taking engagement to the next level</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-all duration-500">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 mb-2">500+</div>
              <p className="text-lg opacity-90">Active Streamers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-all duration-500">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 mb-2">25K+</div>
              <p className="text-lg opacity-90">Monthly Viewers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-all duration-500">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 mb-2">10K+</div>
              <p className="text-lg opacity-90">Challenges Completed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:bg-white/20 transition-all duration-500">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 mb-2">98%</div>
              <p className="text-lg opacity-90">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - New section */}
      <div className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4 inline-block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Streamers Are Saying</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 h-full relative">
              <div className="text-indigo-500 mb-6">
                <svg className="w-12 h-12 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">Stream Challenge has completely transformed how I interact with my audience. The "Pick Me" feature creates moments of genuine excitement during streams!</p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Alex Turner</h4>
                  <p className="text-sm text-gray-500">10K+ Followers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 h-full relative">
              <div className="text-indigo-500 mb-6">
                <svg className="w-12 h-12 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">The Challenge Me feature has added a new source of income and content ideas. My viewers love submitting challenges and I love the creativity it brings to streams.</p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Maya Johnson</h4>
                  <p className="text-sm text-gray-500">Gaming Streamer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 h-full relative">
              <div className="text-indigo-500 mb-6">
                <svg className="w-12 h-12 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">As a viewer, I finally feel like I can make a difference in my favorite streams. Getting picked from the "Pick Me" pool was such a highlight and made me feel special!</p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Jamie Richards</h4>
                  <p className="text-sm text-gray-500">Active Viewer</p>
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
            🚀 Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Transform Your Streams?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-12 opacity-90">Join thousands of streamers and viewers who are taking stream engagement to the next level.</p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="btn btn-lg bg-white text-indigo-900 hover:bg-indigo-100 transition-all duration-300 font-bold px-8">
              Create Free Account
            </button>
            <button className="btn btn-lg bg-indigo-700/50 backdrop-blur-md border border-white/20 text-white hover:bg-indigo-700/80 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Modernized */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Stream Challenge</span>
              </div>
              <p className="text-gray-400 mb-8 pr-8">Gamifying stream interactions since 2025. Empowering creators and viewers alike with innovative engagement tools.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="container mx-auto py-6 px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Stream Challenge. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Status</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
