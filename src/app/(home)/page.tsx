import CarouselDemo from './components/carrosel';

export default function Home() {
    return (
        <div className="mx-auto container flex flex-1 flex-col bg-background px-4 py-8 gap-6">
            <div className="container flex-1 rounded-4xl overflow-hidden">
                <CarouselDemo />
            </div>
            <section className="flex flex-col lg:flex-row gap-10 *:p-6">
                <p className="flex-1 bg-tertiary text-tertiary-foreground text-6xl flex items-center justify-center rounded-4xl">
                    <span className="flex flex-col">
                        <span>CONSULTA À</span> <b>SOCIEDADE 2025</b>
                    </span>
                </p>
                <section className="flex-1 flex flex-col gap-1">
                    <b className="text-lg">
                        O que é o Programa de Expansão e Melhoria Educacional
                        (PROEMEM 2.0)?
                    </b>
                    <p className="text-sm text-justify">
                        O <b>PROEMEM 2.0</b> é um programa da Prefeitura de
                        Manaus, financiado pelo Banco Interamericano de
                        Desenvolvimento (BID), que tem como objetivo melhorar o
                        acesso e a qualidade da Educação Básica no município.
                        Ele inclui a construção, ampliação e modernização de
                        escolas e creches, instalação de sistemas de saneamento,
                        energia solar, acessibilidade, conectividade e
                        segurança, além de ações pedagógicas e de gestão
                        escolar. As intervenções estão concentradas
                        especialmente em áreas de alta vulnerabilidade social,
                        urbana e ribeirinha, impactando diretamente milhares de
                        estudantes, professores e famílias.
                    </p>
                </section>
            </section>
        </div>
    );
}
