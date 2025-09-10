
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 mt-8">
      <p className="text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Sign Language Interpreter. Powered by Google Gemini.
      </p>
    </footer>
  );
};
