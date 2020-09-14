/// <reference types="react" />
import { PrintDataModelState } from '../../../type';
interface Props {
    Data: PrintDataModelState;
    calculatedPromise: {
        res: (value?: unknown) => void;
        rej: (reason?: any) => void;
    };
    pushLoadItem: (e: any) => any;
}
declare const _default: ({ Data, calculatedPromise, pushLoadItem }: Props) => JSX.Element;
/**
 * 默认的渲染模版
 */
export default _default;
