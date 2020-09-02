import React, { useEffect } from 'react';
import Default from './default/default';
import { PrintDataModelState } from '../../type';

interface Props {
  type?: string;
  Data: PrintDataModelState;
  readyPromise: {
    res: (value?: unknown) => void;
    rej: (reason?: any) => void;
  };
}

export enum StencilType {
  Default = 'default',
}

export default ({ type = StencilType.Default, Data, readyPromise }: Props) => {
  switch (type) {
    case StencilType.Default:
      return <Default Data={Data} readyPromise={readyPromise} />;
    default:
      return null;
  }
};
