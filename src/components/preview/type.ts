export enum ComponentType {
  Table = 'table',
  Img = 'img',
  Report = 'report', //报告
}

export enum PosType {
  Text = 'text',
  Img = 'img',
}

/**
 * 数据源结构
 */
export interface PrintDataModelState {
  info: InfoDataModelState;
  page: PageValue[]; //页报告
  foot: FootDataModelState; //尾页
}


export interface InfoDataModelState {
  data: {
    [others: string]: {
      //数据源
      title: string;
      data: string;
    };
  };
  cover: string[]; //封面信息
  detailsInfo: string[]; //详细信息
  headerInfo: {
    //页眉信息
    barCode: string; //条形码变量
    info: string[];
  };
}


export interface TableData {
  isPrint: boolean; //是否打印
  isUnusual: boolean; //是否异常
  code: string,//code码
  data: {
    [others: string]: {
      val: string,//值
      mark: string | null,//超标符号
    };
  }
}

// 表格
export interface TableType {
  title: string | null;
  columns: {
    title: string;
    dataIndex: string;
  }[];
  data: TableData[];
  author: string | null; //检查医师
}

// 图片
export interface ImgType {
  title: string;
  src: string;
  isRotate: boolean,//是否旋转
  pos: {
    type: PosType,
    data: string,
    x: number,
    y: number
  }[]
}

// 报告
export interface ReportType {
  title: string; //标题
  reportInfo: {
    //报告信息
    title: string;
    value: string;
  }[];
  basicInfo: string[]; //基本信息 值为 索引info的data
  img: string[]; //图片
  description: string; //描述
  say: string; //意见
  foot: {
    title: string;
    value: string;
  }[][];
}

export interface PageValue {
  code: string;
  type: ComponentType; //组件类型
  isPrint: boolean; //是否打印
  isNewPage: boolean; //控制是否新起一页 false则为算法控制页分布
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