import React from 'react';
import { Navigation } from '../Navigation';
import { FormPage } from '../../types';

interface ProfileFormLayoutProps {
  children: React.ReactNode;
  isNavOpen: boolean;
  pages: FormPage[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  matchQuality: number;
  remainingPages: number;
}

export function ProfileFormLayout({
  children,
  isNavOpen,
  pages,
  currentPageId,
  onPageSelect,
  matchQuality,
  remainingPages
}: ProfileFormLayoutProps) {
  return (
    <div className="flex-1 flex flex-col md:flex-row">
      <div className="flex-1 flex justify-center overflow-y-auto">
        {children}
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
          pages={pages}
          currentPageId={currentPageId}
          onPageSelect={onPageSelect}
          matchQuality={matchQuality}
          remainingPages={remainingPages}
        />
      </div>
    </div>
  );
}