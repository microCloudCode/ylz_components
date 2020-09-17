import { PageValue } from '../../type';
export declare function usePageList(page: PageValue[], getHeight: (index: number) => number | undefined, getHtmlList: (pageIdx: number, index: number) => {
    content: Element | undefined;
    list: Element[];
}, calculatedPromise: {
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
}): PageValue[][][];
