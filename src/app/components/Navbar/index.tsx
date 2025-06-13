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
import { RenderMenuItem, RenderMobileMenuItem } from './Navigation';

export interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
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
    { title: 'O que é Consulta Pública', url: '/o-que-e-ppa' },
    { title: 'Como Participar', url: '/como-participar' },
    { title: 'Participe', url: '/consulta-a-sociedade' },
    { title: 'Devolutiva', url: '/devolutiva' },
    { title: 'Estudos Prosai Parintins', url: '/estudos-prosai-parintins' },
    { title: 'Dúvidas', url: '/duvidas' },
];

const Navbar = ({
    logo = {
        url: 'https://www.shadcnblocks.com',
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
        alt: 'logo',
        title: 'Shadcnblocks.com',
    },
    menu = menuDefault,
}: Navbar1Props) => {
    return (
        <section className="py-4 flex flex-col items-center border-b border-border sticky top-0 z-50 bg-background/60 backdrop-blur-2xl">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <a href={logo.url} className="flex items-center gap-2">
                        <img
                            src={logo.src}
                            className="max-h-8"
                            alt={logo.alt}
                        />
                        <span className="text-lg font-semibold tracking-tighter">
                            {logo.title}
                        </span>
                    </a>
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
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img
                                src={logo.src}
                                className="max-h-8"
                                alt={logo.alt}
                            />
                        </a>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <a
                                            href={logo.url}
                                            className="flex items-center gap-2"
                                        >
                                            <img
                                                src={logo.src}
                                                className="max-h-8"
                                                alt={logo.alt}
                                            />
                                        </a>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) => (
                                            <RenderMobileMenuItem {...item} />
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
