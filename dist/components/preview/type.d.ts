export declare enum ComponentType {
    Table = "table",
    Img = "img",
    Report = "report"
}
/**
 * 数据源结构
 */
export interface PrintDataModelState {
    info: InfoDataModelState;
    page: PageValue[];
    foot: FootDataModelState;
}
export interface InfoDataModelState {
    data: {
        [others: string]: {
            title: string;
            data: string;
        };
    };
    cover: string[];
    detailsInfo: string[];
    headerInfo: {
        barCode: string;
        info: string[];
    };
}
export interface TableData {
    isPrint: boolean;
    isUnusual: boolean;
    code: string;
    data: {
        [others: string]: {
            val: string;
            mark: string | null;
        };
    };
}
export interface TableType {
    title: string | null;
    columns: {
        title: string;
        dataIndex: string;
    }[];
    data: TableData[];
    author: string | null;
}
export interface ImgType {
    title: string;
    src: string;
    isRotate: boolean;
}
export interface ReportType {
    title: string;
    reportInfo: {
        title: string;
        value: string;
    }[];
    basicInfo: string[];
    img: string[];
    description: string;
    say: string;
    foot: {
        title: string;
        value: string;
    }[][];
}
export interface PageValue {
    code: string;
    type: ComponentType;
    isPrint: boolean;
    isNewPage: boolean;
    data: TableType | ImgType | ReportType;
}
export interface FootDataModelState {
    text: {
        title: string;
        content: string;
    };
    info: {
        title: string;
        value: string;
    }[];
}
