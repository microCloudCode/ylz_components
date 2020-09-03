import { PrintDataModelState, PageValue } from '../../type';
export declare function usePageList(Data: PrintDataModelState, getHeight: () => number | undefined, getHtmlList: (index: number) => {
    content: Element | undefined;
    list: Element[];
}, readyPromise: {
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
}): PageValue[][][];
