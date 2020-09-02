import React, { useEffect } from 'react';
import styles from './default.less';
import Cover from './cover';
import { PrintDataModelState } from '../../../type';
import Page from './page';
import Foot from './foot';

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
  return (
    <>
      {/* 封面 */}
      <div className={`${styles.cover} ${styles.A4}`}>
        <Cover Data={Data} />
      </div>
      {/* 页内容 */}
      <Page Data={Data} readyPromise={readyPromise} />
      {/* 尾页 */}
      <div className={`${styles.A4}`}>
        <Foot Data={Data.foot} />
      </div>
    </>
  );
};
