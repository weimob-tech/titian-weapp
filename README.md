<p align="center">
  <img src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/Logo_Titian.png" width="300" />
</p>

<div align="center">

[![NPM][npm-badge]][npm-url] [![FIGMA][figma-badge]][figma-url] [![LICENSE][license-badge]][license-url] [![NPM downloads][download-image]][download-url]

[npm-badge]: https://img.shields.io/npm/v/@titian-design/weapp.svg
[npm-url]: https://www.npmjs.com/package/@titian-design/weapp
[figma-badge]: https://img.shields.io/badge/Figma-UIKit-%2318a0fb
[figma-url]: https://www.figma.com/community/file/1194917512409387064
[license-badge]: https://img.shields.io/npm/l/@titian-design/weapp
[license-url]: https://github.com/weimob-tech/titian-weapp/blob/master/LICENSE
[download-image]: https://img.shields.io/npm/dm/@titian-design/weapp
[download-url]: https://npmjs.org/package/@titian-design/weapp

</div>

[Titian Design](https://github.com/weimob-tech/titian-design) 适配微信小程序的组件库。

## 🏆 预览
可交互式组件示例，请使用微信扫码预览 ↓

<img width="200px" src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/titian-mp-qrcode.png" />

## 🎉 特性
- 60+ 高质量组件
- 适配移动端交互
- 支持主题定制，内置三种风格
- 国际化支持
- 多渠道支持，借力微盟自研小程序多渠道转码工具（即将开源）

## 🔥 安装

小程序支持使用 NPM 安装第三方包。

具体使用方式，可以参考小程序官网文档： [《NPM 支持》](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)
```shell
npm install @titian-design/weapp -S --production
```

## 👍 使用
以按钮组件为例，首先在json文件中引入按钮组件
```json
{
  "usingComponents": {
    "ti-button": "@titian-design/weapp/button/index"
  }
}
```
然后就可在wxml中使用按钮组件
```html
<ti-button type="primary">按钮</ti-button>
```

## 🔨 本地开发

```bash
$ git clone git@github.com:weimob-tech/titian-weapp.git
$ cd titian-weapp
$ npm install pnpm -g
$ pnpm install
$ pnpm start
```
开发者工具中打开example/example-weapp目录

## 🎈 协议

Titian Design 使用 [MIT 协议](LICENSE)
