import CalendarCalc from './calc';
import { DateStatusEnum } from './const';
import { mergeContinuousDate } from './utils';
let MultipleCalendarCalc = class MultipleCalendarCalc extends CalendarCalc {
    filterInvalidCalDate(calDateList) {
        return this.prune(this.filterBorder(calDateList));
    }
    calcCalDate(calDate) {
        return this.prune(this.filterInvalidDate(calDate));
    }
    *select({ calDateList , actionCalDate  }) {
        let nextData = [];
        if (calDateList.some((item)=>item.fullDateNum === actionCalDate.fullDateNum)) {
            nextData = calDateList.filter((item)=>item.fullDateNum !== actionCalDate.fullDateNum);
        } else {
            if (calDateList.length >= this.maxSize && this.maxSize > 0) {
                yield {
                    type: 'maxSize',
                    message: '超出最大选择数量'
                };
                return calDateList;
            }
            nextData = [
                ...calDateList,
                {
                    ...actionCalDate,
                    status: DateStatusEnum.MULTIPLE
                }
            ];
        }
        nextData = nextData.sort((before, after)=>before.fullDateNum - after.fullDateNum);
        return mergeContinuousDate(nextData);
    }
    calcUpdateData({ nextData , actionCalDate  }) {
        const updateDate = {};
        if (!nextData.some((item)=>item.fullDateNum === actionCalDate.fullDateNum)) {
            const key = `monthList[${actionCalDate.parentIndex}].dateList[${actionCalDate.day - 1}]`;
            if (typeof this.formatter === 'function') {
                updateDate[key] = this.formatter({
                    ...actionCalDate,
                    status: DateStatusEnum.NOT_STATUS
                });
            } else {
                updateDate[key] = {
                    ...actionCalDate,
                    status: DateStatusEnum.NOT_STATUS
                };
            }
        }
        return nextData.reduce((next, target)=>{
            const key = `monthList[${target.parentIndex}].dateList[${target.day - 1}]`;
            if (typeof this.formatter === 'function') {
                return {
                    ...next,
                    [key]: this.formatter({
                        ...target
                    })
                };
            }
            return {
                ...next,
                [key]: {
                    ...target
                }
            };
        }, updateDate);
    }
    prune(calDateList) {
        const cal = calDateList;
        if (this.maxSize > 0 && calDateList.length > this.maxSize) {
            cal.length = this.maxSize;
        }
        return mergeContinuousDate(cal.sort((before, after)=>before.fullDateNum - after.fullDateNum).map((item)=>({
                ...item,
                status: DateStatusEnum.MULTIPLE
            })));
    }
    constructor(props, maxSize){
        super(props);
        this.maxSize = maxSize;
    }
};
export { MultipleCalendarCalc as default };
