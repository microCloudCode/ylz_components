import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styles from './index.less';
import Preview, { PreviewRef } from '../preview/index';
import Drawer from '../drawer/index';
import { Button, Space } from 'antd';

interface Props {
  coverUrl: string;
  footUrl: string;
}

interface ref {
  open: (data: any) => any;
  print: (data: any) => any;
}

export default forwardRef<ref, Props>(({ coverUrl, footUrl }: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [data, setData] = useState<any>(null);
  const previewRef = useRef<PreviewRef>(null);
  const hidePreviewRef = useRef<PreviewRef>(null);

  useImperativeHandle(ref, () => ({
    open: (data: any) => {
      setData(data)
      setVisible(true);
    },
    print: (data: any) => {
      setData(data)
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
        <Preview ref={previewRef} hideRender={false} Data={data} coverUrl={coverUrl} footUrl={footUrl} />
      </Drawer>}
      {/* 打印 */}
      {isPrint && (
        <Preview ref={hidePreviewRef} Data={data} hideRender={isPrint} coverUrl={coverUrl} footUrl={footUrl} />
      )}
    </div>
  );
})
