import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEYS = {
    WORK_DURATION: 'art_pomodoro_work_duration',
    BREAK_DURATION: 'art_pomodoro_break_duration'
};

export const useTimer = ({
    initialWorkDuration = 25,
    initialBreakDuration = 5
} = {}) => {
    // Initialize from localStorage or defaults
    const [workDuration, setWorkDuration] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.WORK_DURATION);
        return saved ? parseInt(saved, 10) : initialWorkDuration;
    });

    const [breakDuration, setBreakDuration] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.BREAK_DURATION);
        return saved ? parseInt(saved, 10) : initialBreakDuration;
    });

    // Persist settings when they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.WORK_DURATION, workDuration.toString());
    }, [workDuration]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.BREAK_DURATION, breakDuration.toString());
    }, [breakDuration]);

    const [timeLeft, setTimeLeft] = useState(workDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' | 'break'
    const [sessionCount, setSessionCount] = useState(0);

    const timerRef = useRef(null);

    // When duration changes, if we are in that mode and not active, update time left
    useEffect(() => {
        if (!isActive) {
            if (mode === 'work') {
                setTimeLeft(workDuration * 60);
            } else {
                setTimeLeft(breakDuration * 60);
            }
        }
    }, [workDuration, breakDuration, mode, isActive]);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
        if (timerRef.current) clearInterval(timerRef.current);
    }, [mode, workDuration, breakDuration]);

    const toggleTimer = useCallback(() => {
        setIsActive(!isActive);
    }, [isActive]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timerRef.current);
            setIsActive(false);
            handleSessionComplete();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const handleSessionComplete = () => {
        if (mode === 'work') {
            setSessionCount(prev => prev + 1);
            setMode('break');
            setTimeLeft(breakDuration * 60);
        } else {
            setMode('work');
            setTimeLeft(workDuration * 60);
        }
    };

    const skipSession = useCallback(() => {
        handleSessionComplete();
    }, [mode, breakDuration, workDuration]);

    return {
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
    };
};
