// app/components/checkin/StressSlider.tsx - Stress level slider

'use client';

import React from 'react';
import { useCheckInStore } from '@/store/useCheckInStore';

const STRESS_EMOJIS = ['😌', '😊', '😐', '😟', '😰'];
const STRESS_LABELS = ['None', 'Low', 'Moderate', 'High', 'Very High'];

export default function StressSlider() {
  const { formData, updateField } = useCheckInStore();
  const value = formData.stressLevel || 3;

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Stress Level
        </label>
        <span className="text-3xl">{STRESS_EMOJIS[value - 1]}</span>
      </div>

      <div className="space-y-3">
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => updateField('stressLevel', parseInt(e.target.value))}
          className="w-full cursor-pointer"
        />

        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
          {STRESS_LABELS.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        How stressed or anxious do you feel overall?
      </p>
    </div>
  );
}
