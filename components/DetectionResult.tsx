import React from 'react';

interface DetectionResultProps {
  sign: string;
}

export const DetectionResult: React.FC<DetectionResultProps> = ({ sign }) => {
  return (
    <div className="flex-grow bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg min-h-[80px] flex items-center justify-center">
      <p className="text-2xl md:text-4xl font-semibold text-cyan-300 tracking-wider truncate px-2">
        {sign}
      </p>
    </div>
  );
};
