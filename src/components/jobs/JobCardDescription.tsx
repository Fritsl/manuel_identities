import React from 'react';

interface JobCardDescriptionProps {
  description: string;
}

export function JobCardDescription({ description }: JobCardDescriptionProps) {
  return (
    <p className="text-muted text-sm">{description}</p>
  );
}