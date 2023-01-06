/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';

import type { LoadOptions } from 'miniprogram-simulate';
// eslint-disable-next-line import/no-extraneous-dependencies
import simulate from 'miniprogram-simulate';

const LOCAL_CACHE: Map<string, string> = new Map();

const convertPath = (componentName?: string) =>
  componentName
    ? path.join(process.cwd(), 'packages/weapp', 'src', componentName, 'index')
    : path.join(process.cwd(), 'packages/weapp', 'src');

export const getComponentId = (
  componentName:
    | string
    | (WechatMiniprogram.Component.Options<
        WechatMiniprogram.Component.DataOption,
        WechatMiniprogram.Component.PropertyOption,
        WechatMiniprogram.Component.MethodOption
      > &
        LoadOptions & {
          id?: string;
          tagName?: string;
          template?: string;
        }),
  loadProps?: LoadOptions
) => {
  let id;
  let componentPath;
  let cacheId;

  if (typeof componentName !== 'string') {
    componentPath = componentName;
  } else {
    componentPath = convertPath(componentName);

    cacheId = global.ID_CACHE.get(path.normalize(componentPath)) || LOCAL_CACHE.get(componentPath);
  }

  if (cacheId) {
    id = cacheId;
  } else {
    id = simulate.load(componentPath as any, {
      rootPath: convertPath(),
      ...loadProps
    });
    LOCAL_CACHE.set(componentPath as any, id);
  }
  return id;
};

export const getComponent = (
  componentName: string,
  props?: Partial<WechatMiniprogram.Component.PropertyOptionToData<WechatMiniprogram.Component.PropertyOption>>,
  loadProps?: object
) => {
  const id = getComponentId(componentName, loadProps);

  return simulate.render(id as string, props);
};
