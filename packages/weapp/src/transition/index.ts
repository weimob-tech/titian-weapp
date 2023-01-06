import transition from '../behaviors/transition';
import BasicComponent from '../common/basic/BasicComponent';

type Data = {
  // 自定义类名
  classes: string;

  // 是否被初始化
  initialized: boolean;

  // 是否展示
  display: boolean;

  // 过渡事件
  duration: number;

  preventScroll: boolean;
};

BasicComponent<Data>({
  externalClasses: [
    'enter-class',
    'enter-active-class',
    'enter-done-class',
    'exit-class',
    'exit-active-class',
    'exit-done-class'
  ],
  behaviors: [transition()]
});
