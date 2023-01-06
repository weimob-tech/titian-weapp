#### 安装依赖

```
pnpm i
```

#### 开发

```
npm start
```

导入 packages/weapp/example 进入微信开发者工具

#### 提交

```
npm run commit
```

### 打包

```
npm run build
```

### 测试

```
npm test
```

### 发版

```
npm run release:version
npm run release:publish
```

#### vscode 插件

1. WXML - Language Services
2. ESLint
3. stylelint
4. Prettier Formatter for Visual Studio Code

#### 规范

#### husky git hooks

[husky](https://github.com/typicode/husky)

```
// 已添加
 npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
// 待添加
 npx husky add .husky/pre-commit "npm run lint-staged"
```

#### git commit 检查

[@commitlint/cli](https://commitlint.js.org/#/)

#### git commit 规范

[@commitlint/config-conventional](https://commitlint.js.org/#/)

##### 规范 git commit 命令行工具

> [commitizen](https://commitizen-tools.github.io/commitizen/)  
> 定制规范
> [cz-customizable](https://github.com/leoforfree/cz-customizable)

#### changelog

> [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)

#### stylelint

stylelint:格式化工具 postcss-less 内置在 stylelint 内

- (stylelint-config-standard)[https://github.com/stylelint/stylelint-config-standard]: 扩展官方推荐 `stylelint-config-recommended`

- (stylelint-config-rational-order)[https://github.com/constverum/stylelint-config-rational-order]:排序规范
- stylelint-config-prettier:关闭 stylelint 风格检查

```

"rules": {
   // 与  order/properties-order 冲突 故而关闭
    "declaration-empty-line-before": null,
    // 最大嵌套深度
    "max-nesting-depth": [2, {}],
    // 与less 命名空间冲突 故而关闭
    "at-rule-no-unknown": null,
    // 排序
    'order/properties-order': [sortOrderSmacss({ emptyLineBefore: 'always',noEmptyLineBetween: true })],
    // 设置通用字体,当我们在指定特定字体给某一样式时，需要设置兜底字体方案以保证兼容性，@TODO: 暂时关闭,后期再议
    "font-family-no-missing-generic-family-keyword": null,
    "unit-no-unknown": [
      true,
      {
        "ignoreUnits": ["rpx"]
      }
    ]
  }
```

| name                                         | extention id               |
| -------------------------------------------- | -------------------------- |
| 1. WXML - Language Services                  | cnyballk.wxml-vscode       |
| 2. ESLint                                    | dbaeumer.vscode-eslint     |
| 3. stylelint                                 | stylelint.vscode-stylelint |
| 4. Prettier Formatter for Visual Studio Code | esbenp.prettier-vscode     |
