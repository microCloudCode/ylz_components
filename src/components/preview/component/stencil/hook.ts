import { useState, useRef, useEffect } from 'react';
import { PrintDataModelState, ComponentType, PageValue, TableType } from '../../type';

/**
 * 裁剪表格
 * @param arr 源数组
 * @param htmlList 已渲染DOM列表
 * @param MaxHeight 最大高度
 */
function cropTable(arr: PageValue[][], htmlList: Element[], MaxHeight: number) {
  let item = arr[arr.length - 1];
  let index = htmlList.findIndex(e => {
    //得到裁剪位置
    let offsetTop = (e as any).offsetTop;
    let height = e.clientHeight;
    if (offsetTop + height > MaxHeight) {
      return true;
    }
  });

  // 第一项超出，则全部放到下一页展示
  if (index === 0) {
    let i = item.pop() as PageValue;
    arr.push([i]);
    return arr;
  }

  console.log('裁剪位置:', index);

  let table = item[item.length - 1].data as TableType; //旧Table
  let obj: PageValue = JSON.parse(JSON.stringify(item[item.length - 1])); //拷贝到新对象
  let newTable = obj.data as TableType;
  newTable.data = table.data.splice(index);
  newTable.title = null; //去掉title
  table.author = null;

  arr.push([obj]);
  return arr;
}

export function usePageList(
  Data: PrintDataModelState,
  getHeight: () => number | undefined,
  getHtmlList: (index: number) => {
    content: Element | undefined;
    list: Element[];
  },
  readyPromise: {
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
  },
) {
  const El = useRef({
    index: 0, //当前计算的索引标识
  });
  const [pageList, setPageList] = useState(
    Data.page.length === 0 ? [] : [[Data.page[El.current.index]]],
  ); //页面数组

  useEffect(() => {
    if (pageList.length === 0) {
      readyPromise.res('绘制完毕');
      return;
    }
    let arr: PageValue[][] = JSON.parse(JSON.stringify(pageList));

    let height = getHeight(); //获取高度
    let lastArr = arr[arr.length - 1];
    let lastItem = lastArr[lastArr.length - 1];
    // 判断是否超出边界
    if (lastItem.type === ComponentType.Table) {
      //表格
      let itemDom = getHtmlList(lastArr.length - 1);
      let itemDomPos = itemDom.content?.clientHeight + (itemDom?.content as any)?.offsetTop;
      if (height && itemDomPos > height && itemDom.list) {//超出边界
        setPageList(cropTable(arr, itemDom.list, height)); //裁剪表格
        return;
      }
    }

    // 坐标已到达极限
    if (El.current.index >= Data.page.length - 1) {
      readyPromise.res('绘制完毕');
      return;
    }

    // 移动坐标，继续绘制
    ++El.current.index;
    let item = Data.page[El.current.index]; //取出要渲染的项
    if (item.isNewPage || lastItem.isNewPage) {
      arr.push([item]); //创建新页
    } else {
      arr[arr.length - 1].push(item); //在本页尾部追加
    }
    setPageList(arr);
  }, [pageList]);

  return [pageList];
}
