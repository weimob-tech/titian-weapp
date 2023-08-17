export interface TimeDataType {
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
}
export declare function formatDuration(ms: number): TimeDataType;
export declare function formatDate(timeData: TimeDataType, formatStr: string, tag?: string): string | {
    day?: string | undefined;
    hour?: string | undefined;
    minute?: string | undefined;
    second?: string | undefined;
    millisecond?: string | undefined;
};
export declare function isDifferentTime(time1: number, time2: number, formatStr: string): boolean;
