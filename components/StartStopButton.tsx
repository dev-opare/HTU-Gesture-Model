import React from 'react';

interface StartStopButtonProps {
    isDetecting: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const PlayIcon = () => (
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const StopIcon = () => (
     <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);


export const StartStopButton: React.FC<StartStopButtonProps> = ({ isDetecting, onClick, disabled = false }) => {
    const baseClasses = "px-8 py-4 w-64 text-lg font-bold rounded-full focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg transform";
    const activeClasses = "hover:scale-105";
    const disabledClasses = "opacity-50 cursor-not-allowed";
    const startClasses = "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white focus:ring-green-300";
    const stopClasses = "bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white focus:ring-red-300";

    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseClasses} ${isDetecting ? stopClasses : startClasses} ${disabled ? disabledClasses : activeClasses}`}
        >
            {isDetecting ? <StopIcon /> : <PlayIcon />}
            {isDetecting ? 'Stop Detection' : 'Start Detection'}
        </button>
    );
};