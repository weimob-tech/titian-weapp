/* eslint-disable @titian-design/check-life-items */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BasicComponentOptions } from '../interface/BasicComponentOptions';
import { convertChildrenNode, convertParentNode } from './relations';

// @ts-ignore
const convertOptions = (source, target, mapping = {}) => {
  Object.keys(mapping).forEach((k) => {
    if (source[k]) {
      // @ts-ignore
      target[mapping[k]] = source[k];
    }
  });
};

const BasicComponent = function BasicComponent<
  Data extends WechatMiniprogram.Component.DataOption = WechatMiniprogram.Component.DataOption,
  Props extends WechatMiniprogram.Component.PropertyOption = WechatMiniprogram.Component.PropertyOption,
  Methods extends WechatMiniprogram.Component.MethodOption = WechatMiniprogram.Component.MethodOption,
  Property extends WechatMiniprogram.IAnyObject = WechatMiniprogram.IAnyObject
>(options: BasicComponentOptions<Data, Props, Methods, Property>): void {
  const basicOptions: WechatMiniprogram.Component.Options<Data, Props, Methods> = {};
  {
    convertOptions(options, basicOptions, {
      properties: 'properties',
      data: 'data',
      observers: 'observers',
      methods: 'methods',
      behaviors: 'behaviors',
      created: 'created',
      attached: 'attached',
      ready: 'ready',
      moved: 'moved',
      detached: 'detached',
      relations: 'relations',
      externalClasses: 'externalClasses',
      options: 'options',
      lifetimes: 'lifetimes',
      pageLifetimes: 'pageLifetimes',
      definitionFilter: 'definitionFilter'
    });
  }

  {
    basicOptions.externalClasses = basicOptions.externalClasses || [];
    basicOptions.externalClasses.push('ext-class');
  }

  {
    basicOptions.options = basicOptions.options || {};

    basicOptions.options.multipleSlots = true;
    basicOptions.options.addGlobalClass = true;
  }

  {
    if (options.children) {
      const ret = convertChildrenNode(options.children, options.relationAction);
      basicOptions.relations = { ...options.relations, ...ret.relations };
      basicOptions.behaviors = basicOptions.behaviors || [];
      basicOptions.behaviors.push(ret.behavior);
    }
  }

  {
    if (options.parent) {
      const ret = convertParentNode(options.parent, options.relationAction);
      basicOptions.relations = { ...options.relations, ...ret.relations };
      basicOptions.behaviors = basicOptions.behaviors || [];
      basicOptions.behaviors.push(ret.behavior);
    }
  }
  Component(basicOptions);
};

export default BasicComponent;
