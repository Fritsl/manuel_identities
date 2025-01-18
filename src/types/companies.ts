import { Building, Globe, Users, Briefcase } from 'lucide-react';

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  location: string;
  size: string;
  matchScore: number;
  highlights: string[];
  culture: string[];
  website: string;
  careerPage: string;
  linkedIn: string;
  onViewDetails: (id: string) => void;
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'InnovateTech Solutions',
    description: 'Leading provider of cloud-native solutions and digital transformation services.',
    industry: 'Technology',
    location: 'Remote / San Francisco, CA',
    size: '500-1000 employees',
    matchScore: 92,
    highlights: [
      'Strong remote-first culture',
      'Excellent work-life balance',
      'Regular hackathons and innovation days',
      'Comprehensive health benefits'
    ],
    culture: [
      'Collaborative environment',
      'Focus on continuous learning',
      'Flexible working hours',
      'Regular team events'
    ],
    website: 'https://innovatetech.example.com',
    careerPage: 'https://innovatetech.example.com/careers',
    linkedIn: 'https://linkedin.com/company/innovatetech',
    onViewDetails: (id) => console.log('View company details:', id)
  },
  {
    id: '2',
    name: 'GreenScale Technologies',
    description: 'Sustainable technology solutions for the modern enterprise.',
    industry: 'Green Technology',
    location: 'Hybrid / Boston, MA',
    size: '200-500 employees',
    matchScore: 88,
    highlights: [
      'Focus on sustainability',
      'Rapid growth opportunities',
      'Modern tech stack',
      'Professional development budget'
    ],
    culture: [
      'Mission-driven environment',
      'Open communication',
      'Work-life integration',
      'Regular team building'
    ],
    website: 'https://greenscale.example.com',
    careerPage: 'https://greenscale.example.com/careers',
    linkedIn: 'https://linkedin.com/company/greenscale',
    onViewDetails: (id) => console.log('View company details:', id)
  }
];