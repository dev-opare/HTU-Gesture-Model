
import { useState, useEffect, useCallback } from 'react';
import type { CameraPermissionStatus } from '../types';

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<CameraPermissionStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const requestCamera = useCallback(async () => {
    setPermissionStatus('prompt');
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: "user" 
        },
        audio: false,
      });
      setStream(mediaStream);
      setPermissionStatus('granted');
    } catch (err) {
      console.error("Camera access denied:", err);
      if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setError('Camera access was denied. Please enable it in your browser settings.');
            setPermissionStatus('denied');
          } else {
            setError('Could not access the camera. Please ensure it is not in use by another application.');
            setPermissionStatus('denied');
          }
      } else {
        setError('An unknown error occurred while accessing the camera.');
        setPermissionStatus('denied');
      }
    }
  }, []);

  // Cleanup stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return { stream, permissionStatus, error, requestCamera };
};
