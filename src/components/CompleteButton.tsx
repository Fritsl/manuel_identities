import React from 'react';

interface CompleteButtonProps {
  onComplete: () => void;
  isCompleted?: boolean;
  isDisabled?: boolean;
}

export function CompleteButton({ onComplete, isCompleted, isDisabled }: CompleteButtonProps) {
  return (
    <button
      onClick={onComplete}
      disabled={isDisabled}
      className={`w-full md:w-auto px-6 py-2 rounded-lg transition-colors ${
        isDisabled
          ? 'bg-muted/10 text-muted border border-muted/20 cursor-not-allowed'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      }`}
    >
      {isCompleted ? 'Update' : 'Mark as Completed'}
    </button>
  );
}