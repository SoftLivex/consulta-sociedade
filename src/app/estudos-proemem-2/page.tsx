import { Button } from '@/components/ui/button';
import { getSource } from '@/lib/getSource';
import Image from 'next/image';

const menuDefault = [
    {
        message: (
            <>
                A Avaliação Ambiental e Social - AAS, demonstra que o PROEMEM
                2.0 é viável ambiental e socialmente, desde que sejam adotadas
                as medidas previstas no PGAS. O projeto contribui para o
                desenvolvimento sustentável de Manaus, promovendo educação de
                qualidade, inclusão social e respeito ao meio ambiente.
                <br />
                <br />A AAS está estruturada em blocos temáticos que contemplam
                a descrição do programa, o marco legal e institucional, as
                condições ambientais e sociais do município de Manaus, as
                características das obras e seus potenciais impactos. Dessa
                forma, o documento fornece as bases técnicas e legais para
                garantir que a execução do PROEMEM 2.0 ocorra de forma
                planejada, segura e compatível com os princípios da
                sustentabilidade ambiental, da justiça social e da boa
                governança pública.
            </>
        ),
        title: 'AAS',
        icon: '/faq/aas.png', // exemplo de ícone
        url: '/pdf/PEPI - R1.pdf',
    },
    {
        message: (
            <>
                O Plano de Gestão Ambiental e Social - PGAS é um instrumento
                técnico e operacional que integra o conjunto de documentos
                exigidos para o planejamento e execução do PROEMEM 2.0, programa
                financiado parcialmente pelo Banco Interamericano de
                Desenvolvimento (BID). O PGAS se baseia na Avaliação Ambiental e
                Social (AAS) e está estruturado conforme os Padrões de
                Desempenho Ambiental e Social (PDAS) definidos pelo Marco de
                Políticas Ambientais e Sociais (MPAS) do BID.
                <br />
                <br />O objetivo geral do PGAS é assegurar que as obras e
                intervenções do PROEMEM 2.0 sejam executadas de maneira
                ambientalmente responsável e socialmente sustentável, conforme a
                legislação brasileira e os requisitos internacionais do BID. O
                plano tem por finalidade prevenir, mitigar, controlar e, quando
                necessário, compensar os impactos ambientais e sociais
                decorrentes da execução das obras e ações do programa,
                especialmente nas fases de implantação e operação da
                infraestrutura educacional.
            </>
        ),
        title: 'PGAS',
        icon: '/faq/pgas.png', // exemplo de ícone
        url: '/pdf/PEPI - R1.pdf',
    },
    {
        message: (
            <>
                O Plano de Engajamento das Partes Interessadas - PEPI é um
                instrumento de planejamento e gestão elaborado no contexto do
                PROEMEM 2.0, com o objetivo de estruturar e operacionalizar um
                processo contínuo, transparente e participativo de
                relacionamento com a sociedade, especialmente com as comunidades
                diretamente afetadas pelas obras e ações do projeto.
                <br />
                <br />O objetivo geral do PEPI é assegurar o diálogo
                sistemático, a consulta informada e a participação efetiva das
                partes interessadas no planejamento, implantação, operação e
                monitoramento das ações do PROEMEM 2.0, garantindo que os
                riscos, impactos, expectativas e contribuições das comunidades e
                demais grupos afetados sejam devidamente considerados e
                incorporados ao processo de tomada de decisão do projeto.
            </>
        ),
        title: 'PEPI',
        icon: '/faq/pepi.png', // exemplo de ícone
        url: '/pdf/PEPI - R1.pdf',
    },
];

const EstudosProemem = () => {
    return (
        <section className="py-16 px-8 flex flex-col flex-1">
            <div className="container mx-auto flex-1 flex flex-col">
                <div className="flex flex-col gap-6">
                    <h1 className="mt-4 text-6xl font-bold text-primary">
                        Estudos PROEMEM 2.0
                    </h1>
                    <h3>
                        Os estudos e documentos apresentados serão divulgados
                        durante as Consultas Públicas do PROEMEM 2.0, com
                        intuito de informar a sociedade e dar mais transparência
                        sobre as etapas do novo Projeto de Expansão e Melhoria
                        Educacional da Rede Pública Municipal de Manaus.
                    </h3>
                    <section className="space-y-2 *:leading-relaxed *:text-justify">
                        {menuDefault.map((item, key) => (
                            <div
                                key={key}
                                className="mb-8 flex flex-row gap-4 border-2 rounded-3xl border-tertiary overflow-hidden"
                            >
                                <span className="flex flex-col gap-4 shrink-0 items-center justify-center bg-tertiary text-xs py-4 px-8">
                                    <Image
                                        src={
                                            getSource(item.icon) ||
                                            '/default-icon.png'
                                        }
                                        height={200}
                                        width={200}
                                        alt={item.title}
                                        className="object-contain size-20 my-4"
                                    />
                                    <h3 className="text-lg font-bold text-tertiary-foreground">
                                        {item.title}
                                    </h3>
                                </span>
                                <div className="px-2 py-4 text-pretty leading-relaxed text-justify flex flex-col items-center justify-center">
                                    {item.message}
                                    <Button
                                        variant="link"
                                        className="self-end"
                                        asChild
                                    >
                                        <a
                                            href={getSource(item.url)}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Ver {item.title}
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </section>
    );
};

export default EstudosProemem;
