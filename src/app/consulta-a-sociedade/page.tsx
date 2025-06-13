'use client';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/ui/shuip/input-field';
import { SelectField } from '@/components/ui/shuip/select-field';
import { SubmitButton } from '@/components/ui/shuip/submit-button';
import { TextareaField } from '@/components/ui/shuip/textarea-field';
import useFormConsultaSociedades from './hooks';

interface Contact2Props {
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
    web?: { label: string; url: string };
}

const ConsultaASociedade = ({
    title = 'Prefeitura de Manaus Priorizando a Participação Popular',
    description = 'A Prefeitura de Manaus quer ouvir você: tire suas dúvidas, participe e ajude a construir uma cidade melhor para todos.',
}: Contact2Props) => {
    const { form, onSubmit, isPending } = useFormConsultaSociedades();

    const options = {
        'Áreas de intervenção': 'Áreas de intervenção',
        Obras: 'Obras',
        'Formas de atendimento': 'Formas de atendimento',
        'Trabalho social - Participação comunitária':
            'Trabalho social - Participação comunitária',
        'Aspectos ambientais': 'Aspectos ambientais',
        'Aspectos institucionais': 'Aspectos institucionais',
        'Planejamento e cronograma de execução':
            'Planejamento e cronograma de execução',
    };

    return (
        <section>
            <div className="w-full p-8 bg-gradient-to-l from-accent to-secondary">
                <div className="text-center lg:text-left text-secondary-foreground flex flex-col justify-center items-center gap-4">
                    <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="container mx-auto py-16">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:gap-20">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10 w-full"
                        >
                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('nome')}
                                    label="Nome Completo"
                                    placeholder="Insira seu nome"
                                />
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('email')}
                                    type="email"
                                    label="Email"
                                    placeholder="email@email.com"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('telefone')}
                                    label="Telefone"
                                    placeholder="(92) 9 0000-0000"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('endereco')}
                                    label="Endereço"
                                    placeholder="Insira seu endereço"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <div>
                                    <InputField
                                        register={form.register('bairro')}
                                        label="Bairro"
                                        placeholder="Insira seu bairro"
                                    />
                                </div>
                                <div>
                                    <InputField
                                        register={form.register('numero')}
                                        label="Número"
                                        placeholder="Ex: 123"
                                    />
                                </div>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <SelectField
                                    register={form.register('area_tematica')}
                                    label="Área Temática"
                                    placeholder="Selecione uma opção"
                                    options={options}
                                />
                            </div>

                            <div className="grid w-full gap-1.5">
                                <TextareaField
                                    register={form.register('pergunta')}
                                    label="Pergunta"
                                    placeholder="Escreva sua pergunta aqui..."
                                />
                            </div>
                            <SubmitButton
                                className="w-full"
                                loading={isPending}
                            >
                                Enviar
                            </SubmitButton>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ConsultaASociedade;
