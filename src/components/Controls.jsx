import React from 'react';
import { Play, Pause, RotateCcw, Settings, Maximize2, Minimize2, SkipForward } from 'lucide-react';

export const Controls = ({
    isActive,
    onToggle,
    onReset,
    onSkip,
    onSettings,
    isFullscreen,
    onToggleFullscreen
}) => {
    const btnClass = "p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-all duration-200 hover:scale-110 active:scale-95";

    return (
        <div className="flex items-center gap-4 z-10">
            <button
                onClick={onSettings}
                className={btnClass}
                title="Settings"
            >
                <Settings size={24} />
            </button>

            <div className="flex items-center gap-2">
                <button
                    onClick={onReset}
                    className={btnClass}
                    title="Reset Timer"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={onToggle}
                    className={`${btnClass} !p-5 !bg-white/10 hover:!bg-white/20 ring-1 ring-white/30`}
                    title={isActive ? "Pause" : "Start"}
                >
                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>

                <button
                    onClick={onSkip}
                    className={btnClass}
                    title="Skip Session"
                >
                    <SkipForward size={24} />
                </button>
            </div>

            <button
                onClick={onToggleFullscreen}
                className={btnClass}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
            </button>
        </div>
    );
};
