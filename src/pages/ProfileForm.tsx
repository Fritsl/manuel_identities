import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { FormPage, FormState, FormData } from '../types';
import { RefreshCw } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import { ProfileFormHeader } from '../components/forms/ProfileFormHeader';
import { ProfileFormProgress } from '../components/forms/ProfileFormProgress';
import { ProfileFormContent } from '../components/forms/ProfileFormContent';

const initialPages: FormPage[] = [
  {
    id: 'profile-headline',
    title: 'Profile headline',
    description: 'Create a compelling headline that represents you',
    isCompleted: false,
    category: 'profile',
    matchImpact: 15,
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Your ideal work environment and culture',
    isCompleted: false,
    category: 'preferences',
    matchImpact: 20,
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Where you want to work and live',
    isCompleted: false,
    category: 'preferences',
    matchImpact: 15,
  },
  {
    id: 'considerations',
    title: 'Considerations',
    description: 'Important factors in your career decisions',
    isCompleted: false,
    category: 'preferences',
    matchImpact: 10,
  },
  {
    id: 'personal-interests',
    title: 'Personal interests',
    description: 'What drives and motivates you',
    isCompleted: false,
    category: 'profile',
    matchImpact: 10,
  },
  {
    id: 'life-goals',
    title: 'Life goals',
    description: 'Your long-term aspirations and dreams',
    isCompleted: false,
    category: 'profile',
    matchImpact: 15,
  },
  {
    id: 'resume',
    title: 'Resume',
    description: 'Your professional background and skills',
    isCompleted: false,
    category: 'experience',
    matchImpact: 15,
  },
];

const initialFormData: FormData = {
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
};

export function ProfileForm() {
  const navigate = useNavigate();
  const { setProgress, setMatchQuality, completedPages, isLoading, refreshData } = useProfile();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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
    setIsNavOpen(false);
  };

  const handleSearchClick = () => {
    if (formState.predictedMatchQuality >= 60) {
      navigate('/jobs');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const currentPage = formState.pages.find(p => p.id === formState.currentPageId);
  if (!currentPage) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProfileFormHeader
        title={currentPage.title}
        onToggleNav={() => setIsNavOpen(!isNavOpen)}
        onRefresh={handleRefresh}
        onSearch={handleSearchClick}
        isRefreshing={isRefreshing}
        isSearchDisabled={formState.predictedMatchQuality < 60}
        completedPages={completedPages}
        matchQuality={formState.predictedMatchQuality}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex justify-center overflow-y-auto">
          <div className="w-full max-w-3xl p-2 md:p-8 space-y-4 md:space-y-6 pt-2 md:pt-4">
            <ProfileFormProgress
              progress={formState.overallProgress}
              matchQuality={formState.predictedMatchQuality}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              completedPages={completedPages}
            />
            
            <div className="bg-card rounded-lg p-3 md:p-6 shadow-sm border border-border mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6 hidden md:block">
                {currentPage.title}
              </h2>
              <ProfileFormContent
                currentPageId={currentPage.id}
                formData={formData}
                setFormData={setFormData}
                handlePageComplete={handlePageComplete}
                isCompleted={currentPage.isCompleted}
              />
            </div>
          </div>
        </div>

        <div className={`
          ${isNavOpen ? 'block' : 'hidden'}
          md:block
          w-full md:w-64 
          bg-card border-r border-border
          fixed md:sticky
          top-[49px] md:top-0
          h-[calc(100vh-49px)] md:h-screen
          z-50
          overflow-y-auto
          md:order-last
        `}>
          <Navigation
            pages={formState.pages}
            currentPageId={formState.currentPageId}
            onPageSelect={handlePageSelect}
            matchQuality={formState.predictedMatchQuality}
            remainingPages={formState.pages.filter(page => !page.isCompleted).length}
          />
        </div>
      </div>
    </div>
  );
}