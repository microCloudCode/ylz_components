import React, { useEffect, useState } from 'react';
import styles from './table.less';
import { TableData } from '../type';

interface Props {
  columns: {
    title: string;
    dataIndex: string;
  }[];
  dataSource: TableData[];
}

/**
 * table
 */
export default ({ columns, dataSource }: Props) => {
  const title = columns.map((e, i, arr) => {
    return (
      <div key={e.dataIndex} className={styles.columns_item}>
        <span>{e.title}</span>
      </div>
    );
  });

  const rowItem = dataSource.map((e, i) => {
    return (
      <div key={i} className={styles.body_row}>
        {columns.map((res, i) => (
          <div
            key={res.dataIndex}
            className={`${styles.body_row_item} ${
              i === 0 ? styles.body_row_item_title : styles.body_row_item_line
            }`}
          >
            <span>{e[res.dataIndex]}</span>
          </div>
        ))}
        {e.isUnusual && <div className={styles.body_row_star}>*</div>}
      </div>
    );
  });

  return (
    <div className={styles.table}>
      {/* 头部 */}
      <div className={styles.columns}>{title}</div>
      {/* 表格内容 */}
      <div className={styles.body}>{rowItem}</div>
    </div>
  );
};
