import { Pause, Play } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
    src: string;
    autoPlay?: boolean;
    className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    autoPlay = false,
    className = '',
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const handlePlayPause = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div
            className={`group relative w-full h-full flex items-center justify-center ${className}`}
        >
            <video
                ref={videoRef}
                src={src}
                autoPlay={autoPlay}
                className="w-full h-full object-contain"
                onClick={handlePlayPause}
            />
            <button
                type="button"
                onClick={handlePlayPause}
                className="cursor-pointer absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                tabIndex={-1}
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            >
                {isPlaying ? (
                    <Pause
                        size={64}
                        className="text-white drop-shadow-lg bg-black/50 rounded-full p-4  backdrop-blur-sm"
                    />
                ) : (
                    <Play
                        size={64}
                        className="text-white drop-shadow-lg bg-black/50 rounded-full p-4  backdrop-blur-sm"
                    />
                )}
            </button>
        </div>
    );
};
