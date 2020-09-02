import React, { useEffect } from 'react';
import styles from './foot.less';
import { FootDataModelState } from '../../../type';
import foot_2 from '../../../../../assets/foot_2.png';
interface Props {
  Data: FootDataModelState;
}

export default ({ Data }: Props) => {
  const info = Data.info.map((e, i) => {
    return (
      <div key={i} className={styles.body_info_item}>
        <span className={styles.body_info_item_title}>{e.title}</span>
        <span className={styles.body_info_item_colon}>:</span>
        <span className={styles.body_info_item_value}>{e.value}</span>
      </div>
    );
  });
  return (
    <>
      {/* 分割线 */}
      <div className={styles.br}></div>
      <div className={styles.body}>
        <img
          src={foot_2}
          className={styles.body_bg_1}
        />
        <img
          src={"http://xm.gwtj.net:8888/upload/temp/tjbg_fm1.png"}
          className={styles.body_bg_2}
        />
        <div className={styles.body_text}>
          <div className={styles.body_text_title}>{Data.text.title}</div>
          <pre className={styles.body_text_content}>{Data.text.content}</pre>
        </div>
        <div className={styles.body_info}>{info}</div>
      </div>
    </>
  );
};
