declare enum EPosition {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center"
}
declare const ETransitionClass: {
    [key in EPosition]: string;
};
export { EPosition, ETransitionClass };
