'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';
import { useAudioPlayer } from './hook';
import { AudioPlayerProps } from './types';

export function AudioPlayer({
    title,
    subtitle,
    description,
    audioSrc,
    cover,
    background = 'bg-primary',
    className,
    watermarkIcon,
}: AudioPlayerProps) {
    const { isPlaying, audioRef, togglePlay, setIsPlaying } = useAudioPlayer();

    return (
        <div
            className={cn(
                `rounded-4xl shadow-none flex flex-row items-stretch text-white max-w-xl relative overflow-hidden`,
                background,
                className,
            )}
        >
            <div className="flex flex-col flex-1 justify-between p-6 z-10">
                <div>
                    <h2 className="text-3xl font-bold leading-tight mb-1">
                        {title}
                    </h2>

                    {subtitle && (
                        <div className="text-base mb-2">{subtitle}</div>
                    )}

                    {description && (
                        <p className="text-sm text-white mb-4">{description}</p>
                    )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                    <Button
                        onClick={togglePlay}
                        size="icon"
                        className="rounded-full bg-white text-zinc-900 hover:bg-zinc-200 size-26"
                        aria-label={isPlaying ? 'Pausar' : 'Tocar'}
                    >
                        {isPlaying ? (
                            <Pause className="size-10" />
                        ) : (
                            <Play className="size-10" />
                        )}
                    </Button>

                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        onEnded={() => setIsPlaying(false)}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    />
                </div>
            </div>

            {cover && (
                <div className="w-40 h-40 flex-shrink-0 rounded-r-xl overflow-hidden bg-zinc-800 flex items-center justify-center z-10">
                    <img
                        src={cover}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            {watermarkIcon && (
                <div
                    className="absolute -bottom-8 -right-8 opacity-20 pointer-events-none select-none z-0"
                    style={{ fontSize: 180 }}
                >
                    {watermarkIcon}
                </div>
            )}
        </div>
    );
}
