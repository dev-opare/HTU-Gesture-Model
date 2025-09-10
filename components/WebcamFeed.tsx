
import React, { useEffect, forwardRef } from 'react';

interface WebcamFeedProps {
  stream: MediaStream | null;
}

export const WebcamFeed = forwardRef<HTMLVideoElement, WebcamFeedProps>(({ stream }, ref) => {
  
  useEffect(() => {
    if (ref && 'current' in ref && ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream, ref]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover transform scale-x-[-1]"
    />
  );
});

WebcamFeed.displayName = 'WebcamFeed';
