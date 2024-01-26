import { ELEMENT_TYPES } from './React';

// requestIdleCallback
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
let nextTaskOfUnit = null;

export function render(el, container) {
  nextTaskOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  };
}

function taskScheduler(idleDeadline) {
  let shouldYield = false;
  while (!shouldYield && nextTaskOfUnit) {
    // run task
    nextTaskOfUnit = runTask(nextTaskOfUnit);
    // dom render
    shouldYield = idleDeadline.timeRemaining() < 1;
  }
  requestIdleCallback(taskScheduler);
}

function createDOM(type) {
  return type === ELEMENT_TYPES.TEXT_ELEMENT ?
    document.createTextNode('') :
    document.createElement(type);
}

function setProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key];
    }
  });
}

function createLinkedListNodeRelationships(fiber) {
  let prevChild = null;
  fiber.props.children.forEach((child, index) => {
    const newFiber = {
      ...child,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

function runTask(fiber) {
  if (!fiber.dom) {
    // 1.create dom
    const dom = fiber.dom = createDOM(fiber.type);
    fiber.parent.dom.append(dom);
    // 2.handle props
    setProps(dom, fiber.props);
  }

  // 3.Linked lists and index pointers
  createLinkedListNodeRelationships(fiber);

  // 4.Return next task
  if (fiber.child) return fiber.child;
  if (fiber.sibling) return fiber.sibling;
  return fiber.parent?.sibling;
}

// TODO: 浏览器闲置时执行。长时间的任务时，无闲置时间时的优化？
requestIdleCallback(taskScheduler);
