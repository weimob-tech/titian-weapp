import transition from '../behaviors/transition';
import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    externalClasses: [
        'enter-class',
        'enter-active-class',
        'enter-done-class',
        'exit-class',
        'exit-active-class',
        'exit-done-class'
    ],
    behaviors: [
        transition()
    ]
});
