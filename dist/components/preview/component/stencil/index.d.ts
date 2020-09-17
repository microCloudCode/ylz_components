/// <reference types="react" />
import { PrintDataModelState } from '../../type';
interface Props {
    type?: string;
    Data: PrintDataModelState;
    onLoad: () => void;
    onError: () => void;
    coverUrl: string;
    footUrl: string;
}
export declare enum StencilType {
    Default = "default"
}
declare const _default: ({ type, Data, onLoad, onError, coverUrl, footUrl }: Props) => JSX.Element | null;
export default _default;
