import { useState, useEffect, useCallback } from 'react';
import { fetchRandomArtwork, getImageUrl } from '../api/artic';

export const useArticApi = () => {
    const [currentArtwork, setCurrentArtwork] = useState(null);
    const [nextArtwork, setNextArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper to preload image
    const preloadImage = (imageId) => {
        if (!imageId) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = getImageUrl(imageId);
            img.onload = resolve;
            img.onerror = reject;
        });
    };

    const loadNextArtwork = useCallback(async () => {
        try {
            const art = await fetchRandomArtwork();
            if (art.image_id) {
                await preloadImage(art.image_id);
            }
            return art;
        } catch (err) {
            console.error("Failed to load next artwork", err);
            return null;
        }
    }, []);

    // Initial load
    useEffect(() => {
        let mounted = true;

        const init = async () => {
            setIsLoading(true);
            try {
                // Load initial current
                const art = await fetchRandomArtwork();
                if (mounted) setCurrentArtwork(art);

                // Preload next in background
                const next = await fetchRandomArtwork();
                if (mounted) {
                    setNextArtwork(next);
                    if (next && next.image_id) {
                        preloadImage(next.image_id).catch(() => { });
                    }
                }
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        init();

        return () => { mounted = false; };
    }, []);

    // Advancing to next artwork
    const advanceArtwork = useCallback(async () => {
        if (nextArtwork) {
            setCurrentArtwork(nextArtwork);
            // Fetch new next
            const newNext = await loadNextArtwork();
            setNextArtwork(newNext);
        } else {
            // If no next available (loading/error), fetch fresh
            setIsLoading(true);
            try {
                const art = await fetchRandomArtwork();
                setCurrentArtwork(art);
                const next = await fetchRandomArtwork();
                setNextArtwork(next);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
    }, [nextArtwork, loadNextArtwork]);

    return {
        currentArtwork,
        nextArtwork,
        isLoading,
        error,
        advanceArtwork
    };
};
