import { Menu } from 'lucide-react';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { RenderMenuItem, RenderMobileMenuItem } from './Navigation';

export interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
    outside?: boolean;
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}
const menuDefault: Navbar1Props['menu'] = [
    { title: 'Início', url: './' },
    { title: 'O que é Consulta Pública', url: './o-que-e-ppa' },
    {
        title: 'Intervenções',
        url: 'https://geoprocessamento2025.notion.site/PROEMEM-2-Constru-es-e-Amplia-es-140a58fc231080e6bbdfed1dd08aca58',
        outside: true,
    },
    { title: 'Como Participar', url: './como-participar' },
    { title: 'Participe', url: './consulta-a-sociedade' },
    { title: 'Devolutiva', url: './devolutiva' },
    { title: 'Estudos PROEMEM II', url: './estudos-proemem-2' },
];

const Navbar = ({
    logo = {
        url: '/',
        src: '/Logo.svg',
        alt: 'logo',
        title: '/Title.svg',
    },
    menu = menuDefault,
}: Navbar1Props) => {
    return (
        <section className="py-4 flex flex-col items-center border-b border-border sticky top-0 z-50 bg-sidebar backdrop-blur-2xl">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden justify-between xl:flex">
                    <Link href={logo.url} className="flex items-center gap-6">
                        <span className="flex flex-row gap-0">
                            <img
                                src={logo.title}
                                className="max-h-5 w-full"
                                alt={logo.alt}
                                width="100"
                                height="32"
                            />
                        </span>
                        <img
                            src={'/prefeitura.png'}
                            className="max-h-8 w-auto"
                            alt={logo.alt}
                            width="100"
                            height="32"
                        />
                    </Link>

                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menu.map((item) => (
                                    <RenderMenuItem
                                        key={item.title}
                                        {...item}
                                    />
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block xl:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href={logo.url}
                            className="flex items-center gap-4"
                        >
                            <img
                                src={logo.src}
                                className="max-h-8"
                                alt={logo.alt}
                            />
                            <img
                                src={'/prefeitura-logo.png'}
                                className="max-h-8 w-full"
                                alt={logo.alt}
                            />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link
                                            href={logo.url}
                                            className="flex items-center gap-2"
                                        >
                                            <img
                                                src={logo.src}
                                                className="max-h-8"
                                                alt={logo.alt}
                                            />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) => (
                                            <RenderMobileMenuItem
                                                key={item.title}
                                                {...item}
                                            />
                                        ))}
                                    </Accordion>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Navbar };
