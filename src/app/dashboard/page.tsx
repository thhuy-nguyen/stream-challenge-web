'use client';

import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';

export default function Dashboard() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AppLayout
      showHeader={true}
      showFooter={true}
      headerLinks={[
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Profile', href: '/profile' },
        { name: 'Settings', href: '/settings' },
        { name: 'Help', href: '/help' },
      ]}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {user?.displayName || user?.email}!
          </h2>
          <p>You are now logged in to your Stream Challenge account.</p>
        </div>
      </div>
    </AppLayout>
  );
}