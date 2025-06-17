import { useEffect, useRef, useState } from 'react';
import { AudioPlayerProps } from './types';

export function useAudioPlayer(p: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        audioRef.current = new window.Audio(p.audioSrc);
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onpause = () => setIsPlaying(false);
        audioRef.current.onplay = () => setIsPlaying(true);

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, [p.audioSrc]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return { isPlaying, audioRef, togglePlay, setIsPlaying };
}
