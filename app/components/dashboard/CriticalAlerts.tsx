// app/components/dashboard/CriticalAlerts.tsx - Alert panel for high-risk employees

'use client';

import React from 'react';
import { CheckInResponse } from '@/types';

interface CriticalAlertsProps {
  alerts: Array<CheckInResponse & { employeeName?: string; department?: string }>;
  isLoading?: boolean;
}

export default function CriticalAlerts({
  alerts = [],
  isLoading = false,
}: CriticalAlertsProps) {
  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-8 w-32 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="card text-center">
        <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          ✅ No Critical Alerts
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          All employees appear to be doing well!
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        🚨 Critical Alerts ({alerts.length})
      </h3>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border-l-4 p-3 ${
              alert.riskLevel === 'critical'
                ? 'border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
                : 'border-orange-500 bg-orange-50 dark:border-orange-600 dark:bg-orange-900/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {alert.employeeName || 'Anonymous Employee'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {alert.department}
                </p>
              </div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  alert.riskLevel === 'critical'
                    ? 'badge-critical'
                    : 'badge-high-risk'
                }`}
              >
                {alert.riskLevel === 'critical' ? 'Critical' : 'High Risk'}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Burnout Score
                </p>
                <p className="text-lg font-bold">
                  {Math.round(alert.burnoutScore)}/100
                </p>
              </div>
              <button className="btn btn-secondary text-sm">
                Contact Employee
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
