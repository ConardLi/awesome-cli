# code-scan

自定义规则扫描代码，返回路径名称。

使用方法：

```js
npm i c-scan --save
```

```js
const scan = require('c-scan');
scan({
    extensions:'**/*.js',
    rootPath:'src',
    defalutIgnore:'true',
    ignoreRules:[],
    ignoreFileName:'.gitignore'
});
```

`param`列表：

### extensions

- 扫描文件扩展名
- 默认值：`**/*.js`

### rootPath

- 扫描文件路径
- 默认值：`.`

### defalutIgnore

- 是否开启默认忽略（`glob`规则）
- `glob ignore`规则为内部使用，为了统一`ignore`规则，自定义规则使用`gitignore`规则
- 默认值：`true`

默认开启的 `glob ignore` 规则：

```js
const DEFAULT_IGNORE_PATTERNS = [
    'node_modules/**',
    'build/**',
    'dist/**',
    'output/**',
    'common_build/**'
];
```

### ignoreRules

- 自定义忽略规则（`gitignore`规则）
- 默认值：`[]`

### ignoreFileName

- 自定义忽略规则配置文件路径（`gitignore`规则）
- 默认值：`.gitignore`
- 指定为`null`则不启用`ignore`配置文件
