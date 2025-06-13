import type { Metadata } from 'next';
import { Footer } from './(home)/components/footer';
import { Navbar } from './(home)/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
    title: 'PROEMEM II',
    description:
        'Consulta à Sociedade 2025 - Participe da construção do futuro da educação em Manaus. Sua opinião é fundamental para o PROEMEM II.',
    icons: {
        icon: '/Logo.svg', // Path relative to the 'public' directory
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
                    <div className="flex-1 flex flex-col">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
