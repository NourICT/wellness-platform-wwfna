// app/lib/notifications.ts - Wellness nudge system

import { WellnessNudge } from '@/types';

export const DEFAULT_NUDGES: WellnessNudge[] = [
  {
    id: '1',
    message: 'Take a short walk 🚶',
    emoji: '🚶',
    category: 'walk',
    active: true,
  },
  {
    id: '2',
    message: 'Look away from the screen for 1 minute 👀',
    emoji: '👀',
    category: 'screen-break',
    active: true,
  },
  {
    id: '3',
    message: 'Drink some water 💧',
    emoji: '💧',
    category: 'hydration',
    active: true,
  },
  {
    id: '4',
    message: 'Stretch your shoulders 🙆',
    emoji: '🙆',
    category: 'stretching',
    active: true,
  },
  {
    id: '5',
    message: 'Take a deep breath 🫁',
    emoji: '🫁',
    category: 'breathing',
    active: true,
  },
  {
    id: '6',
    message: 'Step outside for fresh air 🌿',
    emoji: '🌿',
    category: 'walk',
    active: true,
  },
  {
    id: '7',
    message: 'Close your eyes for 30 seconds 😴',
    emoji: '😴',
    category: 'screen-break',
    active: true,
  },
  {
    id: '8',
    message: 'Do some neck rolls 🔄',
    emoji: '🔄',
    category: 'stretching',
    active: true,
  },
];

/**
 * Get random wellness nudge
 */
export function getRandomNudge(nudges: WellnessNudge[] = DEFAULT_NUDGES): WellnessNudge {
  const activeNudges = nudges.filter((n) => n.active);
  return activeNudges[Math.floor(Math.random() * activeNudges.length)];
}

/**
 * Check if browser notifications are supported
 */
export function areBrowserNotificationsSupported(): boolean {
  return 'Notification' in window;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!areBrowserNotificationsSupported()) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Show notification
 */
export function showNotification(
  title: string,
  options?: NotificationOptions
): void {
  if (!areBrowserNotificationsSupported()) {
    console.warn('Browser notifications not supported');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      ...options,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
    });
  }
}

/**
 * Schedule wellness nudges
 */
export function scheduleWellnessNudges(intervalMinutes: number = 60): void {
  if (!areBrowserNotificationsSupported()) {
    return;
  }

  setInterval(() => {
    const nudge = getRandomNudge();
    showNotification(nudge.message, {
      body: 'Take a moment for your wellness',
      tag: 'wellness-nudge',
      requireInteraction: false,
    });
  }, intervalMinutes * 60 * 1000);
}

/**
 * Check if user is in focus mode (do-not-disturb)
 */
export function isUserInFocusMode(): boolean {
  // Check for document hidden or focus
  if (document.hidden) {
    return true;
  }

  // Check for browser-specific focus modes
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // This is a simplified check - real implementation would use more signals
  return false;
}

/**
 * Suppress notifications if user is in focus mode
 */
export function shouldSuppressNotification(): boolean {
  // Check if browser window is in focus
  if (!document.hasFocus()) {
    return true;
  }

  // Check if user prefers reduced motion (often used during focus time)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Check local storage for do-not-disturb setting
  const dndMode = localStorage.getItem('wellness_dnd_mode');
  if (dndMode === 'enabled') {
    return true;
  }

  return false;
}
