# 易联众公共组件

## 支持平台
+ web

## 安装

`$ yarn add github:microCloudCode/ylz_components#tag`

## Report

### 例子

```javascript
import { Report } from 'ylz_components';

const reportRef = useRef(null)
<Report ref={reportRef} coverUrl={url} footUrl={url} />

reportRef.current.open(data)//预览
reportRef.current.print(data)//打印

```