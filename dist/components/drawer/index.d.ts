/// <reference types="react" />
interface Props {
    visible: boolean;
    children: JSX.Element;
    onClose: () => void;
    title: string;
    button: JSX.Element;
}
declare const _default: ({ visible, children, onClose, title, button }: Props) => JSX.Element;
export default _default;
