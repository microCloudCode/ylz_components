export declare function usePromise(arr?: any[]): {
    promise: Promise<unknown>;
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
};
