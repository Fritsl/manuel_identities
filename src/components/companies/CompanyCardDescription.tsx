import React from 'react';

interface CompanyCardDescriptionProps {
  description: string;
}

export function CompanyCardDescription({ description }: CompanyCardDescriptionProps) {
  return (
    <p className="mt-4 text-muted text-sm">{description}</p>
  );
}