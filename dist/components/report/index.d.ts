import React from 'react';
interface Props {
    coverUrl: string;
    footUrl: string;
}
interface ref {
    open: (data: any) => any;
    print: (data: any) => any;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<ref>>;
export default _default;
