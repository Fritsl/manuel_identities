export interface FormPage {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  category: 'profile' | 'experience' | 'skills' | 'preferences';
  matchImpact: number;
}

export interface FormState {
  currentPageId: string;
  pages: FormPage[];
  overallProgress: number;
  predictedMatchQuality: number;
}

export interface EnvironmentPreference {
  teamwork: number;
  workStructure: number;
  communication: number;
  innovation: number;
}