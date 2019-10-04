# code-complexity

代码复杂度检测工具

```js
npm i c-complexity --save
```

```js
const cc = require('c-complexity');
cc({},10);
```

## 参数

```js
cc(scanParam,min);
```

### scanParam

代码扫描的参数，参考：[code-scan](../code-scan/)

### min

最小提醒代码复杂度，默认为1

