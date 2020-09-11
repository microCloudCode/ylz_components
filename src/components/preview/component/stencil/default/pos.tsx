import React, { useEffect } from 'react';
import styles from './pos.less';
import { FootDataModelState, PosType } from '../../../type';

interface Props {
  data: {
    type: PosType,
    data: string,
    x: number,
    y: number
  }[]
}


export default ({ data }: Props) => {

  const arr = data.map((e, i) => {
    let pos = {
      left: `${e.x}pt`,
      top: `${e.y}pt`,
    }
    if (e.type === PosType.Text) {
      return <pre style={pos} key={i} className={`${styles.item} ${styles.text}`}>{e.data}</pre>
    }
    if (e.type === PosType.Img) {
      return <img src={e.data} style={pos} key={i} className={`${styles.item} ${styles.img}`} />
    }

    return null;
  })
  return (
    <>{arr}</>
  );
};
