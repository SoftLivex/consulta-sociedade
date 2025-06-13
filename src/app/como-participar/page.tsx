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

const defaultFaqs: FaqItem[] = [
    {
        question: 'O que é Consulta Pública?',
        answer: 'A consulta pública é uma ferramenta essencial de diálogo entre a administração pública e a sociedade. Ela tem como objetivo estabelecer um canal aberto e participativo com as comunidades diretamente afetadas ou beneficiadas pelas obras do PROEMEM II, promovendo a troca de informações com a Prefeitura de Manaus e as equipes responsáveis pela execução do Programa. Esse processo fortalece a transparência e a participação cidadã.',
    },
    {
        question: 'A importância das consultas públicas?',
        answer: 'A realização desta consulta é fundamental para que a população participe ativamente do PROEMEM II, um programa que visa ampliar e melhorar a infraestrutura educacional da rede municipal de ensino, com foco em sustentabilidade, inclusão e inovação pedagógica. O envolvimento da comunidade permite identificar necessidades específicas, esclarecer dúvidas sobre as obras, propor melhorias e garantir que o Projeto atenda efetivamente às expectativas locais, respeitando aspectos culturais, ambientais e sociais.',
    },
    {
        question: 'Qual o papel da população na consulta pública?',
        answer: 'A população tem um papel ativo e decisivo na construção de um Projeto mais justo e eficaz. Participar da consulta é uma forma de exercer o direito à informação e de contribuir para o aperfeiçoamento das ações do PROEMEM II. As opiniões, dúvidas, críticas e sugestões coletadas servem como base para ajustes nas obras, nas ações socioambientais e nos mecanismos de comunicação com a comunidade.',
    },
    {
        question:
            'O que é o Programa de Expansão e Melhoria Educacional (PROEMEM II)?',
        answer: 'O PROEMEM II é um programa da Prefeitura de Manaus, financiado pelo Banco Interamericano de Desenvolvimento (BID), que tem como objetivo melhorar o acesso e a qualidade da Educação Básica no município. Ele inclui a construção, ampliação e modernização de escolas e creches, instalação de sistemas de saneamento, energia solar, acessibilidade, conectividade e segurança, além de ações pedagógicas e de gestão escolar. As intervenções estão concentradas especialmente em áreas de alta vulnerabilidade social, urbana e ribeirinha, impactando diretamente milhares de estudantes, professores e famílias.',
    },
];

const ComoParticipar = ({
    badge = 'Perguntas Frequentes',
    heading = 'Como Participar?',
    faqs = defaultFaqs,
}: Faq5Props) => {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <div className="text-center">
                    <Badge className="text-xs font-medium">{badge}</Badge>
                    <h1 className="mt-4 text-4xl font-semibold">{heading}</h1>
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
