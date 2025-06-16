import { getImage } from '@/lib/getImage';
import Image from 'next/image';

interface FaqItem {
    question: string;
    answer: string;
    icon: string;
}

const heading = 'O que é Consulta Pública?';
const faqs = [
    {
        icon: '/faq/consulta-de-pesquisa.png',
        question: 'O que é Consulta Pública?',
        answer: 'A consulta pública é uma ferramenta essencial de diálogo entre a administração pública e a sociedade. Ela tem como objetivo estabelecer um canal aberto e participativo com as comunidades diretamente afetadas ou beneficiadas pelas obras do PROEMEM 2.0, promovendo a troca de informações com a Prefeitura de Manaus e as equipes responsáveis pela execução do Programa. Esse processo fortalece a transparência e a participação cidadã.',
    },
    {
        icon: '/faq/sinal-de-perigo.png',
        question: 'A importância das consultas públicas?',
        answer: 'A realização desta consulta é fundamental para que a população participe ativamente do PROEMEM 2.0, um programa que visa ampliar e melhorar a infraestrutura educacional da rede municipal de ensino, com foco em sustentabilidade, inclusão e inovação pedagógica. O envolvimento da comunidade permite identificar necessidades específicas, esclarecer dúvidas sobre as obras, propor melhorias e garantir que o Projeto atenda efetivamente às expectativas locais, respeitando aspectos culturais, ambientais e sociais.',
    },
    {
        icon: '/faq/diversidade.png',
        question: 'Qual o papel da população na consulta pública?',
        answer: 'A população tem um papel ativo e decisivo na construção de um Projeto mais justo e eficaz. Participar da consulta é uma forma de exercer o direito à informação e de contribuir para o aperfeiçoamento das ações do PROEMEM 2.0. As opiniões, dúvidas, críticas e sugestões coletadas servem como base para ajustes nas obras, nas ações socioambientais e nos mecanismos de comunicação com a comunidade.',
    },
] as FaqItem[];

const Faq = () => {
    return (
        <section className="py-16 px-8">
            <div className="container mx-auto">
                <div className="text-center">
                    <h1 className="mt-4 text-4xl font-semibold text-primary">
                        {heading}
                    </h1>
                </div>
                <div className="mx-auto mt-14">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="mb-8 flex flex-row gap-4 border-2 rounded-3xl border-tertiary overflow-hidden"
                        >
                            <span className="flex shrink-0 items-center justify-center bg-tertiary text-tertiary-foreground text-xs p-8">
                                <Image
                                    src={getImage(faq.icon)}
                                    height={200}
                                    width={200}
                                    alt={faq.question}
                                    className="object-contain size-20"
                                />
                            </span>
                            <div className="p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-lg font-bold">
                                        {faq.question}
                                    </h3>
                                </div>
                                <p className="text-foreground text-pretty leading-relaxed text-justify">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
