declare module 'html-pdf-node' {
    interface Options {
        format?: string;
        [key: string]: any;
    }

    interface File {
        content: string;
        [key: string]: any;
    }

    function generatePdf(file: File, options?: Options): Promise<Buffer>;

    export = {
        generatePdf
    };
} 