const path = require('path');
const fs = require('fs-extra');
const ci = require('miniprogram-ci');
const prompts = require('prompts');
// const { webhook } = require('./webhook');

function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

class WxTool {
  projectPath = path.resolve(process.cwd(), 'examples', 'example-weapp');

  privateKeyPath = path.resolve(this.projectPath, 'private.key');

  projectConfigPath = path.resolve(this.projectPath, 'project.config.json');

  constructor() {
    this.projectConfig = fs.readJsonSync(this.projectConfigPath);
    this.project = new ci.Project({
      appid: this.projectConfig.appid, // 小程序AppID
      type: 'miniProgram',
      projectPath: this.projectPath, // 打包文件路径
      privateKeyPath: this.privateKeyPath
    });
    this.packNpm = this.packNpm.bind(this);
    this.packNpmDebounce = debounce(this.packNpm, 1000);
  }

  packNpm() {
    return ci.packNpm(this.project, {
      reporter: (infos) => {
        console.log('微信小程序重新构建时长', `${infos.pack_time}ms`);
      }
    });
  }

  async upload() {
    const { version = '' } = await prompts([
      {
        type: 'text',
        name: 'version',
        message: '请输入版本号',
        initial: `1.0.0`
      }
    ]);

    const { desc = '' } = await prompts([
      {
        type: 'text',
        name: 'desc',
        message: '请输入描述',
        initial: `请输入描述`
      }
    ]);
    if (!version) {
      return Promise.reject();
    }
    return ci
      .upload({
        project: this.project,
        version,
        desc,
        setting: this.projectConfig.setting,
        onProgressUpdate: console.log
      })
      .then((res) => {
        console.log('上传成功', res);
        // webhook({
        //   msgtype: 'markdown',
        //   markdown: {
        //     content: `小程序<font color="comment"> ${this.projectConfig.projectname}</font><font color="warning"> ${version}</font> 代码发布成功, 请去草稿箱发布\n<font color="info"><@all></font>`
        //   }
        // });
      })
      .catch((e) => {
        // webhook({
        //   msgtype: 'markdown',
        //   markdown: {
        //     content: `小程序<font color="comment"> ${this.projectConfig.projectname}</font><font color="warning"> ${version}</font> 代码发布失败, ${e.message} \n<font color="info"><@all></font>`
        //   }
        // });
      });
  }
}
const tool = new WxTool();
module.exports.wxTool = tool;
