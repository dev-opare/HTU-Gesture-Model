import React from 'react';
import type { SignLanguage } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: SignLanguage;
  onLanguageChange: (language: SignLanguage) => void;
  disabled?: boolean;
}

const LanguageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m4 13l4-4M19 9l-4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, disabled = false }) => {
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-2 mb-4">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-400 self-start">
        Sign Language
      </label>
      <div className="relative w-full">
        <LanguageIcon />
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value as SignLanguage)}
          disabled={disabled}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Select sign language"
        >
          <option value="ASL">American Sign Language (ASL)</option>
          <option value="GSL">Ghanaian Sign Language (GSL)</option>
        </select>
      </div>
    </div>
  );
};