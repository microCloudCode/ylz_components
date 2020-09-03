/// <reference types="react" />
import { PrintDataModelState } from '../../../type';
interface Props {
    Data: PrintDataModelState;
    readyPromise: {
        res: (value?: unknown) => void;
        rej: (reason?: any) => void;
    };
}
declare const _default: ({ Data, readyPromise }: Props) => JSX.Element;
/**
 * 默认的渲染模版
 */
export default _default;
