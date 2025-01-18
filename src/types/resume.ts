export interface Gap {
  start: Date;
  end: Date;
  durationMonths: number;
}

export interface ResumeEntry {
  id: string;
  type: 'Work' | 'Education' | 'Other';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills?: string[];
}

export interface ResumeData {
  entries: ResumeEntry[];
}

export const initialResumeData: ResumeData = {
  entries: []
};