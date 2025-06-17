import TextToSpeechReader from '@/components/web2audio';
import type { Metadata } from 'next';

import { Toaster } from 'sonner';
import { Footer } from './(home)/components/footer';
import { Navbar } from './(home)/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
    title: 'PROEMEM',
    description:
        'Consulta à Sociedade 2025 - Participe da construção do futuro da educação em Manaus. Sua opinião é fundamental para o PROEMEM.',
    icons: {
        icon: './Logo.svg', // Path relative to the 'public' directory
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <div className="root flex flex-col min-h-screen">
                    <Navbar />
                    <div className="conteudo flex-1 flex flex-col bg-background">
                        {children}
                    </div>

                    <Footer />
                </div>

                <TextToSpeechReader selector=".conteudo" />

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'white',
                            color: 'black',
                            border: '1px solid #e5e7eb',
                        },
                    }}
                />
            </body>
        </html>
    );
}
