import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styles from './index.less';
import Preview, { PreviewRef } from '../preview/index';
import Drawer from '../drawer/index';
import { Button, Space } from 'antd';
import { PageValue, ComponentType, TableType } from '../preview/type';

// 去除不打印数据
function PageToPrintList(page: PageValue[]) {
  let arr: PageValue[] = JSON.parse(JSON.stringify(page));
  let list = arr.filter(e => e.isPrint);
  return list.map(e => {
    if (e.type === ComponentType.Table) {
      let table = e.data as TableType;
      let data = table.data.filter(e => e.isPrint);
      return { ...e, data: { ...e.data, data } };
    }
    return e;
  });
}

interface Props {

}

interface ref {
  open: (data: any) => any;
  print: (data: any) => any;
}

export default forwardRef<ref, Props>(({ }: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [data, setData] = useState<any>(null);
  const previewRef = useRef<PreviewRef>(null);
  const hidePreviewRef = useRef<PreviewRef>(null);

  useImperativeHandle(ref, () => ({
    open: (data: any) => {
      setData({
        info: data.info,
        page: PageToPrintList(data.page),
        foot: data.foot
      })
      setVisible(true);
    },
    print: (data: any) => {
      setData({
        info: data.info,
        page: PageToPrintList(data.page),
        foot: data.foot
      })
      setIsPrint(true)
    }
  }));

  useEffect(() => {
    if (isPrint) {
      hidePreviewRef.current?.print().then(() => {
        setIsPrint(false);
      });
    }
  }, [isPrint]);

  return (
    <div >
      {/* 预览 */}
      {visible && <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        title="预览"
        button={
          <Space className={styles.right} direction="horizontal" size={30}>
            <Button onClick={() => previewRef.current?.print()}>
              一键打印
              </Button>
            <Button onClick={() => previewRef.current?.pdf()}>生成PDF</Button>
          </Space>
        }
      >
        <Preview ref={previewRef} hideRender={false} data={data} />
      </Drawer>}
      {/* 打印 */}
      {isPrint && (
        <Preview ref={hidePreviewRef} data={data} hideRender={isPrint} />
      )}
    </div>
  );
})
