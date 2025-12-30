import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../api/artic';

export const ArtworkDisplay = ({ artwork, isLoading }) => {
    if (!artwork && !isLoading) return <div className="absolute inset-0 bg-zinc-900" />;

    const imageUrl = artwork ? getImageUrl(artwork.image_id) : null;
    const title = artwork ? artwork.title : '';
    const artist = artwork ? artwork.artist_display : '';

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                {imageUrl && (
                    <motion.div
                        key={artwork.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover opacity-60"
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
