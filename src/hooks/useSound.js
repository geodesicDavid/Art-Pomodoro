import { useCallback } from 'react';

export const useSound = () => {
    const playChime = useCallback(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Bell-like envelope
        const now = ctx.currentTime;

        // Sine wave for soft tone
        osc.type = 'sine';

        // Pitch: E5 (659.25 Hz) or something pleasant
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // Slide up to C6 for brightness

        // Volume envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5); // Decay

        osc.start(now);
        osc.stop(now + 2.5);

        // Add a second harmonic for richness
        const osc2 = ctx.createOscillator();
        const gainNode2 = ctx.createGain();
        osc2.connect(gainNode2);
        gainNode2.connect(ctx.destination);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(523.25 * 2, now); // Octave up

        gainNode2.gain.setValueAtTime(0, now);
        gainNode2.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 2);

        osc2.start(now);
        osc2.stop(now + 2);

    }, []);

    return { playChime };
};
