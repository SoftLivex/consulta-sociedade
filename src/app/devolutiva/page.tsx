import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface FaqItem {
    question: string;
    answer: string;
}

export interface Faq5Props {
    badge?: string;
    heading?: string;
    description?: string;
    faqs?: FaqItem[];
}

const ComoParticipar = ({
    badge = 'Perguntas Frequentes',
    heading = 'O que é a Devolutiva?',
}: Faq5Props) => {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <div className="text-center">
                    <Badge className="text-xs font-medium">{badge}</Badge>
                    <h1 className="mt-4 text-4xl font-semibold text-primary">
                        {heading}
                    </h1>
                </div>
                <div className="mx-auto mt-14 max-w-xl">
                    <div className="mb-8 flex gap-4">
                        <div>
                            <div className="mb-2 flex flex-col">
                                <h3 className="font-medium">
                                    As consultas públicas serão transmitidas ao
                                    vivo através das páginas:
                                </h3>
                                <Button variant="link" size="sm" asChild>
                                    <Link href="/consulta-a-sociedade">
                                        Consulta à Sociedade
                                    </Link>
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                O cidadão interessado em contribuir na
                                elaboração dos projetos inseridos no Projeto de
                                Expansão e Melhoria Educacional da Rede Pública
                                Municipal de Manaus – PROEMEM II, deverá
                                utilizar a opção do menu PARTICIPE. Após sua
                                identificação, ele deverá selecionar sua área de
                                interesse, marcando suas prioridades e, caso
                                tenha uma que não conste na lista, utilizar o
                                espaço para nova sugestão.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComoParticipar;
