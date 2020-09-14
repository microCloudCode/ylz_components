export declare function downloadFile(content: string, fileName: string): void;
export declare function createPromise(): {
    promise: Promise<unknown>;
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
};
