import { Badge } from "@/components/ui/badge";

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
    question: "O que é Consulta Pública?",
    answer:
      "A consulta é uma ferramenta que possibilita o diálogo entre a administração pública e a sociedade. Tem como objetivo estabelecer um canal de comunicação junto às comunidades diretamente beneficiadas com as obras, construindo um processo de troca de informações com as equipes do Governo envolvidas nos projetos.",
  },
  {
    question: "A importância das consultas públicas?",
    answer:
      "A realização dessa consulta é importante para que a comunidade participe do Prosai Parintins, uma vez que é beneficiária direta das obras e do processo de reassentamento. O conhecimento de quem faz uso diário da área é fundamental para consolidar propostas que atendam de forma eficaz a necessidade da população.",
  },
  {
    question: "Qual o papel da população na consulta pública?",
    answer:
      "O papel da população é participar nas questões de interesse coletivo, ampliando a discussão, nesse caso, sobre o Prosai Parintins. Além disso, para embasar as decisões sobre formulação e definição dos seus projetos e dos reassentamentos. Ao dar sua opinião, a população ajuda a gestão pública na condução de ações ainda mais assertivas.",
  },
  {
    question:
      "O que é o Programa de Saneamento Integrado (Prosai) de Parintins?",
    answer:
      "O Prosai Parintins é um programa de múltiplas obras, executado pelo Governo do Amazonas, com financiamento do Banco Interamericano de Desenvolvimento (BID). A área de intervenção é de 119 mil metros quadrados, alcançando os bairros da Francesa, Palmares, Santa Clara, Rita de Cássia e Centro. O objetivo é solucionar problemas ambientais, urbanísticos e sociais das áreas de abrangência e de suas redondezas, incluindo as famílias que sofrem com alagações.",
  },
];

const Faq5 = ({
  badge = "FAQ",
  heading = "Common Questions & Answers",
  description = "Find out all the essential details about our platform and how it can serve your needs.",
  faqs = defaultFaqs,
}: Faq5Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="text-center">
          <Badge className="text-xs font-medium">{badge}</Badge>
          <h1 className="mt-4 text-4xl font-semibold">{heading}</h1>
          <p className="mt-6 font-medium text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq5;
