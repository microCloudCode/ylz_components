/// <reference types="react" />
import { PrintDataModelState } from '../../type';
interface Props {
    type?: string;
    Data: PrintDataModelState;
    readyPromise: {
        res: (value?: unknown) => void;
        rej: (reason?: any) => void;
    };
}
export declare enum StencilType {
    Default = "default"
}
declare const _default: ({ type, Data, readyPromise }: Props) => JSX.Element | null;
export default _default;
