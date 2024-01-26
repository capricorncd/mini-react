import { ELEMENT_TYPES } from './React';
import { render as taskSchedulerRender } from './taskScheduler';

// TODO: 递归实现，tree足够大时渲染耗时长，页面会出现卡顿=》任务调度器（task scheduler）
export function render(tree, container) {
  const el = tree.type === ELEMENT_TYPES.TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(tree.type);

  Object.keys(tree.props).forEach(key => {
    if (key !== 'children') {
      el[key] = tree.props[key];
    }
  });
  tree.props.children.forEach(child => {
    render(child, el);
  });
  container.appendChild(el);
}

export default {
  createRoot(container) {
    return {
      render(app) {
        taskSchedulerRender(app, container);
      }
    };
  }
};
