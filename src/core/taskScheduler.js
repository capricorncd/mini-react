import { ELEMENT_TYPES } from './React';

const EFFECT_TYPES = {
  UPDATE: 'update',
  PLACEMENT: 'placement',
};

// requestIdleCallback
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
let nextTaskOfUnit = null;

let workingRoot = null;
let workingFiber = null;

const deletionList = [];

export function render(el, container) {
  workingRoot = {
    dom: container,
    props: {
      children: [el]
    },
  };
  nextTaskOfUnit = workingRoot;
}

export function update() {
  let currentFiber = workingFiber;
  return () => {
    workingRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextTaskOfUnit = workingRoot;
  };
}

function taskScheduler(idleDeadline) {
  let shouldYield = false;
  while (!shouldYield && nextTaskOfUnit) {
    // run task
    nextTaskOfUnit = runTask(nextTaskOfUnit);
    // 减少不必要的计算，当前节点的兄弟为nextTaskOfUnit时即终止渲染
    if (workingRoot?.sibling?.type === nextTaskOfUnit?.type) {
      nextTaskOfUnit = void 0;
    }

    shouldYield = idleDeadline.timeRemaining() < 1;
  }
  // 所有节点task处理完成，并workingRoot存在
  if (!nextTaskOfUnit && workingRoot) {
    commitRoot();
  }

  requestIdleCallback(taskScheduler);
}

// 浏览器闲置时执行。长时间的任务时，无闲置时间时的优化？
// 子节点渲染结束后，统一添加到父节点
function commitRoot() {
  deletionList.forEach(commitDeletion);
  commitFiber(workingRoot.child);
  workingRoot = null;
  deletionList.length = 0;
}

function commitFiber(fiber) {
  if (!fiber) return;
  let parent = fiber.parent;
  while (!parent.dom) {
    parent = parent.parent;
  }

  if (fiber.effectType === EFFECT_TYPES.UPDATE) {
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  } else if (fiber.effectType === EFFECT_TYPES.PLACEMENT) {
    if (fiber.dom) parent.dom.append(fiber.dom);
  }

  commitFiber(fiber.child);
  commitFiber(fiber.sibling);
}

function updateProps(dom, nextProps, prevProps = {}) {
  // 1. old 有, new 没有: remove
  Object.keys(prevProps).forEach((key) => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  });
  // 2. new 有, old 没有: add
  // 3. new 有, old 有: edit
  Object.keys(nextProps).forEach((key) => {
    if (key !== 'children' && nextProps[key] !== prevProps[key]) {
      // Event: onClick
      if (/^on[A-Z]\w*$/.test(key)) {
        const eventType = key.slice(2).toLocaleLowerCase();
        dom.removeEventListener(eventType, prevProps[key]);
        dom.addEventListener(eventType, nextProps[key]);
      } else {
        dom[key] = nextProps[key];
      }
    }
  });
}

function createDOM(type) {
  return type === ELEMENT_TYPES.TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(type);
}

// 3.Linked lists and index pointers
function reconcileChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;
  children
    // fix: children cannot be rendered, `<Component>some children</Component>`
    .flat()
    .forEach((child, index) => {
      let newFiber;
      if (oldFiber && oldFiber.type === child.type) {
        // update
        newFiber = {
          ...child,
          child: null,
          parent: fiber,
          sibling: null,
          dom: oldFiber.dom,
          effectType: EFFECT_TYPES.UPDATE,
          alternate: oldFiber,
        };
      } else {
        // fix: <undefined></undefined>
        if (child) {
          newFiber = {
            ...child,
            child: null,
            parent: fiber,
            sibling: null,
            dom: null,
            effectType: EFFECT_TYPES.PLACEMENT,
          };
        }

        if (oldFiber) deletionList.push(oldFiber);
      }

      if (oldFiber) oldFiber = oldFiber.sibling;

      if (index === 0) {
        fiber.child = newFiber;
      } else {
        prevChild.sibling = newFiber;
      }
      // newFiber may be false, such as `{booleanVar && <Component />}`
      if (newFiber) prevChild = newFiber;

      // 删除多余的old node
      while (oldFiber) {
        deletionList.push(oldFiber);
        oldFiber = oldFiber.sibling;
      }
    });
}

function handleFunctionComponent(fiber) {
  stateHookList = [];
  stateHookIndex = 0;

  workingFiber = fiber;
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function handleNormalComponent(fiber) {
  if (!fiber.dom) {
    // 1.create dom
    fiber.dom = createDOM(fiber.type);
    // 2.handle props
    updateProps(fiber.dom, fiber.props);
  }
  // 3.Linked lists and index pointers
  const children = fiber.props.children;
  reconcileChildren(fiber, children);
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

function commitDeletion(fiber) {
  if (!fiber) return;
  if (fiber.dom) {
    let parent = fiber.parent;
    while (!parent.dom) {
      parent = parent.parent;
    }
    parent.dom.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child);
  }
}

let stateHookList;
let stateHookIndex;

export function useState(initialState) {
  const currentFiber = workingFiber;
  const oldHook = currentFiber.alternate?.stateHookList[stateHookIndex];

  const stateHook = {
    state: oldHook ? oldHook.state : initialState,
    queue: oldHook ? oldHook.queue : [],
  };

  stateHook.queue.forEach(newState => {
    stateHook.state = newState;
  });

  stateHook.queue.length = 0;

  stateHookList.push(stateHook);
  stateHookIndex++;

  currentFiber.stateHookList = stateHookList;

  function setState(action) {
    const newState = typeof action === 'function' ? action(stateHook.state) : action;
    if (newState === stateHook.state) return;
    // stateHook.state = typeof action === 'function' ? action(stateHook.state) : action;
    stateHook.queue.push(newState);
    // ↑统一action类型:
    // typeof action === 'function' ? action : () => action;

    workingRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextTaskOfUnit = workingRoot;
  }
  return [stateHook.state, setState];
}
