import React from 'react';
import { RefreshCw } from 'lucide-react';

export function ProfileFormLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted">Loading your profile...</p>
      </div>
    </div>
  );
}