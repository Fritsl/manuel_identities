import React from 'react';

export function TimelineLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500" />
        <span className="text-sm text-gray-700 font-medium">Work</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-sm text-gray-700 font-medium">Education</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-purple-500" />
        <span className="text-sm text-gray-700 font-medium">Other</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-3 bg-red-100 border-2 border-dashed border-red-300" />
        <span className="text-sm text-gray-700 font-medium">Gap</span>
      </div>
    </div>
  );
}