// app/page.tsx - Home/landing page

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💚</span>
              <h1 className="text-xl font-bold text-gradient">
                Wellness Platform
              </h1>
            </div>
            <div className="flex gap-4">
              <Link href="/checkin" className="btn btn-ghost">
                Check In
              </Link>
              <Link href="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
            Employee Wellness,{' '}
            <span className="text-gradient">Reimagined</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            A privacy-first platform for early burnout detection. Quick weekly
            check-ins help us understand how you're doing — without surveillance.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link href="/checkin" className="btn btn-primary px-8 py-3">
              Take Weekly Check-In (30 sec)
            </Link>
            <Link href="/dashboard" className="btn btn-secondary px-8 py-3">
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="card">
            <div className="text-4xl">⚡</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Fast Check-Ins
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Complete your wellness check in just 30 seconds. Mobile-first
              design for quick responses.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl">🔒</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Privacy First
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              No keystroke tracking, no screenshots. Anonymous mode available.
              Your data is encrypted and aggregated.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl">📊</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Smart Detection
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              AI-powered burnout risk scoring identifies patterns before they
              become critical.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl">💡</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Wellness Nudges
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Hourly wellness reminders help you stay healthy. Walks, stretches,
              hydration tips, and more.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl">👥</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Team Insights
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              HR gets aggregated team wellness metrics and early warning signs
              for intervention.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl">🌿</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Human-Centered
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Built with empathy. Not about surveillance. About supporting
              employee wellbeing.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="mb-10 text-center text-3xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h3>

          <div className="space-y-6">
            <div className="card">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Weekly Check-In
              </h4>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Answer 5 quick questions about your energy, workload, motivation,
                team support, and stress levels. Takes 30 seconds.
              </p>
            </div>

            <div className="card">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Smart Analysis
              </h4>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Our algorithm analyzes your responses alongside historical trends
                to detect burnout patterns early.
              </p>
            </div>

            <div className="card">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Privacy-First Insights
              </h4>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                HR teams get aggregated wellness metrics. Individual data is only
                shown when employees request support.
              </p>
            </div>

            <div className="card">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Wellness Support
              </h4>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Get hourly wellness nudges and access to resources. HR can reach
                out proactively to those showing risk signs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-slate-600 dark:text-slate-400">
            🔒 Your wellness, protected. Built with care for employee wellbeing.
          </p>
        </div>
      </footer>
    </div>
  );
}
