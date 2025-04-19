"use client"

import AppLayout from "../components/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout 
      showHeader={true}
      showFooter={true}
      headerLinks={[
        { name: "Dashboard", href: "/dashboard" },
        { name: "Profile", href: "/profile" },
        { name: "Settings", href: "/settings" },
        { name: "Help", href: "/help" },
      ]}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome to your Stream Challenge dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Active Viewers</h2>
            </div>
            <div className="text-3xl font-bold mb-2">1,248</div>
            <p className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <span>12% since last month</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 4.126-.336l-.349-3.007a.5.5 0 0 1 .595-.525 48.37 48.37 0 0 0 5.441.602.55.55 0 0 0 .595-.516 48.02 48.02 0 0 0-.595-5.74.337.337 0 0 0-.328-.292c-.363 0-.725.13-.995.302a1.646 1.646 0 0 1-1.003.349c-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Active Challenges</h2>
            </div>
            <div className="text-3xl font-bold mb-2">37</div>
            <p className="text-indigo-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span>5 new this week</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Total Reach</h2>
            </div>
            <div className="text-3xl font-bold mb-2">48.3K</div>
            <p className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <span>18% since last month</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Recent Challenges</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Gaming Marathon Challenge</h3>
                      <p className="text-sm text-gray-500">Submitted by User{item}23 • 2 days ago</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                      $25.00
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              View all challenges
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Weekend Stream Raffle</h3>
                      <p className="text-sm text-gray-500">Starting in {item * 2} days • {item * 14} participants</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                      {item === 1 ? 'New' : 'Upcoming'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
              View all events
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}