import ReactDOM from './core/ReactDOM';
import React from './core/React';

const App = <div id="app">hello, mini react</div>;

console.log(App);

// function component
ReactDOM.createRoot(document.querySelector('#root')).render(App);
