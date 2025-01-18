import { ResumeEntry } from '../types/resume';

export function getEntryColor(type: ResumeEntry['type']) {
  switch (type) {
    case 'Work':
      return 'bg-blue-500';
    case 'Education':
      return 'bg-green-500';
    case 'Other':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
}