import React from 'react';
import { UserCircle, ChevronDown, Users, Coins, LogOut } from 'lucide-react';

interface TopMenuAccountDropdownProps {
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function TopMenuAccountDropdown({
  isOpen,
  dropdownRef,
  onSignOut,
  onNavigate,
  setIsOpen
}: TopMenuAccountDropdownProps) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-3 rounded-md flex items-center gap-1.5 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all active:scale-95 whitespace-nowrap"
      >
        <UserCircle className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium">Account</span>
        <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border py-1 z-[110]">
          <button
            onClick={() => {
              onNavigate('/profiles');
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Profiles</span>
          </button>
          <button
            onClick={() => {
              onNavigate('/credits');
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <Coins className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">150 Credits</span>
          </button>
          <button
            onClick={onSignOut}
            className="w-full px-4 py-2 text-left flex items-center gap-2 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}