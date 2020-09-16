import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import Cover from './cover';
import { PrintDataModelState } from '../../../type';
import Page from './page';
import Foot from './foot';

interface Props {
  Data: PrintDataModelState;
  coverUrl: string;
  footUrl: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 默认的渲染模版
 */
export default ({ Data, coverUrl, footUrl, onLoad, onError }: Props) => {
  return (
    <>
      {/* 封面 */}
      <div className={`${styles.cover} ${styles.A4}`}>
        <Cover Data={Data.info} coverUrl={coverUrl} />
      </div>
      {/* 页内容 */}
      <Page Data={Data} onLoad={() => onLoad && onLoad()} onError={() => onError && onError()} />
      {/* 尾页 */}
      <div className={`${styles.A4}`}>
        <Foot Data={Data.foot} footUrl={footUrl} />
      </div>
    </>
  );
};
