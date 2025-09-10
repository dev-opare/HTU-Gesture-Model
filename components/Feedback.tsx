import React from 'react';

interface FeedbackProps {
  onFeedback: (feedback: 'up' | 'down') => void;
  disabled: boolean;
}

const ThumbsUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.993 0-1.85-1.025-1.85-2.25V10.5a2.25 2.25 0 012.25-2.25h1.5v-1.5a2.25 2.25 0 012.25-2.25v1.5a1.5 1.5 0 011.5 1.5v1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h2v11H5V10z" />
  </svg>
);

const ThumbsDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.017c.993 0 1.85 1.025 1.85 2.25v8.25a2.25 2.25 0 01-2.25 2.25h-1.5v1.5a2.25 2.25 0 01-2.25 2.25v-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14h-2V3h2v11z" />
  </svg>
);

export const Feedback: React.FC<FeedbackProps> = ({ onFeedback, disabled }) => {
  const baseButtonClasses = "p-3 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-110";
  const upButtonClasses = "text-green-400 hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-400";
  const downButtonClasses = "text-red-400 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400";

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <button 
        onClick={() => onFeedback('up')} 
        disabled={disabled}
        className={`${baseButtonClasses} ${upButtonClasses}`}
        aria-label="Correct interpretation"
        title="Correct interpretation"
      >
        <ThumbsUpIcon />
      </button>
      <button 
        onClick={() => onFeedback('down')} 
        disabled={disabled}
        className={`${baseButtonClasses} ${downButtonClasses}`}
        aria-label="Incorrect interpretation"
        title="Incorrect interpretation"
      >
        <ThumbsDownIcon />
      </button>
    </div>
  );
};
