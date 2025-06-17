import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { AudioPlayerProps } from './types';

export function AudioPlayer({
    background = 'bg-primary',
    ...p
}: AudioPlayerProps) {
    const audioObj = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Instancia o áudio apenas uma vez
        audioObj.current = new window.Audio(p.audioSrc);

        // Eventos para sincronizar estado
        const handleEnded = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);

        audioObj.current.addEventListener('ended', handleEnded);
        audioObj.current.addEventListener('pause', handlePause);
        audioObj.current.addEventListener('play', handlePlay);

        return () => {
            audioObj.current?.pause();
            audioObj.current?.removeEventListener('ended', handleEnded);
            audioObj.current?.removeEventListener('pause', handlePause);
            audioObj.current?.removeEventListener('play', handlePlay);
            audioObj.current = null;
        };
    }, [p.audioSrc]);

    const togglePlay = () => {
        if (!audioObj.current) return;
        if (isPlaying) {
            audioObj.current.pause();
        } else {
            audioObj.current.play();
        }
    };

    return (
        <div
            className={cn(
                `rounded-4xl shadow-none flex flex-row items-stretch text-white relative overflow-hidden`,
                background,
                p.className,
            )}
        >
            <div className="flex flex-row lg:flex-col gap-1 flex-1 justify-between p-6 z-10">
                <div>
                    <h2 className="text-3xl font-bold leading-tight mb-1">
                        {p.title}
                    </h2>
                    {p.subtitle && (
                        <div className="text-base mb-2">{p.subtitle}</div>
                    )}
                    {p.description && (
                        <p className="text-sm text-white mb-4">
                            {p.description}
                        </p>
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
                </div>
            </div>
            {/* Capa e watermark podem ser adicionados aqui, se necessário */}
        </div>
    );
}
