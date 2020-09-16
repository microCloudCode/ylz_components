import React, { useEffect, useMemo, useRef } from 'react';
import Default from './default';
import { PrintDataModelState } from '../../type';
import { usePromise } from '../../hook';

interface Props {
  type?: string;
  Data: PrintDataModelState;
  onLoad: () => void;//dom结构计算完毕
  onError: () => void;
  coverUrl: string;
  footUrl: string
}

export enum StencilType {
  Default = 'default',
}

export default ({ type = StencilType.Default, Data, onLoad, onError, coverUrl, footUrl }: Props) => {
  switch (type) {
    case StencilType.Default:
      return <Default Data={Data}
        onLoad={() => onLoad()}
        onError={() => onError()}
        coverUrl={coverUrl}
        footUrl={footUrl} />;
    default:
      return null;
  }
};
