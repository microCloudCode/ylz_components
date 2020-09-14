/// <reference types="react" />
import { PrintDataModelState } from '../../type';
interface Props {
    type?: string;
    Data: PrintDataModelState;
    onLoad: () => void;
}
export declare enum StencilType {
    Default = "default"
}
declare const _default: ({ type, Data, onLoad }: Props) => JSX.Element | null;
export default _default;
