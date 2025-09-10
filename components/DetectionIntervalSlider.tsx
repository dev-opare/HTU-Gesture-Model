import React from 'react';

interface DetectionIntervalSliderProps {
  interval: number;
  onIntervalChange: (interval: number) => void;
  disabled?: boolean;
}

export const DetectionIntervalSlider: React.FC<DetectionIntervalSliderProps> = ({ interval, onIntervalChange, disabled = false }) => {
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-2 mt-4" aria-live="polite">
      <label htmlFor="interval-slider" className="text-sm font-medium text-gray-400">
        Detection Speed: <span className="font-bold text-cyan-300 tabular-nums">{(interval / 1000).toFixed(1)}s</span>
      </label>
      <input
        id="interval-slider"
        type="range"
        min="1500"
        max="5000"
        step="100"
        value={interval}
        onChange={(e) => onIntervalChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Detection interval slider"
      />
      <div className="w-full flex justify-between text-xs text-gray-500 px-1">
        <span>Faster</span>
        <span>Slower</span>
      </div>
    </div>
  );
};