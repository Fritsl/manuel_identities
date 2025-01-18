import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onToggleNav: () => void;
}

export function Header({ title, onToggleNav }: HeaderProps) {
  return (
    <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <button
        onClick={onToggleNav}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    </div>
  );
}