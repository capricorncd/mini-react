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
const GreenText = <div style="color:green">Green Text</div>;

let count = 0;
let props = { id: 'testId' };
let isToggleA = true;
let showGreenText = true;
function Counter() {
  const updateComponent = update();
  console.log('Counter');
  function handleClick(e) {
    console.log(e);
    count++;
    props = { id: Math.random() };
    isToggleA = !isToggleA;
    showGreenText = !showGreenText;
    updateComponent();
  }
  return (
    <div>
      count: <b {...props}>{count}</b>
      <button onClick={handleClick}>Click</button>
      {showGreenText && GreenText}
      {isToggleA ? ToggleA : ToggleB}
      {showGreenText ? GreenText : null}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function TextComponent({ value }) {
  console.log('TextComponent');
  return <p>Text: {value ?? ''}</p>;
}

// eslint-disable-next-line react/prop-types
function Child({ count, children }) {
  console.log('Child');
  return (
    <section>
      {count} {children}
      {/* <TextComponent value={count} /> */}
    </section>
  );
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);
