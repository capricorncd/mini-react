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
  let parent = fiber.parent;
  while (!parent.dom) {
    parent = parent.parent;
  }
  if (fiber.dom) parent.dom.append(fiber.dom);
  commitFiber(fiber.child);
  commitFiber(fiber.sibling);
}

function createDOM(type) {
  return type === ELEMENT_TYPES.TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(type);
}

function setProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key];
    }
  });
}

// 3.Linked lists and index pointers
function createLinkedListNodeRelationships(fiber, children) {
  let prevChild = null;
  children
    // fix: children cannot be rendered, `<Component>some children</Component>`
    .flat()
    .forEach((child, index) => {
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

function handleFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)];
  createLinkedListNodeRelationships(fiber, children);
}

function handleNormalComponent(fiber) {
  if (!fiber.dom) {
    // 1.create dom
    fiber.dom = createDOM(fiber.type);
    // 2.handle props
    setProps(fiber.dom, fiber.props);
  }
  // 3.Linked lists and index pointers
  const children = fiber.props.children;
  createLinkedListNodeRelationships(fiber, children);
}

function runTask(fiber) {
  if (!fiber.props) {
    fiber.props = { children: [] };
  }
  const isFunctionComponent = typeof fiber.type === 'function';
  if (isFunctionComponent) {
    handleFunctionComponent(fiber);
  } else {
    handleNormalComponent(fiber);
  }

  // 4.Return next task
  if (fiber.child) return fiber.child;
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

requestIdleCallback(taskScheduler);
