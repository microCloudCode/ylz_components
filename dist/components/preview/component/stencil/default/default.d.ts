/// <reference types="react" />
import { PrintDataModelState } from '../../../type';
interface Props {
    Data: PrintDataModelState;
    calculatedPromise: {
        res: (value?: unknown) => void;
        rej: (reason?: any) => void;
    };
    pushLoadItem: (e: any) => any;
    coverUrl: string;
    footUrl: string;
}
declare const _default: ({ Data, calculatedPromise, pushLoadItem, coverUrl, footUrl }: Props) => JSX.Element;
/**
 * 默认的渲染模版
 */
export default _default;
