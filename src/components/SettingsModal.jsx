import React from 'react';
import { X } from 'lucide-react';

export const SettingsModal = ({
    isOpen,
    onClose,
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
    audioEnabled,
    setAudioEnabled
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-light text-white mb-6">Timer Settings</h2>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm text-zinc-400">Work Duration (minutes)</label>
                        <input
                            type="number"
                            value={workDuration}
                            onChange={(e) => setWorkDuration(Number(e.target.value))}
                            min="1"
                            max="60"
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-zinc-400">Break Duration (minutes)</label>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={(e) => setBreakDuration(Number(e.target.value))}
                            min="1"
                            max="60"
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="block text-sm text-zinc-400">Sound Notifications</label>
                        <button
                            onClick={() => setAudioEnabled(!audioEnabled)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${audioEnabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${audioEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-8 bg-white text-black py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
