import React from 'react';

interface JobCardActionProps {
  onViewDetails: () => void;
  credits: number;
}

export function JobCardAction({ onViewDetails, credits }: JobCardActionProps) {
  return (
    <button
      onClick={onViewDetails}
      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
    >
      View details ({credits} credits)
    </button>
  );
}