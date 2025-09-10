import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'ANALYZING...' }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
         <p className="text-white mt-3 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};
