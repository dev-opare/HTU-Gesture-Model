import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WebcamFeed } from './components/WebcamFeed';
import { DetectionResult } from './components/DetectionResult';
import { PermissionPrompt } from './components/PermissionPrompt';
import { LoadingIndicator } from './components/LoadingIndicator';
import { StartStopButton } from './components/StartStopButton';
import { Feedback } from './components/Feedback';
import { DetectionIntervalSlider } from './components/DetectionIntervalSlider';
import { LanguageSelector } from './components/LanguageSelector';
import { useCamera } from './hooks/useCamera';
import { detectSign } from './services/geminiService';
import type { CameraPermissionStatus, SignLanguage } from './types';

const App: React.FC = () => {
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [displayResult, setDisplayResult] = useState<string>('...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [detectionInterval, setDetectionInterval] = useState<number>(2000);
  const [selectedLanguage, setSelectedLanguage] = useState<SignLanguage>('ASL');
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  const { stream, permissionStatus, requestCamera } = useCamera();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isProcessingRef = useRef<boolean>(false);
  const detectionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleRateLimitError = useCallback(() => {
    setError('Rate limit reached. Automatically switching to a slower speed. Please try again.');
    setIsDetecting(false);
    setDetectionInterval(3500); // Force a slower, safer speed
  }, []);

  const handleQuotaError = useCallback(() => {
    setError('Daily API quota exceeded. Please try again tomorrow.');
    setIsDetecting(false);
    setQuotaExceeded(true);
  }, []);

  const captureFrameAndDetect = useCallback(async () => {
    if (isProcessingRef.current || !videoRef.current || !canvasRef.current) {
      return;
    }

    isProcessingRef.current = true;
    setIsLoading(true);
    setFeedbackMessage(null);
    setError(null);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      setError('Could not get canvas context.');
      isProcessingRef.current = false;
      setIsLoading(false);
      return;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    const base64Image = imageDataUrl.split(',')[1];

    try {
      const result = await detectSign(base64Image, selectedLanguage);
      if (result && result !== 'No sign detected') {
        setDisplayResult(result);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message === 'DAILY_QUOTA_EXCEEDED') {
          handleQuotaError();
        } else if (err.message === 'RATE_LIMIT_EXCEEDED') {
          handleRateLimitError();
        } else {
          setError('Failed to detect sign. Please try again.');
        }
      } else {
        setError('Failed to detect sign. Please try again.');
      }
      setDisplayResult('Error');
    } finally {
      isProcessingRef.current = false;
      setIsLoading(false);
    }
  }, [selectedLanguage, handleRateLimitError, handleQuotaError]);

  useEffect(() => {
    if (isDetecting && !quotaExceeded) {
      detectionIntervalRef.current = setInterval(() => {
        captureFrameAndDetect();
      }, detectionInterval);
    } else {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [isDetecting, captureFrameAndDetect, detectionInterval, quotaExceeded]);

  const handleToggleDetection = () => {
    if (quotaExceeded) return;
    if (permissionStatus !== 'granted') {
      requestCamera();
      return;
    }
    setError(null);
    
    const willBeDetecting = !isDetecting;
    setIsDetecting(willBeDetecting);

    if (willBeDetecting) {
      setDisplayResult('...');
      setFeedbackMessage(null);
    }
  };
  
  const handleFeedback = useCallback((feedback: 'up' | 'down') => {
    if (displayResult && displayResult !== '...' && displayResult !== 'Error') {
        console.log(`Feedback received: ${feedback.toUpperCase()} for sign: "${displayResult}"`);
        setFeedbackMessage('Thanks for your feedback!');
        setTimeout(() => setFeedbackMessage(null), 2000);
    }
  }, [displayResult]);

  const handleIntervalChange = (newInterval: number) => {
    setDetectionInterval(newInterval);
  };

  const handleLanguageChange = (language: SignLanguage) => {
    setSelectedLanguage(language);
  };

  const renderContent = (status: CameraPermissionStatus) => {
    switch (status) {
      case 'denied':
        return <PermissionPrompt status="denied" onGrant={requestCamera} />;
      case 'idle':
      case 'prompt':
        return <PermissionPrompt status="idle" onGrant={requestCamera} />;
      case 'granted':
        const isFeedbackDisabled = isLoading || !!feedbackMessage || !displayResult || displayResult === '...' || displayResult === 'Error';
        const controlsDisabled = isDetecting || quotaExceeded;
        return (
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-4 border-gray-700 shadow-2xl bg-black">
              <WebcamFeed stream={stream} ref={videoRef} />
              {isLoading && <LoadingIndicator message={'ANALYZING...'} />}
            </div>
            <div className="w-full flex items-center justify-center gap-2 md:gap-4">
              <DetectionResult sign={displayResult} />
              <Feedback onFeedback={handleFeedback} disabled={isFeedbackDisabled} />
            </div>
            <div className="h-6 text-center">
              {feedbackMessage && <p className="text-green-400 animate-pulse">{feedbackMessage}</p>}
            </div>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              disabled={controlsDisabled}
            />
            <StartStopButton isDetecting={isDetecting} onClick={handleToggleDetection} disabled={quotaExceeded} />
            <DetectionIntervalSlider
              interval={detectionInterval}
              onIntervalChange={handleIntervalChange}
              disabled={controlsDisabled}
            />
          </div>
        );
      default:
        return <p className="text-red-500">An unexpected error occurred.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans p-4 md:p-6">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        {renderContent(permissionStatus)}
        {error && <p className="mt-4 text-red-400 font-semibold">{error}</p>}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </main>
      <Footer />
    </div>
  );
};

export default App;
