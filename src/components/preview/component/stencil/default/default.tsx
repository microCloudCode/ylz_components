import React, { useEffect } from 'react';
import styles from './default.less';
import Cover from './cover';
import { PrintDataModelState } from '../../../type';
import Page from './page';
import Foot from './foot';

interface Props {
  Data: PrintDataModelState;
  calculatedPromise: {
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
  };
  pushLoadItem: (e: any) => any;
  coverUrl: string;
  footUrl: string
}

/**
 * 默认的渲染模版
 */
export default ({ Data, calculatedPromise, pushLoadItem, coverUrl, footUrl }: Props) => {
  return (
    <>
      {/* 封面 */}
      <div className={`${styles.cover} ${styles.A4}`}>
        <Cover Data={Data} coverUrl={coverUrl} />
      </div>
      {/* 页内容 */}
      <Page Data={Data} calculatedPromise={calculatedPromise} pushLoadItem={pushLoadItem} />
      {/* 尾页 */}
      <div className={`${styles.A4}`}>
        <Foot Data={Data.foot} footUrl={footUrl} />
      </div>
    </>
  );
};
