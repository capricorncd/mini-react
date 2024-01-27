import ReactDOM from './core/ReactDOM';
import React from './core/React';
import { update } from './core/taskScheduler';

function App() {
  return (
    <div id="app">
      hello, mini react
      <Counter />
      <TextComponent value={1000000} />
      <TextComponent value="xxxxx" />
      <Child count={100} />
      <Child count={500}>
        px xxxxxxxx
      </Child>
    </div>);
}

// function ToggleA() {
//   return (
//     <div style="color:green">
//       Toggle A
//       <strong style="margin-left:0.5em;">Strong Child</strong>
//     </div>
//   );
// }
const ToggleA = (<div>
  ToggleA
  <div>ToggleA Child1</div>
  <div>ToggleA Child2</div>
</div>);
const ToggleB = <div style="color:red">Toggle B</div>;

let count = 0;
let props = { id: 'testId' };
let isToggleA = true;
function Counter() {
  function handleClick(e) {
    console.log(e);
    count++;
    props = { id: Math.random() };
    isToggleA = !isToggleA;
    update();
  }
  return (
    <div>
      count: <b {...props}>{count}</b>
      <button onClick={handleClick}>Click</button>
      {isToggleA ? ToggleA : ToggleB}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function TextComponent({ value }) {
  return <p>Text: {value ?? ''}</p>;
}

// eslint-disable-next-line react/prop-types
function Child({ count, children }) {
  return (
    <section>
      {count} {children}
      <TextComponent value={count} />
    </section>
  );
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);
