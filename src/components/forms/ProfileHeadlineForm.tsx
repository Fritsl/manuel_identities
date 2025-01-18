import React, { useState, useEffect } from 'react';
import { CompleteButton } from '../CompleteButton';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../contexts/ProfileContext';
import { Loader2 } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ProfileHeadlineFormProps {
  value: string;
  onChange: (value: string) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function ProfileHeadlineForm({ value, onChange, onComplete, isCompleted }: ProfileHeadlineFormProps) {
  const { user } = useAuth();
  const { handleComplete } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user || initialFetchDone) return;

      try {
        // First, check if user has any identities
        const { data: identitiesData, error: identitiesError } = await supabase
          .from('identities')
          .select('id, is_active')
          .eq('user_id', user.id);

        if (identitiesError) throw identitiesError;

        let currentProfileId: string;

        if (!identitiesData || identitiesData.length === 0) {
          // Create first identity if none exist
          const { data: newProfile, error: createError } = await supabase
            .from('identities')
            .insert({
              user_id: user.id,
              name: 'Default Profile',
              is_active: true
            })
            .select()
            .single();

          if (createError) throw createError;
          currentProfileId = newProfile.id;
        } else {
          // Find active identity or set first one as active
          const activeProfile = identitiesData.find(p => p.is_active);
          if (activeProfile) {
            currentProfileId = activeProfile.id;
          } else {
            // Set first identity as active
            const firstProfile = identitiesData[0];
            const { error: updateError } = await supabase
              .from('identities')
              .update({ is_active: true })
              .eq('id', firstProfile.id);

            if (updateError) throw updateError;
            currentProfileId = firstProfile.id;
          }
        }

        setActiveProfileId(currentProfileId);

        // Fetch headline for active identity
        const { data: headlineData, error: headlineError } = await supabase
          .from('identity_headlines')
          .select('headline')
          .eq('identity_id', currentProfileId)
          .maybeSingle();

        if (headlineError) throw headlineError;
        if (headlineData && !value) {
          onChange(headlineData.headline);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load identity data. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
        setInitialFetchDone(true);
      }
    }

    fetchData();
  }, [user, onChange, value, initialFetchDone]);

  const handleSave = async () => {
    if (!user || !activeProfileId || !value.trim()) return;

    setIsSaving(true);
    setError(null);

    try {
      const { error: headlineError } = await supabase
        .from('identity_headlines')
        .upsert({
          identity_id: activeProfileId,
          headline: value.trim(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'identity_id'
        });

      if (headlineError) throw headlineError;
      await handleComplete('identity-headline', onComplete);
    } catch (error) {
      console.error('Error saving headline:', error);
      setError('Failed to save headline. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Describe yourself in a headline
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Senior Software Engineer specializing in cloud architecture and distributed systems"
            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CompleteButton
          onComplete={handleSave}
          isCompleted={isCompleted}
          isDisabled={!value.trim() || isSaving}
        />
      </div>
    </div>
  );
}