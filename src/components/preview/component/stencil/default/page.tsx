import React, { useEffect, useRef, useState } from 'react';
import styles from './page.less';
import tableStyles from '../../table.less';
import DefaultStyles from './default.less';
import { PrintDataModelState, ComponentType, PageValue, TableType, ImgType, ReportType } from '../../../type';
import Table from '../../table';
import { usePageList } from '../hook';
import Report from './report';
import RotateImg from '../../../../rotateImg';
import Pos from './pos';
import Barcode from 'react-barcode';

interface Props {
  Data: PrintDataModelState;
  readyPromise: {
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
  };
}

/**
 * 默认的渲染模版
 */
export default ({ Data, readyPromise }: Props) => {
  const divEl = useRef<HTMLDivElement>(null);
  const getHeight = () => divEl.current?.clientHeight;
  const getHtmlList = (index: number) => {
    //获取已选染TableDOM
    const itemDom = divEl.current?.children[index];
    const list = itemDom?.getElementsByClassName(tableStyles.table)[0].children[1].children
    return {
      content: itemDom,//框
      list: list ? [...list] : [],//具体项
    }
  };
  const [pageList] = usePageList(Data, getHeight, getHtmlList, readyPromise);

  // 项目
  const pageItem = (e: PageValue[]) => {
    return e.map((res, i: number) => {
      if (res.type === ComponentType.Table) {
        //表格
        let data = res.data as TableType;
        return table(data, i);
      }
      if (res.type === ComponentType.Img) {
        //图片
        let data = res.data as ImgType;
        let isRotate = data.isRotate ?? true
        return (
          <div className={styles.page_content_img} key={i}>
            <RotateImg src={data.src} rot={isRotate ? 90 : 0} />
            <Pos data={data.pos} />
          </div>
        );
      }
      if (res.type === ComponentType.Report) {
        //报告单
        let data = res.data as ReportType;
        return <Report data={data} info={Data.info} key={i} />;
      }
      return null;
    });
  };

  // 页内容
  const page = pageList.map((e, index: number, arr) => {
    return (
      <div className={`${DefaultStyles.A4}`} key={index}>
        {/* 页眉 */}
        {  header(Data)}
        {/* 分割线 */}
        <div className={styles.br}></div>
        {/* 详细信息展示 */}
        {index === 0 && detailsInfo(Data)}
        {/* 内容 */}
        <div className={styles.page_content} ref={divEl}>
          {pageItem(e)}
        </div>
        {/* 分割线 */}
        <div className={styles.foot_br}></div>
        {/* 页尾 */}
        {foot(index + 1, arr.length)}
      </div>
    );
  });

  return <>{page}</>;
};

// 详细信息
function detailsInfo(Data: PrintDataModelState) {
  const detailsInfo = Data.info.detailsInfo;
  let arr: JSX.Element[] = [];
  let avatar = null; //头像
  detailsInfo.forEach(e => {
    if (e === 'avatar') {
      return (avatar = (
        <img
          src={Data.info.data[e].data}
          className={styles.detailsInfo_right_img}
        />
      ));
    }
    arr.push(
      <div className={styles.detailsInfo_left_item} key={e}>
        <span className={styles.detailsInfo_left_item_title}>
          {Data.info.data[e].title}
        </span>
        <span>：</span>
        <span>{Data.info.data[e].data}</span>
      </div>,
    );
  });
  return (
    <div className={styles.detailsInfo}>
      <div className={styles.detailsInfo_left}>{arr}</div>
      <div className={styles.detailsInfo_right}>{avatar}</div>
    </div>
  );
};

// 表格
function table(table: TableType, i: number) {
  return (
    <div className={styles.page_content_item} key={i}>
      {table.title && (
        <div className={styles.page_content_item_title}>{table.title}</div>
      )}
      <Table columns={table.columns} dataSource={table.data}></Table>
      {table.author && (
        <div className={styles.page_content_item_author}>
          检查医师&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{table.author}
        </div>
      )}
    </div>
  );
}

// 页眉
function header(Data: PrintDataModelState) {
  let info = Data.info.headerInfo;
  return (
    <div className={styles.page_header}>
      <div className={styles.page_header_orCode}>
        <Barcode
          value={Data.info.data[info.barCode].data}
          height={50}
          width={1.3}
          displayValue={false}
          margin={0}
        />
      </div>
      <div className={styles.page_header_info}>
        {info.info.map(e => {
          return (
            <div className={styles.page_header_info_item} key={e}>
              <span>{Data.info.data[e].title}：</span>
              <span>{Data.info.data[e].data}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 尾部
function foot(index: number, length: number) {
  return (
    <div className={styles.page_foot}>
      <span>*本报告仅用于健康检查，不做任何其他用途</span>
      <span className={styles.page_foot_text_center}>
        第 {index} / {length}页
      </span>
      <span className={styles.page_foot_text_right}>公卫体检</span>
    </div>
  );
}