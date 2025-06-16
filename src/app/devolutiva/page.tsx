import Image from 'next/image';

const ComoParticipar = () => {
    return (
        <section className="py-16 px-8 flex flex-col  flex-1">
            <div className="container mx-auto flex-1 flex flex-col">
                <div className="flex grid-cols-2 lg:grid gap-16  max-w-6xl self-center container flex-1">
                    <div className="flex flex-col gap-6">
                        <h1 className="mt-4 text-6xl font-bold text-primary">
                            O que é a Devolutiva?
                        </h1>
                        <p className="leading-relaxed text-justify">
                            É o retorno à sociedade sobre os resultados das
                            Consultas Públicas relacionadas às ações
                            socioambientais do Projeto de Expansão e Melhoria
                            Educacional da Rede Pública Municipal de Manaus –
                            PROEMEM.
                        </p>
                        <p className="leading-relaxed text font-bold text-justify">
                            O Relatório Final da Devolutiva respondendo
                            eventuais questionamentos estará disponível no dia
                            14 de julho de 2025.
                        </p>
                    </div>
                    <div className="hidden lg:flex">
                        <Image
                            src={'/faq/devolutiva.png'}
                            className="h-full w-full object-contain"
                            alt={'devolutiva'}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComoParticipar;
