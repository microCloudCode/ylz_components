export declare enum ComponentType {
    Table = "table",
    Img = "img",
    Report = "report"
}
export declare const Data: {
    info: {
        data: {
            title: {
                title: string;
                data: string;
            };
            number: {
                title: string;
                data: string;
            };
            name: {
                title: string;
                data: string;
            };
            age: {
                title: string;
                data: string;
            };
            sex: {
                title: string;
                data: string;
            };
            tel: {
                title: string;
                data: string;
            };
            date: {
                title: string;
                data: string;
            };
            type: {
                title: string;
                data: string;
            };
            licenseNum: {
                title: string;
                data: string;
            };
            address: {
                title: string;
                data: string;
            };
            avatar: {
                title: string;
                data: string;
            };
        };
        cover: string[];
        detailsInfo: string[];
        headerInfo: {
            info: string[];
            barCode: string;
        };
    };
    page: any[];
    foot: {
        text: {
            title: string;
            content: string;
        };
        info: {
            title: string;
            value: string;
        }[];
    };
};
export default Data;
