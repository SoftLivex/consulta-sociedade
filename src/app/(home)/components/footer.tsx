export const Footer = () => {
    return (
        <footer className="bg-sidebar p-4 flex items-center justify-center  gap-8">
            <img
                src={'/prefeitura.png'}
                className="max-h-8 w-auto"
                alt="prefeitura de manaus"
                width="100"
                height="32"
            />
            <img
                src="/SEMED.png"
                alt={`semed`}
                className="h-8 w-auto object-cover"
            />
        </footer>
    );
};
