export declare function usePromise(arr?: never[]): {
    promise: Promise<unknown>;
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
};
