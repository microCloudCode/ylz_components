/// <reference types="react" />
import { PrintDataModelState } from '../../../type';
interface Props {
    Data: PrintDataModelState;
    coverUrl: string;
    footUrl: string;
    onLoad?: () => void;
    onError?: () => void;
}
declare const _default: ({ Data, coverUrl, footUrl, onLoad, onError }: Props) => JSX.Element;
/**
 * 默认的渲染模版
 */
export default _default;
