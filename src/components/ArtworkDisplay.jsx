import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../api/artic';

export const ArtworkDisplay = ({ artwork, isLoading, isActive, isShortViewport }) => {
    if (!artwork && !isLoading) return <div className="absolute inset-0 bg-zinc-900" />;

    const imageUrl = artwork ? getImageUrl(artwork.image_id) : null;
    const title = artwork ? artwork.title : '';
    const artist = artwork ? artwork.artist_display : '';

    // Determine animation direction based on aspect ratios
    const animationVariants = useMemo(() => {
        if (!artwork || !artwork.width || !artwork.height) {
            // Default fallback if no dimensions: slight zoom
            return {
                initial: { opacity: 0, scale: 1.1 },
                animate: {
                    opacity: 1,
                    scale: isActive ? 1.05 : 1,
                    transition: { duration: 1.5, ease: "easeInOut" }
                },
            };
        }

        const artAspect = artwork.width / artwork.height;

        const isPanoramic = artAspect > 1.2;
        const isTall = artAspect < 0.8;

        if (isTall) {
            // Tall artwork: Pan Y (top to bottom)
            return {
                animate: {
                    objectPosition: isActive ? ["50% 0%", "50% 100%"] : "50% 50%",
                    opacity: 1,
                    transition: {
                        objectPosition: {
                            duration: 10, // Faster for testing
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        },
                        opacity: { duration: 1.5 }
                    }
                }
            };
        } else if (isPanoramic) {
            // Wide artwork: Pan X (right to left)
            return {
                animate: {
                    objectPosition: isActive ? ["100% 50%", "0% 50%"] : "50% 50%",
                    opacity: 1,
                    transition: {
                        objectPosition: {
                            duration: 10, // Faster for testing
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        },
                        opacity: { duration: 1.5 }
                    }
                }
            };
        }

        // Square-ish: Gentle Zoom
        return {
            animate: {
                scale: isActive ? [1, 1.1] : 1,
                opacity: 1,
                transition: {
                    scale: {
                        duration: 5, // Faster for testing
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse"
                    },
                    opacity: { duration: 1.5 }
                }
            }
        };

    }, [artwork, isActive]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                {imageUrl && (
                    <motion.div
                        key={artwork.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 1.5, ease: "easeInOut" } }}
                        className="absolute inset-0"
                    >
                        <motion.img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover opacity-60"
                            animate={animationVariants.animate}
                            transition={animationVariants.animate.transition}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
                    </motion.div>
                )}
            </AnimatePresence>

            {(title || artist) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`meta-${artwork?.id}`}
                    className="absolute bottom-8 left-8 right-8 text-center md:text-left md:max-w-xl z-10"
                >
                    <h2 className="text-xl md:text-2xl font-serif font-light text-white mb-1 drop-shadow-lg">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base text-zinc-300 font-light drop-shadow-md">
                        {artist}
                    </p>
                </motion.div>
            )}
        </div>
    );
};
