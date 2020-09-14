/// <reference types="react" />
/**
 * 旋转图片
 */
interface Props {
    rot: number;
    src: string;
    onStart: () => any;
    onLoad: () => any;
    onError: () => any;
}
declare const _default: ({ rot, src, onLoad, onError, onStart }: Props) => JSX.Element;
export default _default;
