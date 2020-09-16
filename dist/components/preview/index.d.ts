import React from 'react';
import { PrintDataModelState } from './type';
/**
 * 预览组件
 */
export interface PreviewRef {
    print: () => any;
    pdf: () => any;
}
interface Props {
    hideRender: boolean;
    data: PrintDataModelState;
    coverUrl: string;
    footUrl: string;
    onLoad?: () => void;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<PreviewRef>>;
export default _default;
