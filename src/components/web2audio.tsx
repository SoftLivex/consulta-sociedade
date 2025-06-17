'use client';
import { Play, Square } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

const TextToSpeechReader = ({ selector = 'body' }: { selector?: string }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [lines, setLines] = useState<string[][]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const pathname = usePathname();
    console.log('🧪 pathname: ', pathname);

    const splitIntoLines = (text: string): string[][] => {
        return text
            .split(/[\.\!\?\n]+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => line.split(/\s+/));
    };

    const readCurrentPage = () => {
        if (isSpeaking) {
            stopReading();
            return;
        }

        const element = document.querySelector(selector);
        if (!element) {
            console.warn('Elemento não encontrado para leitura');
            return;
        }

        const text =
            (element as HTMLElement).innerText || element.textContent || '';
        if (!text.trim()) {
            console.warn('Nenhum texto encontrado para leitura');
            return;
        }

        stopReading();

        const processedLines = splitIntoLines(text);
        setLines(processedLines);
        setCurrentLineIndex(0);
        setCurrentWordIndex(0);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';

        utterance.onend = () => {
            setIsSpeaking(false);
            setLines([]);
        };

        utterance.onerror = (e) => {
            console.error('Erro na síntese de fala:', e);
            setIsSpeaking(false);
            setLines([]);
        };

        utterance.onboundary = (event: SpeechSynthesisEvent) => {
            if (event.charIndex !== undefined) {
                let charCount = 0;
                for (let l = 0; l < processedLines.length; l++) {
                    const line = processedLines[l];
                    const lineText = line.join(' ') + ' ';
                    if (
                        event.charIndex >= charCount &&
                        event.charIndex < charCount + lineText.length
                    ) {
                        setCurrentLineIndex(l);
                        const before = lineText.slice(
                            0,
                            event.charIndex - charCount,
                        );
                        const wordIdx = before
                            .split(/\s+/)
                            .filter(Boolean).length;
                        setCurrentWordIndex(wordIdx);
                        break;
                    }
                    charCount += lineText.length;
                }
            }
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const stopReading = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setLines([]);
    };

    // ⚡ Para automaticamente ao trocar de rota
    useEffect(() => {
        stopReading();
    }, [pathname]);

    if (pathname === '/') {
        return null;
    }

    return (
        <>
            <div className="flex gap-2 fixed top-[10%] right-5 z-50">
                <Button
                    variant={isSpeaking ? 'destructive' : 'default'}
                    onClick={readCurrentPage}
                >
                    {isSpeaking ? (
                        <>
                            <Square /> Parar
                        </>
                    ) : (
                        <>
                            <Play /> Ouvir
                        </>
                    )}
                </Button>
            </div>

            {isSpeaking && lines.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-80 text-white text-center py-2 px-4">
                    <span className="text-base md:text-lg flex flex-wrap justify-center gap-1 items-center">
                        {lines[currentLineIndex]?.map((word, idx) => (
                            <span
                                key={idx}
                                className={
                                    idx === currentWordIndex
                                        ? 'font-black text-yellow-500'
                                        : ''
                                }
                            >
                                {word}
                            </span>
                        ))}
                    </span>
                </div>
            )}
        </>
    );
};

export default TextToSpeechReader;
