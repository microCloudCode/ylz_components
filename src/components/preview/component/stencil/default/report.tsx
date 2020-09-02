import React, { useEffect } from 'react';
import styles from './report.less';
import { ReportType, InfoDataModelState } from '../../../type';

interface Props {
  data: ReportType;
  info: InfoDataModelState;
}

/**
 * 报告单
 */
export default ({ data, info }: Props) => {
  const infoList = data.basicInfo.map((e, i) => {
    return (
      <div className={styles.info_item} key={e}>
        <span className={styles.info_item_title}>{info.data[e].title}</span>
        <span>：</span>
        <span>{info.data[e].data}</span>
      </div>
    );
  });
  const reportInfo = data.reportInfo.map((e, i) => {
    return (
      <div className={styles.reportInfo_item} key={i}>
        <span>{e.title}：</span>
        <span>{e.value}</span>
      </div>
    );
  });
  // 图片列表
  const imgList = data.img.map((e, i) => {
    return (
      <div className={styles.imgList_item} key={i}>
        <img src={e} className={styles.imgList_item_img} />
      </div>
    );
  });
  // 底部
  const foot = data.foot.map((e, i) => {
    return (
      <div className={styles.foot_row} key={i}>
        {e.map((res, i) => (
          <div className={styles.foot_row_item} key={i}>
            <span>{res.title}：</span>
            <span>{res.value}</span>
          </div>
        ))}
      </div>
    );
  });
  return (
    <>
      {/* 标题 */}
      <div className={styles.title}>{data.title}</div>
      {/* 报告信息 */}
      <div className={styles.reportInfo}>{reportInfo}</div>
      {/* 基本信息 */}
      <div className={styles.info}>{infoList}</div>
      {/* 图片 */}
      <div className={styles.imgList}>{imgList}</div>
      {/* 描述 */}
      <div className={styles.description}>
        <pre className={styles.pre}>{data.description}</pre>
      </div>
      {/* 诊断 */}
      <div className={styles.say}>
        <pre className={styles.pre}>{data.say}</pre>
      </div>
      {/* 底部 */}
      <div className={styles.foot}>{foot}</div>
    </>
  );
};
