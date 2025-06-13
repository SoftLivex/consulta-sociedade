import { z, type ZodErrorMap, type ZodInvalidStringIssue } from 'zod';

const customErrorMap: ZodErrorMap = (error, ctx) => {
    const defaultMessage = ctx.defaultError;

    switch (error.code) {
        case z.ZodIssueCode.invalid_literal:
            return {
                message: `Valor literal inválido. Era esperado ${error.expected}`,
            };
        case z.ZodIssueCode.unrecognized_keys:
            return {
                message: `Chave(s) não reconhecida(s) no objeto: ${error.keys.join(', ')}`,
            };
        case z.ZodIssueCode.invalid_union:
            return { message: 'Entrada inválida' };
        case z.ZodIssueCode.invalid_enum_value:
            return {
                message: `Enum no formato inválido. Era esperado ${error.options.join(', ')}, porém foi recebido '${error.received}'`,
            };
        case z.ZodIssueCode.invalid_arguments:
            return { message: 'Argumento de função inválido' };
        case z.ZodIssueCode.invalid_return_type:
            return { message: 'Tipo de retorno de função inválido' };
        case z.ZodIssueCode.invalid_date:
            return { message: 'Data inválida' };
        case z.ZodIssueCode.custom:
            return { message: 'Entrada inválida' };
        case z.ZodIssueCode.invalid_intersection_types:
            return { message: 'Valores de interseção não podem ser mesclados' };
        case z.ZodIssueCode.not_multiple_of:
            return {
                message: `O número deve ser múltiplo de ${error.multipleOf}`,
            };
        case z.ZodIssueCode.not_finite:
            return { message: 'Número não pode ser infinito' };
        case z.ZodIssueCode.invalid_string:
            return { message: getInvalidStringMessage(error) };
        case z.ZodIssueCode.too_small:
            return { message: getTooSmallMessage(error) };
        case z.ZodIssueCode.too_big:
            return { message: getTooBigMessage(error) };
        case z.ZodIssueCode.invalid_type:
            return { message: 'Obrigatório' };

        default:
            return { message: defaultMessage };
    }
};

const getInvalidStringMessage = (error: ZodInvalidStringIssue) => {
    let message = '';
    switch (error.validation) {
        case 'email':
            message = 'Email inválido';
            break;
        case 'url':
            message = 'URL inválida';
            break;
        case 'uuid':
            message = 'UUID inválido';
            break;
        case 'cuid':
            message = 'CUID inválido';
            break;
        case 'regex':
            message = 'Combinação inválida';
            break;
        case 'datetime':
            message = 'Data e hora inválidas';
            break;
        case 'emoji':
            message = 'Emoji inválido';
            break;
        case 'ip':
            message = 'IP inválido';
            break;
        case 'cuid2':
            message = 'CUID2 inválido';
            break;
        case 'ulid':
            message = 'ULID inválido';
            break;
        default:
            message = 'Entrada de string inválida';
            break;
    }
    return message;
};

const getTooSmallMessage = (error: z.ZodTooSmallIssue) => {
    const { minimum } = error;
    const inclusiveMessage = error.inclusive ? 'inclusive o ' : 'excluindo o ';
    const typeMessage = error.type === 'array' ? 'elemento(s)' : 'caracter(es)';
    return `Valor muito pequeno. Mínimo permitido: ${inclusiveMessage}${minimum} ${typeMessage}`;
};

const getTooBigMessage = (error: z.ZodTooBigIssue) => {
    const { maximum } = error;
    const inclusiveMessage = error.inclusive ? 'inclusive o ' : 'excluindo o ';
    const typeMessage = error.type === 'array' ? 'elemento(s)' : 'caracter(es)';
    return `Valor muito grande. Máximo permitido: ${inclusiveMessage}${maximum} ${typeMessage}`;
};

z.setErrorMap(customErrorMap);
export default z;
