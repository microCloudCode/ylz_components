import React, {
  useRef,
  forwardRef,
  useImperativeHandle, useState, useEffect, useLayoutEffect
} from 'react';
import styles from './index.less';
import Stencil, { StencilType } from './component/stencil';
import { PageValue, ComponentType, TableType, PrintDataModelState } from './type';
import { message } from 'antd';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { usePromise } from './hook';

/**
 * 预览组件
 */
export interface PreviewRef {
  print: () => any; //打印
  pdf: () => any; //生成pdf
}

interface Props {
  hideRender: boolean; //隐藏渲染
  Data: PrintDataModelState;
  coverUrl: string;
  footUrl: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * html转base64图片
 * @param html
 */
async function html2Base64(html: HTMLElement) {
  let canvas = await html2canvas(html, {
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    scale: 3,
  });
  let base64 = canvas.toDataURL('image/jpeg', 1.0);
  return base64;
}

export default forwardRef<PreviewRef, Props>(
  ({ hideRender, Data, coverUrl, footUrl, onLoad, onError }: Props, ref) => {
    const firstUpdate = useRef(true)
    const [data, setData] = useState(() => ({
      ...Data,
      page: PageToPrintList(Data.page)
    }))
    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      setData({
        ...Data,
        page: PageToPrintList(Data.page)
      })
    }, [Data])
    const divRef = useRef<HTMLDivElement>(null);
    //页面布局计算完毕promise
    const pagePromise = usePromise([data]);
    // 即将打印promise
    const beforePrintPromise = usePromise([data]);
    const load = () => {
      console.log("计算完毕")
      pagePromise.res()
      onLoad && onLoad()
    }

    const error = () => {
      pagePromise.rej()
      onError && onError()
    }
    useImperativeHandle(ref, () => ({
      print: async () => {
        const key = 'print';
        message.loading({ content: '绘制中...', key });
        try {
          await pagePromise.promise;
          handlePrint && (await handlePrint());
          await beforePrintPromise.promise;
          message.success({ content: '绘制成功!', key, duration: 2 });
        } catch (err) {
          message.error({ content: '绘制错误!', key, duration: 2 });
        }
      },
      pdf: async () => {
        const key = 'pdf';
        message.loading({ content: '生成中...', key });
        try{
          await pagePromise.promise;
          await handlePdf();
          message.success({ content: '成功!', key, duration: 2 });
        }catch(err){
          message.error({ content: '错误!', key, duration: 2 });
        }
      },
    }));

    // 直接打印
    const handlePrint = useReactToPrint({
      content: () => divRef.current,
      documentTitle: '体检报告',
      bodyClass: styles.printWindows,
      onBeforePrint: () => {
        console.log('即将打印');
        beforePrintPromise.res()
      },
    });

    // 生成PDF
    const handlePdf = async () => {
      if (divRef.current === null) {
        return;
      }
      const doc = new jsPDF();
      let list = divRef.current.children;
      document.documentElement.classList.add('hide-scrollbar');
      for (let index = 0; index < list.length; index++) {
        if (index !== 0) {
          doc.addPage();
        }
        const element = list[index] as HTMLElement;
        let base64 = await html2Base64(element); //转base64图片
        doc.addImage(base64, 'JPEG', 0, 0, 210, 297);
      }
      doc.save('体检报告.pdf');
      document.documentElement.classList.remove('hide-scrollbar');
    };

    return (
      <div
        className={`${styles.body} ${hideRender ? styles.hide : ''}`}
        ref={divRef}
      >
        {/* 通过Type选择渲染组件 */}
        <Stencil
          Data={data}
          type={StencilType.Default}
          onLoad={load}
          onError={error}
          coverUrl={coverUrl}
          footUrl={footUrl}
        />
      </div>
    );
  },
);

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