import React, { useEffect, useState } from 'react';
import styles from './index.less';
import ReactDOM from 'react-dom';

interface Props {
  visible: boolean,
  children: JSX.Element,
  onClose: () => void,//关闭
  title: string,
  button: JSX.Element
}

export default ({ visible, children, onClose, title, button }: Props) => {

  return (
    <>
      {visible && ReactDOM.createPortal(
        <div className={styles.drawer} onClick={() => onClose()}>
          <div onClick={(e) => e.stopPropagation()} className={styles.body}>
            <div className={styles.header}>
              <div className={styles.header_left}>{title}</div>
              <div className={styles.header_right}>{button}</div>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>,
        document.getElementById('root') as Element
      )}
    </ >
  );
}
