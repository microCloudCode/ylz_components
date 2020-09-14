import React, { useEffect, useMemo, useRef } from 'react';
import Default from './default/default';
import { PrintDataModelState } from '../../type';
import { usePromise } from '../../hook';

interface Props {
  type?: string;
  Data: PrintDataModelState;
  onLoad: () => void;//dom结构计算完毕
  coverUrl: string;
  footUrl: string
}

export enum StencilType {
  Default = 'default',
}

export default ({ type = StencilType.Default, Data, onLoad, coverUrl, footUrl }: Props) => {
  const { current } = useRef<{ loadList: any[] }>({
    loadList: [],//等待计算项
  })
  const calculatedPromise = usePromise([]);//页面元素分布计算完成
  const pushLoadItem = (item: any) => {//添加等待计算项
    current.loadList.push(item)
  }

  useEffect(() => {
    calculatedPromise.promise.then(async e => {//分布计算完毕
      await Promise.all(current.loadList)//全部计算完毕
      onLoad()
    })
  }, [])

  switch (type) {
    case StencilType.Default:
      return <Default Data={Data} calculatedPromise={calculatedPromise} pushLoadItem={pushLoadItem}
        coverUrl={coverUrl}
        footUrl={footUrl} />;
    default:
      return null;
  }
};
