import { Badge } from '@/components/ui/badge';

export interface FaqItem {
    icon: string;
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
        icon: '/faq/participe.png',
        question: 'Acesse o menu PARTICIPE',
        answer: 'O cidadão interessado deve iniciar o processo clicando na opção "PARTICIPE" no menu principal do site.',
    },
    {
        icon: '/faq/id-card.png',
        question: 'Faça sua identificação',
        answer: 'Informe seus dados para que a gente possa reconhecer sua participação e garantir que sua contribuição seja considerada.',
    },
    {
        icon: '/faq/area-interesse.png',
        question: 'Escolha sua área de interesse',
        answer: 'Marque as prioridades entre as opções disponíveis.',
    },
    {
        icon: '/faq/sugestao.png',
        question: 'Envie sugestões',
        answer: 'Caso tenha uma sugestão de área que não esteja na lista, utilize o campo PERGUNTA para escrevê-la.',
    },
];

const ComoParticipar = ({
    badge = 'Perguntas Frequentes',
    heading = 'Como Participar?',
    faqs = defaultFaqs,
}: Faq5Props) => {
    return (
        <section className="py-16 px-8 container mx-auto flex flex-col flex-1">
            <div className="text-center">
                <Badge className="text-xs font-medium">{badge}</Badge>
                <h1 className="mt-4 text-4xl font-semibold">{heading}</h1>
            </div>
            <div className="flex-1 mx-auto flex flex-col items-center justify-center">
                <div className="mt-14 flex flex-col xl:flex-row gap-10">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="flex-1 mb-8 flex gap-4 relative border-2 border-tertiary rounded-4xl px-6 py-4 pt-15 mt-10 max-w-lg"
                        >
                            <span className="absolute top-0 left-0 right-0 mx-auto -translate-y-1/2 flex size-25 shrink-0 items-center justify-center rounded-full bg-tertiary text-tertiary-foreground">
                                <img
                                    src={faq.icon}
                                    alt={faq.question}
                                    className="object-contain size-18"
                                />
                            </span>
                            <div className="text-center flex flex-col items-center gap-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-lg font-bold">
                                        {faq.question}
                                    </h3>
                                </div>
                                <p className="text-foreground text-pretty leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="mx-auto max-w-2xl text-center">
                Sua opinião pode transformar a educação! Participe do{' '}
                <b>PROEMEM II</b> e contribua com sugestões para os novos
                projetos da rede pública municipal.
            </p>
        </section>
    );
};

export default ComoParticipar;
