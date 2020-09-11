/// <reference types="react" />
import { PosType } from '../../../type';
interface Props {
    data: {
        type: PosType;
        data: string;
        x: number;
        y: number;
    }[];
}
declare const _default: ({ data }: Props) => JSX.Element;
export default _default;
