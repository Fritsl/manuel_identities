import React from 'react';
import { ProfileHeadlineForm } from './ProfileHeadlineForm';
import { EnvironmentForm } from './EnvironmentForm';
import { LocationForm } from './LocationForm';
import { ConsiderationsForm } from './ConsiderationsForm';
import { PersonalInterestsForm } from './PersonalInterestsForm';
import { LifeGoalsForm } from './LifeGoalsForm';
import { ResumeForm } from '../resume/ResumeForm';
import { FormData } from '../../types';

interface ProfileFormContentProps {
  currentPageId: string;
  formData: FormData;
  setFormData: (data: FormData) => void;
  handlePageComplete: (pageId: string) => void;
  isCompleted: boolean;
}

export function ProfileFormContent({
  currentPageId,
  formData,
  setFormData,
  handlePageComplete,
  isCompleted
}: ProfileFormContentProps) {
  switch (currentPageId) {
    case 'profile-headline':
      return (
        <ProfileHeadlineForm
          value={formData['profile-headline']}
          onChange={(value) => setFormData({ ...formData, 'profile-headline': value })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'environment':
      return (
        <EnvironmentForm
          data={formData.environment}
          onChange={(data) => setFormData({ ...formData, environment: data })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'location':
      return (
        <LocationForm
          data={formData.location}
          onChange={(data) => setFormData({ ...formData, location: data })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'considerations':
      return (
        <ConsiderationsForm
          data={formData.considerations}
          onChange={(data) => setFormData({ ...formData, considerations: data })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'personal-interests':
      return (
        <PersonalInterestsForm
          data={formData['personal-interests']}
          onChange={(data) => setFormData({ ...formData, 'personal-interests': data })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'life-goals':
      return (
        <LifeGoalsForm
          data={formData['life-goals']}
          onChange={(data) => setFormData({ ...formData, 'life-goals': data })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'resume':
      return (
        <ResumeForm
          data={formData.resume}
          onChange={(data) => setFormData({ ...formData, resume: data })}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    default:
      return null;
  }
}