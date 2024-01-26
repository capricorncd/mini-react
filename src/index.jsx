/**@jsx CustomReact.createElementOrOtherName */
// ↑告诉vite使用`CustomReact.createElementOrOtherName`来代替默认的`React.createElement`解析jsx文件/语法
import ReactDOM from './core/ReactDOM';
import React from './core/React';

const App = <div id="app">hello, mini react</div>;

console.log(App);

// function component
ReactDOM.createRoot(document.querySelector('#root')).render(App);
