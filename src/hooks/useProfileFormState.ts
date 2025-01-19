import { useState, useMemo, useEffect } from 'react';
import { FormPage, FormState, FormData } from '../types';
import { initialPages } from '../data/initialPages';

export function useProfileFormState(completedPages: Set<string>, setProgress: (progress: number) => void, setMatchQuality: (quality: number) => void) {
  const [formData, setFormData] = useState<FormData>({
    'profile-headline': '',
    'environment': {
      workplaceSocialization: 3,
      workPaceStructure: 3,
      learningDevelopment: 3,
      autonomySupport: 3,
      compensationIncentives: 3,
      workLifeIntegration: 3,
      culturalEngagement: 3,
      qualificationsCredentials: 3,
      adaptabilityChange: 3
    },
    'location': {
      preferredLocations: '',
      remotePreference: 'hybrid',
      relocationWillingness: false,
      travelPreference: 'minimal',
      additionalNotes: ''
    },
    'considerations': {
      dealBreakers: '',
      challengesNeeds: ''
    },
    'personal-interests': {
      hobbies: '',
      communities: ''
    },
    'life-goals': {
      shortTerm: '',
      longTerm: '',
      impact: ''
    },
    'resume': {
      resume: ''
    }
  });

  // Calculate initial form state using useMemo
  const initialFormState = useMemo(() => {
    const pages = initialPages.map(page => ({
      ...page,
      isCompleted: completedPages.has(page.id)
    }));

    const completedPagesCount = pages.filter(page => page.isCompleted).length;
    const progress = (completedPagesCount / pages.length) * 100;
    const matchQuality = Math.min(
      100,
      pages
        .filter(page => page.isCompleted)
        .reduce((acc, page) => acc + page.matchImpact, 0)
    );

    return {
      currentPageId: pages[0].id,
      pages,
      overallProgress: progress,
      predictedMatchQuality: matchQuality,
    };
  }, [completedPages]);

  const [formState, setFormState] = useState<FormState>(initialFormState);

  // Update form state when completedPages changes
  useEffect(() => {
    const updatedPages = formState.pages.map(page => ({
      ...page,
      isCompleted: completedPages.has(page.id)
    }));

    const completedPagesCount = updatedPages.filter(page => page.isCompleted).length;
    const progress = (completedPagesCount / updatedPages.length) * 100;
    const matchQuality = Math.min(
      100,
      updatedPages
        .filter(page => page.isCompleted)
        .reduce((acc, page) => acc + page.matchImpact, 0)
    );

    setProgress(progress);
    setMatchQuality(matchQuality);

    setFormState(prev => ({
      ...prev,
      pages: updatedPages,
      overallProgress: progress,
      predictedMatchQuality: matchQuality
    }));
  }, [completedPages, setProgress, setMatchQuality]);

  const handlePageSelect = (pageId: string) => {
    setFormState(prev => ({ ...prev, currentPageId: pageId }));
  };

  const handlePageComplete = async (pageId: string) => {
    const currentPage = formState.pages.find(p => p.id === pageId);
    if (!currentPage) return;

    setFormState(prev => {
      const nextPage = prev.pages.find(page => !page.isCompleted);
      return {
        ...prev,
        currentPageId: nextPage?.id || prev.currentPageId,
      };
    });
  };

  return {
    formData,
    setFormData,
    formState,
    handlePageSelect,
    handlePageComplete
  };
}