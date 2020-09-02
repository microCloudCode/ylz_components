import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import styles from './index.less';
import Stencil, { StencilType } from './component/stencil';
import {  PrintDataModelState } from './type';
import { message } from 'antd';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { downloadFile } from '../../utils/util';

/**
 * 预览组件
 */
export interface PreviewRef {
  print: () => any; //打印
  pdf: () => any; //生成pdf
}

interface Props {
  hideRender: boolean; //隐藏渲染
  data: PrintDataModelState;
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
  ({ hideRender, data }: Props, ref) => {
    const divRef = useRef<HTMLDivElement>(null);

    const readyPromise = useMemo(() => {
      //模版计算，渲染完毕的标识
      let res = null;
      let rej = null;
      let promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      return {
        promise,
        res: (res as unknown) as (value?: unknown) => void,
        rej: (rej as unknown) as (reason?: any) => void,
      };
    }, []);

    useImperativeHandle(ref, () => ({
      print: async () => {
        let hide = message.loading('绘制中...', 0);
        await readyPromise.promise;
        handlePrint && (await handlePrint());
        hide();
      },
      pdf: async () => {
        let hide = message.loading('生成中...', 0);
        await readyPromise.promise;
        await handlePdf();
        hide();
      },
    }));

    // 直接打印
    const handlePrint = useReactToPrint({
      content: () => divRef.current,
      documentTitle: '体检报告',
      onBeforePrint: () => {
        console.log('完毕123');
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
          readyPromise={{
            res: readyPromise.res,
            rej: readyPromise.rej,
          }}
        />
      </div>
    );
  },
);
