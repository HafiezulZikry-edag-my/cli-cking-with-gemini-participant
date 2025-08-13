'use client';

import DashboardTracker from '../components/DashboardTracker';

export default function DashboardStatusPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Back Button */}
        <div className="w-full flex justify-start">
          <a
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </a>
        </div>
        
        <DashboardTracker />
      </main>
    </div>
  );
}