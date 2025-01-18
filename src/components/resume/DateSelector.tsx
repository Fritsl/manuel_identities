import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: string;
  isEndDate?: boolean;
  onPresentToggle?: (checked: boolean) => void;
  isPresent?: boolean;
}

export function DateSelector({ 
  label, 
  value, 
  onChange, 
  max, 
  isEndDate,
  onPresentToggle,
  isPresent
}: DateSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(() => {
    const date = value ? new Date(value) : new Date();
    return date.getFullYear();
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = value ? new Date(value) : new Date();
    return date.getMonth();
  });
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().slice(0, 7);
  const maxDate = max || today;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (year: number, month: number) => {
    const newDate = `${year}-${String(month + 1).padStart(2, '0')}`;
    if (newDate <= maxDate) {
      onChange(newDate);
      setIsCalendarOpen(false);
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center">
          <input
            type="text"
            value={isPresent ? 'Present' : formatDisplayDate(value)}
            readOnly
            disabled={isPresent}
            onClick={() => !isPresent && setIsCalendarOpen(true)}
            className={`block w-full rounded-lg shadow-sm pr-10 cursor-pointer
              ${isPresent 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
          />
          <Calendar 
            className={`absolute right-3 w-5 h-5 ${isPresent ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => !isPresent && setIsCalendarOpen(true)}
          />
        </div>

        {isCalendarOpen && !isPresent && (
          <div 
            ref={calendarRef}
            className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setSelectedYear(prev => prev - 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="mx-2 border-gray-300 rounded-md"
              >
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)
                  .map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
              </select>
              <button
                onClick={() => setSelectedYear(prev => prev + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }, (_, i) => {
                const monthDate = new Date(selectedYear, i);
                const monthStr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(monthDate);
                const isDisabled = `${selectedYear}-${String(i + 1).padStart(2, '0')}` > maxDate;
                const isSelected = selectedYear === new Date(value).getFullYear() && 
                                 i === new Date(value).getMonth();

                return (
                  <button
                    key={i}
                    onClick={() => handleDateSelect(selectedYear, i)}
                    disabled={isDisabled}
                    className={`p-2 rounded-md text-sm
                      ${isDisabled ? 'text-gray-300 cursor-not-allowed' :
                        isSelected ? 'bg-indigo-100 text-indigo-700' :
                        'hover:bg-gray-100'}`}
                  >
                    {monthStr}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isEndDate && onPresentToggle && (
          <label className="inline-flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={isPresent}
              onChange={(e) => onPresentToggle(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Current Position</span>
          </label>
        )}
      </div>
    </div>
  );
}