import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { scrollToTop } from '../utils/scroll';
import { supabase } from './AuthContext';

interface ProfileContextType {
  progress: number;
  matchQuality: number;
  setProgress: (progress: number) => void;
  setMatchQuality: (quality: number) => void;
  handleComplete: (pageId: string, onComplete: () => void) => Promise<void>;
  completedPages: Set<string>;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [matchQuality, setMatchQuality] = useState(0);
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchCompletedPages = useCallback(async (attempt = 0) => {
    if (!user) {
      setCompletedPages(new Set());
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Get active profile with retry mechanism
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          setActiveProfileId(null);
          setCompletedPages(new Set());
          return;
        }
        throw profileError;
      }

      setActiveProfileId(profileData.id);

      // Get completed pages with retry mechanism
      const { data, error } = await supabase
        .from('page_completion')
        .select('page_id')
        .eq('profile_id', profileData.id)
        .eq('is_completed', true);

      if (error) throw error;

      const completedPageIds = new Set(data?.map(item => item.page_id) || []);
      setCompletedPages(completedPageIds);
      setRetryCount(0); // Reset retry count on success

      // Update progress and match quality
      const totalPages = 7; // Total number of profile pages
      const completedCount = completedPageIds.size;
      setProgress((completedCount / totalPages) * 100);
      setMatchQuality(Math.min(completedCount * 15, 100));

    } catch (error) {
      console.error('Error fetching completed pages:', error);
      
      if (attempt < MAX_RETRIES) {
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 8000);
        setTimeout(() => {
          fetchCompletedPages(attempt + 1);
        }, backoffDelay);
        setRetryCount(attempt + 1);
      } else {
        setCompletedPages(new Set());
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Watch for profile changes
  useEffect(() => {
    if (!user) {
      setActiveProfileId(null);
      setCompletedPages(new Set());
      setProgress(0);
      setMatchQuality(0);
      setIsLoading(false);
      return;
    }

    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchCompletedPages();
        }
      )
      .subscribe();

    fetchCompletedPages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchCompletedPages]);

  const handleComplete = async (pageId: string, onComplete: () => void) => {
    if (!user || !activeProfileId) return;

    try {
      const { error } = await supabase
        .from('page_completion')
        .upsert({
          profile_id: activeProfileId,
          page_id: pageId,
          is_completed: true,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'profile_id,page_id'
        });

      if (error) throw error;

      await fetchCompletedPages();
      scrollToTop();
      onComplete();
    } catch (error) {
      console.error('Error completing page:', error);
    }
  };

  const refreshData = async () => {
    await fetchCompletedPages();
  };

  return (
    <ProfileContext.Provider value={{ 
      progress, 
      matchQuality, 
      setProgress, 
      setMatchQuality,
      handleComplete,
      completedPages,
      isLoading,
      refreshData
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}