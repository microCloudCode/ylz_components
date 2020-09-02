import React, { useEffect } from 'react';
import styles from './cover.less';
import { PrintDataModelState } from '../../../type';

interface Props {
  Data: PrintDataModelState;
}

/**
 * 封面
 */
export default ({ Data }: Props) => {
  const info = Data.info.cover.map(e => {
    return (
      <div key={e}>
        <span className={styles.cover_box_title}>
          {Data.info.data[e].title}
        </span>
        <span className={styles.cover_box_colon}>:</span>
        <span className={styles.cover_box_text}>{Data.info.data[e].data}</span>
      </div>
    );
  });
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.cover_title}>
        <span className={styles.cover_title_text}>
          {Data.info.data?.title?.data}
        </span>
      </div>
      <div className={styles.cover_tips}>
        <span className={styles.cover_tips_en}>Health Examination Report</span>
        <span className={styles.cover_tips_cn}>健康体检报告</span>
      </div>
      {/* 信息 */}
      <div className={styles.cover_box}>{info}</div>
      {/*  */}
      <div className={styles.cover_img}>
        <img
          src={"http://xm.gwtj.net:8888/upload/temp/tjbg_fm2.png"}
          className={styles.cover_img_bg}
        />
        <div className={styles.cover_img_tips}>
          <span className={styles.cover_img_tips_text}>
            *本报告仅用于健康检查，不做任何其他用途
          </span>
          {/* <span  className={styles.cover_img_tips_logo}>公卫体检</span> */}
        </div>
      </div>
    </>
  );
};
