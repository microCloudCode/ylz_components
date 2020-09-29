import React, { useEffect } from 'react';
import styles from './report.less';
import { ReportType, InfoDataModelState } from '../../../type';
import hongshiziPng from '../../../../../assets/hongshizi.png';

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
        <span className={`${styles.info_item_title} ${styles.boldText}`}>{info.data[e].title}</span>
        <span>：</span>
        <span>{info.data[e].data}</span>
      </div>
    );
  });
  const reportInfo = data.reportInfo.map((e, i) => {
    return (
      <div className={styles.reportInfo_item} key={i}>
        <span className={styles.boldText}>{e.title}：</span>
        <span>{e.value}</span>
      </div>
    );
  });

  // 图片列表
  const imgList = data?.img?.map((e, i, arr) => {
    return (
      <img src={e}
        className={`${styles.imgList_item} ${arr.length - 1 === i ? "" : styles.marginRight10}`}
        key={i} />
    );
  });
  // 底部
  const foot = data.foot.map((e, i) => {
    return (
      <div className={styles.foot_row} key={i}>
        {e.map((res, i) => (
          <div className={styles.foot_row_item} key={i}>
            <span className={styles.boldText}>{res.title}：</span>
            <span>{res.value}</span>
          </div>
        ))}
      </div>
    );
  });
  return (
    <div className={styles.body}>
      {/* 标题 */}
      <div className={styles.header}>
        <img src={hongshiziPng} className={styles.header_img} />
        <div className={styles.title}>
          <div className={styles.header_hospital}>{info.data?.hospital?.data}</div>
          <div className={styles.header_title}>{data.title}</div>
        </div>
      </div>
      {/* 报告信息 */}
      <div className={styles.reportInfo}>{reportInfo}</div>
      {/* 基本信息 */}
      <div className={styles.info}>{infoList}</div>
      {/* 图片 */}
      {data?.img?.length !== 0 && <div className={styles.imgList_box}>
        <div className={styles.boldText}>超声图像：</div>
        <div className={styles.imgList}>{imgList}</div>
      </div>}
      <div className={styles.box}>
        {/* 描述 */}
        <div className={styles.description}>
          <div className={styles.boldText}>超声所见：</div>
          <pre className={styles.pre}>{data.description}</pre>
        </div>
        {/* 诊断 */}
        <div className={styles.say}>
          <div className={styles.boldText}>超声提示：</div>
          <pre className={styles.pre}>{data.say}</pre>
        </div>
      </div>
      {/* 底部 */}
      <div className={styles.foot}>
        <div>仅供临床参考，不作证明材料!</div>
        <div>{foot}</div>
      </div>
    </div>
  );
};
