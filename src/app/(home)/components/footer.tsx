import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="bg-sidebar p-4 flex items-center justify-center">
            <Image
                src="/SEMED.png"
                alt={`semed`}
                className="h-12 w-auto object-cover"
            />
        </footer>
    );
};
