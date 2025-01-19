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

export interface FormData {
  'profile-headline': string;
  environment: {
    workplaceSocialization: number;
    workPaceStructure: number;
    learningDevelopment: number;
    autonomySupport: number;
    compensationIncentives: number;
    workLifeIntegration: number;
    culturalEngagement: number;
    qualificationsCredentials: number;
    adaptabilityChange: number;
  };
  location: {
    preferredLocations: string;
    remotePreference: 'remote' | 'hybrid' | 'office';
    relocationWillingness: boolean;
    travelPreference: 'none' | 'minimal' | 'moderate' | 'frequent';
    additionalNotes: string;
  };
  considerations: {
    dealBreakers: string;
    challengesNeeds: string;
  };
  'personal-interests': {
    hobbies: string;
    communities: string;
  };
  'life-goals': {
    shortTerm: string;
    longTerm: string;
    impact: string;
  };
  resume: {
    resume: string;
  };
}