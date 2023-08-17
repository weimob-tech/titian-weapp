/* eslint-disable class-methods-use-this */ import CalendarCalc from './calc';
import { DateStatusEnum } from './const';
let SingleCalendarCalc = class SingleCalendarCalc extends CalendarCalc {
    filterInvalidCalDate(calDateList) {
        const [calDate] = this.filterBorder(calDateList);
        if (!calDate) {
            return [];
        }
        if (calDate.status !== DateStatusEnum.SINGLE) {
            calDate.status = DateStatusEnum.SINGLE;
        }
        return [
            calDate
        ];
    }
    calcCalDate(calDate) {
        return this.filterInvalidDate(calDate).map((item)=>({
                ...item,
                status: DateStatusEnum.SINGLE
            }));
    }
    // eslint-disable-next-line require-yield
    *select({ actionCalDate  }) {
        return [
            {
                ...actionCalDate,
                status: DateStatusEnum.SINGLE
            }
        ];
    }
    calcUpdateData({ nextData , prevData  }) {
        if (prevData[0] && nextData[0].fullDateNum === prevData[0].fullDateNum) {
            return null;
        }
        const curData = {};
        const selectKey = `monthList[${nextData[0].parentIndex}].dateList[${nextData[0].day - 1}]`;
        if (typeof this.formatter === 'function') {
            curData[selectKey] = this.formatter({
                ...nextData[0],
                status: DateStatusEnum.SINGLE
            });
        } else {
            curData[selectKey] = {
                ...nextData[0],
                status: DateStatusEnum.SINGLE
            };
        }
        if (prevData.length !== 0) {
            const key = `monthList[${prevData[0].parentIndex}].dateList[${prevData[0].day - 1}]`;
            if (typeof this.formatter === 'function') {
                curData[key] = this.formatter({
                    ...prevData[0],
                    status: DateStatusEnum.NOT_STATUS
                });
            } else {
                curData[key] = {
                    ...prevData[0],
                    status: DateStatusEnum.NOT_STATUS
                };
            }
        }
        return curData;
    }
};
export { SingleCalendarCalc as default };
