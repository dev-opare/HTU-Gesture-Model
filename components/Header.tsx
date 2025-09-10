
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-4 md:py-6">
      <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        HTU Real-Time Sign Language Interpreter
      </h1>
      <p className="text-gray-400 mt-2 text-sm md:text-base">
        Using Gemini to bridge communication gaps instantly.
      </p>
    </header>
  );
};
