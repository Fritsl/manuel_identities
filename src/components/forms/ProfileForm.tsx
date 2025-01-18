import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import { useProfileFormState } from '../../hooks/useProfileFormState';
import { ProfileFormHeader } from './ProfileFormHeader';
import { ProfileFormLayout } from './ProfileFormLayout';
import { ProfileFormLoading } from './ProfileFormLoading';
import { ProfileFormContent } from './ProfileFormContent';
import { ProfileFormProgress } from './ProfileFormProgress';

export function ProfileForm() {
  const navigate = useNavigate();
  const { setProgress, setMatchQuality, completedPages, isLoading, refreshData } = useProfile();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    formData,
    setFormData,
    formState,
    handlePageSelect,
    handlePageComplete
  } = useProfileFormState(completedPages, setProgress, setMatchQuality);

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

  if (isLoading) {
    return <ProfileFormLoading />;
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

      <ProfileFormLayout
        isNavOpen={isNavOpen}
        pages={formState.pages}
        currentPageId={formState.currentPageId}
        onPageSelect={handlePageSelect}
        matchQuality={formState.predictedMatchQuality}
        remainingPages={formState.pages.filter(page => !page.isCompleted).length}
      >
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
      </ProfileFormLayout>
    </div>
  );
}