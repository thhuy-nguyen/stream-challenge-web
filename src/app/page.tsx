import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Stream Challenge</h1>
            <p className="text-xl md:text-2xl mb-2">Gamify Your Stream. Engage Your Audience.</p>
            <p className="text-lg md:text-xl opacity-80 mb-8">The ultimate platform that enhances interactivity between streamers and their audiences</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">Get Started</button>
              <button className="btn bg-white text-purple-900 hover:bg-purple-100 btn-lg">Watch Demo</button>
            </div>
            
            <div className="mt-12">
              <div className="flex justify-center items-center">
                <Image src="/window.svg" alt="Stream window" width={600} height={400} className="rounded-lg shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Pick Me Feature */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="px-6 pt-6">
                <div className="bg-purple-100 p-6 rounded-xl">
                  <Image src="/globe.svg" alt="Pick Me" width={100} height={100} />
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold">Pick Me</h3>
                <p className="text-lg">A time-based raffle or selection pool where streamers choose random participants from their audience.</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Join pools for special events and streams</li>
                  <li>Get selected randomly by your favorite streamer</li>
                  <li>Participate in exclusive activities</li>
                </ul>
              </div>
            </div>
            
            {/* Challenge Me Feature */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="px-6 pt-6">
                <div className="bg-indigo-100 p-6 rounded-xl">
                  <Image src="/file.svg" alt="Challenge Me" width={100} height={100} />
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold">Challenge Me</h3>
                <p className="text-lg">Viewers create missions or dares with rewards, incentivizing unique content from streamers.</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Submit creative challenges to streamers</li>
                  <li>Add optional rewards (points or money)</li>
                  <li>Watch streamers complete your challenge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Value Proposition Section */}
      <div className="py-20 px-6 bg-base-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Who Benefits?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Streamers */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold">For Streamers</h3>
                <div className="divider"></div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Boost engagement and viewer retention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Add monetizable mini-events to your streams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Build loyal communities around interactive content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Seamless integration with Twitch and YouTube</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* For Viewers */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold">For Viewers</h3>
                <div className="divider"></div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Direct impact on stream content creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Feel recognized and valued by streamers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Create meaningful interactions beyond chat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl text-success mr-2">✓</span>
                    <span>Simple reward system for challenges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-4">1</div>
                <h3 className="card-title text-xl">Sign Up</h3>
                <p>Create an account as a streamer or viewer and link your streaming platforms</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-4">2</div>
                <h3 className="card-title text-xl">Set Up Events</h3>
                <p>Streamers create "Pick Me" events or viewers submit challenges with rewards</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-4">3</div>
                <h3 className="card-title text-xl">Engage & Reward</h3>
                <p>Interact during streams with the overlay and reward successful challenges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-indigo-800 to-purple-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Streams?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-12">Join thousands of streamers and viewers who are taking stream engagement to the next level.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-lg bg-white text-purple-900 hover:bg-purple-100">Create Account</button>
            <button className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-purple-900">Contact Us</button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer p-10 bg-base-300 text-base-content">
        <div>
          <span className="footer-title">Stream Challenge</span>
          <p className="max-w-xs">Gamifying stream interactions since 2025. Empowering creators and viewers alike.</p>
        </div>
        <div>
          <span className="footer-title">Product</span>
          <Link href="#" className="link link-hover">Features</Link>
          <Link href="#" className="link link-hover">Pricing</Link>
          <Link href="#" className="link link-hover">Documentation</Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link href="#" className="link link-hover">About Us</Link>
          <Link href="#" className="link link-hover">Contact</Link>
          <Link href="#" className="link link-hover">Blog</Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link href="#" className="link link-hover">Terms of Service</Link>
          <Link href="#" className="link link-hover">Privacy Policy</Link>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-300 text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p>© 2025 Stream Challenge. All rights reserved.</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <Link href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></Link>
            <Link href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></Link>
            <Link href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
