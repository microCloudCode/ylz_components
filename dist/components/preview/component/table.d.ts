/// <reference types="react" />
import { TableData } from '../type';
interface Props {
    columns: {
        title: string;
        dataIndex: string;
    }[];
    dataSource: TableData[];
}
declare const _default: ({ columns, dataSource }: Props) => JSX.Element;
/**
 * table
 */
export default _default;
