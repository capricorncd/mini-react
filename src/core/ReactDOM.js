import { ELEMENT_TYPES } from './React';

export function render(tree, container) {
  const el = tree.type === ELEMENT_TYPES.TEXT_ELEMENT ?
    document.createTextNode('') :
    document.createElement(tree.type);

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
        render(app, container);
      }
    };
  }
};
