export const getImage = (url: string) => {
    // is dev
    const prefix = process.env.NODE_ENV === 'development' ? '' : '.';

    return `${prefix}${url}`;
};
