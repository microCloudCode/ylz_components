import React, { useContext, useEffect, useRef } from 'react';
import styles from './index.less';
import Cover from './cover';
import { PrintDataModelState } from '../../../type';
import Page from './page';
import Foot from './foot';
import { StencilContext } from '../../../index';

interface Props {
  Data: PrintDataModelState;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 默认的渲染模版
 */
export default ({ Data, onLoad, onError }: Props) => {
  const { coverUrl } = useContext(StencilContext);
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
        <Foot Data={Data.foot} />
      </div>
    </>
  );
};
