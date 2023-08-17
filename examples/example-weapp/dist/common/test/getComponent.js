/* eslint-disable @typescript-eslint/no-explicit-any */ import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import simulate from 'miniprogram-simulate';
const LOCAL_CACHE = new Map();
const convertPath = (componentName)=>componentName ? path.join(process.cwd(), 'packages/weapp', 'src', componentName, 'index') : path.join(process.cwd(), 'packages/weapp', 'src');
export const getComponentId = (componentName, loadProps)=>{
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
        id = simulate.load(componentPath, {
            rootPath: convertPath(),
            ...loadProps
        });
        LOCAL_CACHE.set(componentPath, id);
    }
    return id;
};
export const getComponent = (componentName, props, loadProps)=>{
    const id = getComponentId(componentName, loadProps);
    return simulate.render(id, props);
};
