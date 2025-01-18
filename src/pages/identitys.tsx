import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Copy, Pencil, Trash2, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Profile {
  id: string;
  identity_number: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function Identities() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [identities, setIdentities] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [headlines, setHeadlines] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchIdentities();
  }, [user]);

  const fetchIdentities = async () => {
    if (!user) return;

    try {
      // Fetch identities
      const { data: identitiesData, error: identitiesError } = await supabase
        .from('identities')
        .select('*')
        .order('created_at', { ascending: false });

      if (identitiesError) throw identitiesError;

      // Fetch headlines for all identities
      const { data: headlinesData, error: headlinesError } = await supabase
        .from('identity_headlines')
        .select('identity_id, headline');

      if (headlinesError) throw headlinesError;

      // Create headlines lookup object
      const headlinesLookup = headlinesData?.reduce((acc, curr) => ({
        ...acc,
        [curr.identity_id]: curr.headline
      }), {});

      setIdentities(identitiesData || []);
      setHeadlines(headlinesLookup || {});
    } catch (error) {
      console.error('Error fetching identities:', error);
      setError('Failed to load identities. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    if (!user || isProcessing) return;

    setIsProcessing(true);
    try {
      const { data, error } = await supabase
        .from('identities')
        .insert({
          user_id: user.id,
          is_active: identities.length === 0 // Make active if it's the first identity
        })
        .select()
        .single();

      if (error) throw error;
      
      setIdentities(prev => [data, ...prev]);
      navigate('/');
    } catch (error) {
      console.error('Error creating identity:', error);
      setError('Failed to create identity. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDuplicate = async (identity: Profile) => {
    if (!user || isProcessing) return;

    setIsProcessing(true);
    try {
      const { data, error } = await supabase
        .from('identities')
        .insert({
          user_id: user.id,
          is_active: false
        })
        .select()
        .single();

      if (error) throw error;

      // Copy headline if exists
      if (headlines[identity.id]) {
        const { error: headlineError } = await supabase
          .from('identity_headlines')
          .insert({
            identity_id: data.id,
            headline: headlines[identity.id]
          });

        if (headlineError) throw headlineError;
      }

      setIdentities(prev => [data, ...prev]);
      setHeadlines(prev => ({
        ...prev,
        [data.id]: headlines[identity.id]
      }));
    } catch (error) {
      console.error('Error duplicating identity:', error);
      setError('Failed to duplicate identity. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user || isProcessing) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('identities')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setIdentities(identities.filter(p => p.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting identity:', error);
      setError('Failed to delete identity. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSetActive = async (id: string) => {
    if (!user || isProcessing) return;

    setIsProcessing(true);
    try {
      // First, deactivate all identities
      await supabase
        .from('identities')
        .update({ is_active: false })
        .eq('user_id', user.id);

      // Then activate the selected identity
      const { error } = await supabase
        .from('identities')
        .update({ is_active: true })
        .eq('id', id);

      if (error) throw error;

      setIdentities(identities.map(p => ({
        ...p,
        is_active: p.id === id
      })));
    } catch (error) {
      console.error('Error setting active identity:', error);
      setError('Failed to set active identity. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = async (identity: Profile) => {
    if (!user || isProcessing) return;

    if (!identity.is_active) {
      setIsProcessing(true);
      try {
        await handleSetActive(identity.id);
      } catch (error) {
        console.error('Error setting identity active:', error);
        setError('Failed to set identity active. Please try again.');
        return;
      } finally {
        setIsProcessing(false);
      }
    }
    
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted">Loading identities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Your Identities</h1>
              <p className="text-muted mt-1">
                Create and manage different identities for various job searches
              </p>
            </div>
            <button
              onClick={handleCreateProfile}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              New Profile
            </button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {identities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted">No identities yet. Create your first identity to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {identities.map(identity => (
                <div
                  key={identity.id}
                  className={`bg-card rounded-lg border ${
                    identity.is_active ? 'border-primary' : 'border-border'
                  } p-6 space-y-4`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {headlines[identity.id] || 'No headline set'}
                      </h3>
                    </div>
                    {identity.is_active && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <CheckCircle2 className="w-4 h-4" />
                        Active
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Clock className="w-4 h-4" />
                      Updated {new Date(identity.updated_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(identity)}
                        disabled={isProcessing}
                        className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit identity"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(identity)}
                        disabled={isProcessing}
                        className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Duplicate identity"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(identity.id)}
                        disabled={isProcessing}
                        className="p-2 text-muted hover:text-destructive hover:bg-destructive/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete identity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {!identity.is_active && (
                      <button
                        onClick={() => handleSetActive(identity.id)}
                        disabled={isProcessing}
                        className="text-sm text-primary hover:text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Set as active
                      </button>
                    )}
                  </div>

                  {showDeleteConfirm === identity.id && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-card p-6 rounded-lg border border-border shadow-lg max-w-sm w-full mx-4">
                        <h4 className="text-lg font-semibold text-foreground">Delete Profile?</h4>
                        <p className="text-muted mt-2">
                          Are you sure you want to delete this identity? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            disabled={isProcessing}
                            className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(identity.id)}
                            disabled={isProcessing}
                            className="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}