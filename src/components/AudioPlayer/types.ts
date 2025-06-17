export interface AudioPlayerProps {
    title: string;
    subtitle?: string;
    description?: string;
    audioSrc: string;
    cover?: string;
    className?: string;
    background?: string;
    watermarkIcon?: React.ReactNode;
}
