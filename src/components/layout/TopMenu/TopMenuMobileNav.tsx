import React from 'react';
import { Menu, X } from 'lucide-react';

interface TopMenuMobileNavProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function TopMenuMobileNav({ isMobileMenuOpen, setIsMobileMenuOpen }: TopMenuMobileNavProps) {
  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-md text-foreground hover:bg-secondary hover:text-secondary-foreground"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}