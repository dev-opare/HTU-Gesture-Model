
import React from 'react';

interface PermissionPromptProps {
  status: 'idle' | 'denied';
  onGrant: () => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55a1 1 0 011.45.89V18a1 1 0 01-1 1h-14a1 1 0 01-1-1V7a1 1 0 011-1h5.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10V6a2 2 0 00-2-2H9a2 2 0 00-2 2v4m10 5l-2.5-2.5M15 15l2.5 2.5" />
    </svg>
);


export const PermissionPrompt: React.FC<PermissionPromptProps> = ({ status, onGrant }) => {
  const content = {
    idle: {
      title: "Enable Your Camera",
      message: "To begin interpreting sign language, please grant access to your camera.",
      buttonText: "Grant Access"
    },
    denied: {
      title: "Camera Access Denied",
      message: "You have denied camera access. Please enable it in your browser's settings to use this feature.",
      buttonText: "Try Again"
    }
  };

  const { title, message, buttonText } = content[status];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 max-w-md mx-auto">
      <CameraIcon />
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-6 text-center">{message}</p>
      <button 
        onClick={onGrant}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};
