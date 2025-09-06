import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getStorageKey(userId: string, key: string): string {
  return `dreamweaver_${userId}_${key}`;
}

// Local storage helpers for demo purposes
export function saveDream(dream: any): void {
  const dreams = getDreams();
  dreams.push(dream);
  localStorage.setItem('dreamweaver_dreams', JSON.stringify(dreams));
}

export function getDreams(): any[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('dreamweaver_dreams');
  return stored ? JSON.parse(stored) : [];
}

export function savePattern(pattern: any): void {
  const patterns = getPatterns();
  patterns.push(pattern);
  localStorage.setItem('dreamweaver_patterns', JSON.stringify(patterns));
}

export function getPatterns(): any[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('dreamweaver_patterns');
  return stored ? JSON.parse(stored) : [];
}
