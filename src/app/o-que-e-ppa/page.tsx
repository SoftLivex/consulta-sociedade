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
];

const Faq = ({
    heading = 'O que é Consulta Pública?',
    faqs = defaultFaqs,
}: Faq5Props) => {
    return (
        <section className="py-16 px-8">
            <div className="container mx-auto">
                <div className="text-center">
                    <h1 className="mt-4 text-4xl font-semibold text-primary">
                        {heading}
                    </h1>
                </div>
                <div className="mx-auto mt-14 max-w-3xl">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-8 flex gap-4">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-tertiary text-tertiary-foreground text-xs">
                                {index + 1}
                            </span>
                            <div>
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
