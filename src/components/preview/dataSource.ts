
export enum ComponentType {
  Table = 'table',
  Img = 'img',
  Report = 'report', //报告
}

// 测试数据
let test1 = Array(10).fill({
  type: ComponentType.Table, //表格
  isPrint: true, //是否打印
  isNewPage: false,
  data: {
    title: '检验科',
    columns: [
      {
        //表格列的配置描述
        title: '项目名称',
        dataIndex: 'name',
      },
      {
        title: '参考结果',
        dataIndex: 'res',
      },
      {
        title: '参考值',
        dataIndex: 'value',
      },
      {
        title: '不知道叫什么好',
        dataIndex: 'ceshi',
      },
    ],
    data: [
      {
        //数据数组
        isPrint: true, //是否打印
        isUnusual: true,
        name: '尿酸',
        res: '2.4 ↓',
        value: '200~300',
        ceshi: '123',
      },
      {
        isPrint: true, //是否打印
        name: '尿酸',
        res: '411',
        value: '200~300',
        ceshi: '123',
      },
      {
        isPrint: true, //是否打印
        name: '尿酸',
        res: '411',
        ceshi: '123',
        value: '200~300',
      },
    ],
    author: '李怕怕',
  },
});
test1.push({
  type: ComponentType.Img,
  isPrint: true, //是否打印
  isNewPage: true,
  data: {
    src:
      'https://alipic.lanhuapp.com/psccbcfbbce1189751-7dcc-4355-af9c-88e2d5a347ef',
  },
});
test1.push({
  type: ComponentType.Report,
  isPrint: true, //是否打印
  isNewPage: true,
  data: {
    title: '报告单',
    reportInfo: [
      {
        title: '检查部位',
        value: '不知道',
      },
      {
        title: '超声号',
        value: '000000001E',
      },
    ],
    basicInfo: ['title'], //基本信息
    img: [
      'https://pic4.zhimg.com/80/v2-94d36b3f5fd4af60da29dee03f9ddce7_1440w.jpg',
      'https://pic4.zhimg.com/80/v2-94d36b3f5fd4af60da29dee03f9ddce7_1440w.jpg',
    ],
    description:
      '超声所见 阿克苏等哈看手机等哈看介绍打算结婚的卡说的话啊看世界很多卡上的', //描述
    say: '没啥问题', //意见
    foot: [
      [
        {
          title: '申请医生',
          value: '',
        },
        {
          title: '检查医生',
          value: '董宗武',
        },
      ],
      [
        {
          title: '检查时间',
          value: '2020-04-18 07:23',
        },
      ],
    ],
  },
});
// 模拟数据
export const Data = {
  info: {
    //信息
    data: {
      title: {
        title: '医院名称',
        data: '厦门医院',
      }, //医院名称
      number: {
        title: '体检号',
        data: '123123',
      }, //体检号
      name: {
        title: '姓名',
        data: '123123',
      }, //性别
      age: {
        title: '年龄',
        data: '123123',
      }, //年龄
      sex: {
        title: '性别',
        data: '男',
      }, //性别
      tel: {
        title: '电话',
        data: '123123',
      }, //电话
      date: {
        title: '体检时间',
        data: '2020-5-5',
      }, //体检时间
      type: {
        title: '体检类型',
        data: '公卫体检',
      }, //体检类型
      licenseNum: {
        title: '证件号',
        data: '123123',
      }, //证件号
      address: {
        title: '现住址',
        data: '123123',
      }, //现住址
      avatar: {
        title: '头像',
        data:
          'https://alipic.lanhuapp.com/psccbcfbbce1189751-7dcc-4355-af9c-88e2d5a347ef',
      }, //头像
    },
    cover: ['title'], //封面信息
    detailsInfo: ['title'], //详细信息
    headerInfo: {
      info: ['number', 'sex', 'date'],
      barCode: 'number',
    },
  },
  page: test1,
  foot: {
    text: {
      title: '尊敬的客人：',
      content:
        '健康体检的目的在于观察身体各项功能的反应，了解您自身的健康状况，预防疾病的发生，能让您早期发现疾病、早期治疗。现将您的体检结果报告如下，请您详阅。如果您对体检结果有异议，请于收到报告后的一周内到本中心查询或致电健康热线（5235235325），我们将为您解答疑惑。为了您的健康，我们建议您每年进行一次系统体检',
    },
    info: [
      {
        title: '客服热线',
        value: '030123123',
      },
      {
        title: '地址',
        value: '福建省福州省丰南区王兰庄镇卫生院',
      },
      {
        title: '客服热线',
        value: '030123123',
      },
    ],
  },
};

export default Data;
