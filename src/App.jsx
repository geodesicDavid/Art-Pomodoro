import React, { useState, useEffect, useRef } from 'react';
import { useTimer } from './hooks/useTimer';
import { useArticApi } from './hooks/useArticApi';
import { useSound } from './hooks/useSound';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { ArtworkDisplay } from './components/ArtworkDisplay';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const {
    timeLeft,
    isActive,
    mode,
    sessionCount,
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
    toggleTimer,
    resetTimer,
    skipSession
  } = useTimer();

  const { currentArtwork, advanceArtwork, isLoading } = useArticApi();
  const { playChime } = useSound();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Audio settings with persistence
  const [audioEnabled, setAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('art_pomodoro_audio_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('art_pomodoro_audio_enabled', JSON.stringify(audioEnabled));
  }, [audioEnabled]);

  // Ref for previous session count to detect changes
  const prevSessionCount = useRef(sessionCount);

  // Advance artwork and play sound on session completion
  useEffect(() => {
    if (sessionCount > prevSessionCount.current) {
      advanceArtwork();
      if (audioEnabled) {
        playChime();
      }
      prevSessionCount.current = sessionCount;
    }
  }, [sessionCount, advanceArtwork, audioEnabled, playChime]);

  // Handle Fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleToggleTimer = () => {
    toggleTimer();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-white font-sans selection:bg-emerald-500/30">

      {/* Background Artwork */}
      <ArtworkDisplay artwork={currentArtwork} isLoading={isLoading} />

      {/* Main UI Container */}
      <div className={`relative z-10 flex flex-col items-center gap-8 transition-opacity duration-300 ${isFullscreen && isActive ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>

        {/* Header / Mode Indicator */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-light tracking-widest uppercase drop-shadow-md">
            {mode === 'work' ? 'Focus' : 'Break'}
          </h1>
          <p className="text-sm font-light text-white/50 tracking-wider">
            Session {sessionCount + 1}
          </p>
        </div>

        {/* Timer */}
        <TimerDisplay
          timeLeft={timeLeft}
          duration={mode === 'work' ? workDuration : breakDuration}
          mode={mode}
        />

        {/* Controls */}
        <Controls
          isActive={isActive}
          onToggle={handleToggleTimer}
          onReset={resetTimer}
          onSkip={skipSession}
          onSettings={() => setIsSettingsOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        workDuration={workDuration}
        breakDuration={breakDuration}
        setWorkDuration={setWorkDuration}
        setBreakDuration={setBreakDuration}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

    </div>
  );
}

export default App;
