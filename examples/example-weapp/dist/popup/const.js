var EPosition;
(function(EPosition) {
    EPosition["TOP"] = 'top';
    EPosition["BOTTOM"] = 'bottom';
    EPosition["LEFT"] = 'left';
    EPosition["RIGHT"] = 'right';
    EPosition["CENTER"] = 'center';
})(EPosition || (EPosition = {}));
const ETransitionClass = {
    ['top']: 'slide-down',
    ['bottom']: 'slide-up',
    ['left']: 'slide-left',
    ['right']: 'slide-right',
    ['center']: 'fade'
};
export { EPosition, ETransitionClass };
