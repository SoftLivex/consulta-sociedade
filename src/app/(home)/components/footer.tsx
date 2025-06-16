import { getImage } from '@/lib/getImage';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="bg-sidebar p-4 flex items-center justify-center  gap-8">
            <Image
                src={getImage('/prefeitura.png')}
                className="max-h-8 w-auto"
                alt="prefeitura de manaus"
                width="100"
                height="32"
            />
            <Image
                src={getImage('/SEMED.png')}
                alt={`semed`}
                className="h-8 w-auto object-cover"
                width="100"
                height="32"
            />
        </footer>
    );
};
