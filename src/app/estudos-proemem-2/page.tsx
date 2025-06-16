import Image from 'next/image';

const EstudosProemem = () => {
    return (
        <section className="py-16 px-8 flex flex-col  flex-1">
            <div className="container mx-auto flex-1 flex flex-col">
                <div className="flex grid-cols-2 lg:grid gap-16  max-w-6xl self-center container flex-1">
                    <div className="flex flex-col gap-6">
                        <h1 className="mt-4 text-6xl font-bold text-primary">
                            Estudos PROEMEM II
                        </h1>
                        <section className="space-y-2 *:leading-relaxed *:text-justify">
                            <p>
                                Os estudos e documentos apresentados serão
                                divulgados durante as Consultas Públicas do
                                PROEMEM II, com intuito informar a sociedade e
                                dar mais transparência sobre as etapas do novo
                                Projeto de Expansão e Melhoria Educacional da
                                Rede Pública Municipal de Manaus. A Avaliação
                                Ambiental e Social - AAS, demonstra que o
                                PROEMEM II é viável ambiental e socialmente,
                                desde que sejam adotadas as medidas previstas no
                                PGAS. O projeto contribui para o desenvolvimento
                                sustentável de Manaus, promovendo educação de
                                qualidade, inclusão social e respeito ao meio
                                ambiente.
                            </p>
                            <p>
                                A AAS está estruturada em blocos temáticos que
                                contemplam a descrição do programa, o marco
                                legal e institucional, as condições ambientais e
                                sociais do município de Manaus, as
                                características das obras e seus potenciais
                                impactos. Dessa forma, o documento fornece as
                                bases técnicas e legais para garantir que a
                                execução do PROEMEM II ocorra de forma
                                planejada, segura e compatível com os princípios
                                da sustentabilidade ambiental, da justiça social
                                e da boa governança pública.
                            </p>
                            <p>
                                O Plano de Gestão Ambiental e Social (PGAS) é um
                                instrumento técnico e operacional que integra o
                                conjunto de documentos exigidos para o
                                planejamento e execução do PROEMEM II, programa
                                financiado parcialmente pelo Banco
                                Interamericano de Desenvolvimento (BID). O PGAS
                                se baseia na Avaliação Ambiental e Social (AAS)
                                e está estruturado conforme os Padrões de
                                Desempenho Ambiental e Social (PDAS) definidos
                                pelo Marco de Políticas Ambientais e Sociais
                                (MPAS) do BID.
                            </p>
                            <p>
                                Este documento tem como objetivo principal
                                garantir que todas as atividades, obras e
                                intervenções físicas previstas no PROEMEM II
                                sejam desenvolvidas em conformidade com a
                                legislação ambiental brasileira, os regulamentos
                                municipais e os Padrões de Desempenho Ambiental
                                e Social (PDAS) definidos pelo Marco de
                                Políticas Ambientais e Sociais (MPAS) do BID.
                            </p>
                            <p>
                                O objetivo geral do PGAS é assegurar que as
                                obras e intervenções do PROEMEM II sejam
                                executadas de maneira ambientalmente responsável
                                e socialmente sustentável, conforme a legislação
                                brasileira e os requisitos internacionais do
                                BID. O plano tem por finalidade prevenir,
                                mitigar, controlar e, quando necessário,
                                compensar os impactos ambientais e sociais
                                decorrentes da execução das obras e ações do
                                programa, especialmente nas fases de implantação
                                e operação da infraestrutura educacional.
                            </p>
                        </section>
                    </div>
                    <div className="hidden lg:flex">
                        <Image
                            src={'./faq/devolutiva.png'}
                            className="h-full w-full object-contain"
                            alt={'devolutiva'}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstudosProemem;
