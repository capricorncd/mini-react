import ReactDOM from './core/ReactDOM';
import React from './core/React';

const App = React.createElement('div', { id: 'app' }, 'hello, ', 'mini react');
console.log(App);

// vite会直接调用React.createElement方法，将return部分转换为:
// return /* @__PURE__ */ React.createElement("div", { id: "app" }, "hello, mini react");
function AppJSX() {
  return (
    <div id="app">hello, mini react</div>
  );
}

console.log(AppJSX);

ReactDOM.createRoot(document.querySelector('#root')).render(App);
