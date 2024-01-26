export const ELEMENT_TYPES = {
  TEXT_ELEMENT: 'TEXT_ELEMENT',
};

export function createTextNode(text) {
  return {
    type: ELEMENT_TYPES.TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    },
  };
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child) : child;
      })
    },
  };
}

const React = {
  createElement,
  createTextNode,
  ELEMENT_TYPES,
};

export default React;
