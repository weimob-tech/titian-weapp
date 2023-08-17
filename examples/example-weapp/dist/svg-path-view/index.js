/* eslint-disable no-nested-ternary */ import BasicComponent from '../common/basic/BasicComponent';
import { hexToRGB } from '../common/utils/color';
import { isPlainObject } from '../common/utils/index';
BasicComponent({
    options: {
        virtualHost: true
    },
    properties: {
        name: {
            type: String
        },
        size: null,
        fills: {
            type: null,
            observer: 'observer'
        },
        spin: Boolean,
        rotate: String,
        paths: {
            type: null,
            observer: 'observer'
        },
        viewBox: {
            type: String,
            value: '0 0 1024 1024'
        },
        useMask: Boolean,
        extStyle: String
    },
    data: {
        svgPathFillColor: [],
        svgPath: []
    },
    methods: {
        observer () {
            const { fills , paths  } = this.data;
            let svgPathFillColor = Array.isArray(fills) ? fills : typeof fills === 'string' && fills ? [
                fills
            ] : [];
            svgPathFillColor = svgPathFillColor.map((col)=>{
                if (col.indexOf('#') === 0) {
                    return hexToRGB(col);
                }
                return col;
            });
            let svgPath = Array.isArray(paths) ? paths : paths ? [
                paths
            ] : [];
            svgPath = svgPath.filter((path)=>isPlainObject(path));
            svgPath = svgPath.map((path)=>{
                if (path.fill) {
                    if (path.fill.indexOf('#') === 0) {
                        return {
                            ...path,
                            fill: hexToRGB(path.fill)
                        };
                    }
                }
                return path;
            });
            this.setData({
                svgPathFillColor,
                svgPath
            });
        },
        onClick () {
            this.triggerEvent('click');
        }
    }
});
