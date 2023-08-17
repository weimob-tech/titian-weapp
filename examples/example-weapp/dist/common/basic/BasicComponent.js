/* eslint-disable @titian-design/check-life-items */ /* eslint-disable @typescript-eslint/ban-ts-comment */ import { convertChildrenNode, convertParentNode } from './relations';
// @ts-ignore
const convertOptions = (source, target, mapping = {})=>{
    Object.keys(mapping).forEach((k)=>{
        if (source[k]) {
            // @ts-ignore
            target[mapping[k]] = source[k];
        }
    });
};
const BasicComponent = function BasicComponent(options) {
    const basicOptions = {};
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
            basicOptions.relations = {
                ...options.relations,
                ...ret.relations
            };
            basicOptions.behaviors = basicOptions.behaviors || [];
            basicOptions.behaviors.push(ret.behavior);
        }
    }
    {
        if (options.parent) {
            const ret1 = convertParentNode(options.parent, options.relationAction);
            basicOptions.relations = {
                ...options.relations,
                ...ret1.relations
            };
            basicOptions.behaviors = basicOptions.behaviors || [];
            basicOptions.behaviors.push(ret1.behavior);
        }
    }
    Component(basicOptions);
};
export default BasicComponent;
