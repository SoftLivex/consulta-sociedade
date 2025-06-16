'use client';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/ui/shuip/input-field';
import { SelectField } from '@/components/ui/shuip/select-field';
import { SubmitButton } from '@/components/ui/shuip/submit-button';
import { TextareaField } from '@/components/ui/shuip/textarea-field';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import useFormConsultaSociedades from './hooks';

const title = 'Prefeitura de Manaus Priorizando a Participação Popular';
const description =
    'A Prefeitura de Manaus quer ouvir você: tire suas dúvidas, participe e ajude a construir uma cidade melhor para todos.';
const ConsultaASociedade = () => {
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
            <div className="w-full px-8 py-16 bg-gradient-to-l from-accent to-secondary">
                <div className="text-center lg:text-left text-secondary-foreground flex flex-col justify-center items-center gap-2">
                    <h1 className="mb-2 text-3xl font-semibold lg:mb-1 lg:text-5xl">
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
                            className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg w-full"
                        >
                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('nome')}
                                    label={<b>Nome Completo</b>}
                                    placeholder="Insira seu nome"
                                />
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('email')}
                                    type="email"
                                    label={<b>E-mail</b>}
                                    placeholder="email@email.com"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('telefone')}
                                    label={<b>Telefone</b>}
                                    placeholder="(92) 9 0000-0000"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <InputField
                                    register={form.register('endereco')}
                                    label={<b>Endereço</b>}
                                    placeholder="Insira seu endereço"
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-6 lg:gap-1.5">
                                <div className="col-span-full lg:col-span-9">
                                    <InputField
                                        register={form.register('bairro')}
                                        label={<b>Bairro</b>}
                                        placeholder="Insira seu bairro"
                                    />
                                </div>
                                <div className="col-span-full lg:col-span-3">
                                    <InputField
                                        register={form.register('numero')}
                                        label={<b>Número</b>}
                                        placeholder="Ex: 123"
                                    />
                                </div>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <SelectField
                                    register={form.register('area_tematica')}
                                    label={<b>Área Temática</b>}
                                    placeholder="Selecione uma opção"
                                    options={options}
                                />
                            </div>

                            <div className="grid w-full gap-1.5">
                                <TextareaField
                                    register={form.register('pergunta')}
                                    label={<b>Pergunta</b>}
                                    placeholder="Escreva sua pergunta aqui..."
                                />
                            </div>

                            {form.getValues('recaptcha')}
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
const Recaptcha = () => (
    <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
        <ConsultaASociedade />
    </GoogleReCaptchaProvider>
);
export default Recaptcha;
