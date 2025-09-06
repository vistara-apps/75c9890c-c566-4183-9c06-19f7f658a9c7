export interface User {
  userId: string; // wallet address
  createdAt: Date;
  lastActive: Date;
}

export interface Dream {
  dreamId: string;
  userId: string;
  timestamp: Date;
  description: string;
  moodTags: string[];
  interpretation?: string;
  storageRef?: string;
}

export interface Pattern {
  patternId: string;
  userId: string;
  themeDescription: string;
  frequency: number;
  associatedDreams: string[];
}

export interface DreamAnalysis {
  themes: string[];
  emotions: string[];
  symbols: string[];
  interpretation: string;
  significance: string;
}

export interface MoodTag {
  id: string;
  label: string;
  color: string;
}

export const MOOD_TAGS: MoodTag[] = [
  { id: 'happy', label: 'Happy', color: 'bg-yellow-400' },
  { id: 'anxious', label: 'Anxious', color: 'bg-red-400' },
  { id: 'peaceful', label: 'Peaceful', color: 'bg-green-400' },
  { id: 'confused', label: 'Confused', color: 'bg-purple-400' },
  { id: 'excited', label: 'Excited', color: 'bg-orange-400' },
  { id: 'sad', label: 'Sad', color: 'bg-blue-400' },
  { id: 'curious', label: 'Curious', color: 'bg-teal-400' },
  { id: 'fearful', label: 'Fearful', color: 'bg-gray-400' },
];
