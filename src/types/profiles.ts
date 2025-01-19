export interface Profile {
  id: string;
  name: string;
  headline: string;
  location: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'San Francisco Tech',
    headline: 'Senior Software Engineer specializing in cloud architecture',
    location: 'San Francisco, CA',
    type: 'Full-time',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    name: 'Local Contractor',
    headline: 'Experienced House Painter and Maintenance Specialist',
    location: 'Holstebro, Denmark',
    type: 'Contract',
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
    isActive: false
  }
];