"use client"

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  pageTitle?: string;
  pageDescription?: string;
  withGradientBackground?: boolean;
  headerLinks?: { name: string; href: string }[];
};

export default function AppLayout({
  children,
  showHeader = true,
  showFooter = true,
  withGradientBackground = false,
  headerLinks = [
    { name: "Features", href: "/#features" },
    { name: "Benefits", href: "/#benefits" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Testimonials", href: "/#testimonials" },
  ],
}: AppLayoutProps) {
  return (
    <div className={`min-h-screen ${withGradientBackground ? 'bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 text-white' : 'bg-base-100'}`}>
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-md z-50 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">Stream Challenge</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                {headerLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
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
      )}

      <main className={`${showHeader ? 'pt-20' : ''}`}>
        {children}
      </main>

      {showFooter && (
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
      )}
    </div>
  );
}