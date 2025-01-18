export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  matchScore: number;
  pros: string[];
  cons: string[];
  credits: number;
  onViewDetails: (id: string) => void;
}

export const mockJobs: JobMatch[] = [
  {
    id: '1',
    title: 'Aviation Safety Consultant',
    company: 'AeroSafe Solutions',
    location: 'Remote / Various locations',
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    description: 'As an Aviation Safety Consultant, you will utilize your extensive experience in aviation maintenance and non-technical skills to advise and consult on safety practices, procedures, and compliance. This role involves assessing and improving safety protocols, conducting audits, and providing training on non-technical skills such as communication, teamwork, decision-making, and situational awareness.',
    matchScore: 90,
    pros: [
      'Utilize non-technical skills in a critical safety role',
      'Opportunity to work with various aviation organizations',
      'Potential for remote work',
      'High impact on safety and efficiency in aviation'
    ],
    cons: [
      'May require frequent travel',
      'High level of responsibility and stress'
    ],
    credits: 75,
    onViewDetails: (id) => console.log('View details for job:', id)
  },
  {
    id: '2',
    title: 'Training and Development Specialist',
    company: 'airsight GmbH',
    location: 'Hybrid / In-house',
    salary: '$85,000 - $110,000',
    type: 'Full-time',
    description: 'In this role, you would be responsible for developing and delivering training programs focused on non-technical skills in aviation, such as communication, teamwork, decision-making, and problem-solving. Your experience as a Senior Flight Mechanic and your Associate of Applied Science in Aviation Maintenance Technology provide a solid foundation for understanding the importance of these skills.',
    matchScore: 95,
    pros: [
      'Focus on non-technical skills development',
      'Opportunity to work with experienced trainers',
      'Contribute to improving safety and efficiency in aviation',
      'Potential for in-house or remote work'
    ],
    cons: [
      'May require periodic updates to training materials',
      'Continuous need to stay current with industry developments'
    ],
    credits: 75,
    onViewDetails: (id) => console.log('View details for job:', id)
  }
];