import React from 'react';
import { motion } from 'framer-motion';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const TimerDisplay = ({ timeLeft, duration, mode, radius = 120, stroke = 4 }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const totalSeconds = duration * 60;
    const progress = totalSeconds > 0 ? (timeLeft / totalSeconds) : 0;
    const strokeDashoffset = circumference - (progress * circumference);

    const color = mode === 'work' ? 'text-white' : 'text-emerald-400';
    const ringColor = mode === 'work' ? 'stroke-white' : 'stroke-emerald-400';

    return (
        <div className="relative flex items-center justify-center">
            {/* SVG Container for Circular Progress */}
            <svg
                height={radius * 2}
                width={radius * 2}
                className="rotate-[-90deg] drop-shadow-lg"
            >
                <circle
                    className="stroke-black/30"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <motion.circle
                    className={ringColor}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.5, ease: "linear" }}
                />
            </svg>

            {/* Timer Text Overlay */}
            <div className={`absolute text-6xl font-light tracking-widest ${color} drop-shadow-md`}>
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};
