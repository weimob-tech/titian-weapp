import { getDate } from '../common/utils/index';
import { getCalDate } from './utils';
let CalendarCalc = class CalendarCalc {
    filterInvalidDate(value) {
        const calDateProps = Array.isArray(value) ? value : [
            value
        ];
        return this.filterBorder(calDateProps.map((item)=>new Date(item)).filter((item)=>item.toString() !== 'Invalid Date').map((item)=>getCalDate(item)));
    }
    // TODO: 边界 过滤 结果 可能有问题,后期或可修改成 结果 修改 边界
    filterBorder(value) {
        return value.filter((item)=>(this.minDate.fullDateNum === item.fullDateNum || item.fullDateNum > this.minDate.fullDateNum) && (this.maxDate.fullDateNum === item.fullDateNum || item.fullDateNum < this.maxDate.fullDateNum));
    }
    constructor({ minDate , maxDate , formatter  }){
        const min = getCalDate(getDate(minDate));
        const max = getCalDate(getDate(maxDate));
        if (min.fullDateNum > max.fullDateNum) {
            this.minDate = max;
            this.maxDate = min;
        } else {
            this.minDate = min;
            this.maxDate = max;
        }
        this.formatter = formatter;
    }
};
export { CalendarCalc as default };
