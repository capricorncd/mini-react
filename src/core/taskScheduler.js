import { ELEMENT_TYPES } from './React';

// requestIdleCallback
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
let nextTaskOfUnit = null;

let root = null;

export function render(el, container) {
  nextTaskOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  };
  root = nextTaskOfUnit;
}

function taskScheduler(idleDeadline) {
  let shouldYield = false;
  while (!shouldYield && nextTaskOfUnit) {
    // run task
    nextTaskOfUnit = runTask(nextTaskOfUnit);
    shouldYield = idleDeadline.timeRemaining() < 1;
  }
  // 所有节点task处理完成，并root存在
  if (!nextTaskOfUnit && root) {
    appendToContainer();
  }

  requestIdleCallback(taskScheduler);
}

// 浏览器闲置时执行。长时间的任务时，无闲置时间时的优化？
// 子节点渲染结束后，统一添加到父节点
function appendToContainer() {
  commitFiber(root.child);
  root = null;
}

function commitFiber(fiber) {
  if (!fiber) return;
  fiber.parent.dom.append(fiber.dom);
  commitFiber(fiber.child);
  commitFiber(fiber.sibling);
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

requestIdleCallback(taskScheduler);
