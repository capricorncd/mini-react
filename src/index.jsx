import ReactDOM from './core/ReactDOM';
import React, { useState } from './core/React';

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

function ToggleA() {
  return (
    <div>
      ToggleA
      <div>ToggleA Child1</div>
      <div>ToggleA Child2</div>
    </div>
  );
}

const ToggleB = <div style="color:red">Toggle B</div>;
const GreenText = <div style="color:green">Green Text</div>;

function Counter() {
  const [count, setCount] = useState(0);
  const [isToggleA, setIsToggleA] = useState(true);
  const [showGreenText, setShowGreenText] = useState(true);
  console.log('Counter');
  function handleClick(e) {
    console.log(e);
    setCount((v) => v + 1);
    setIsToggleA(!isToggleA);
    setShowGreenText(!showGreenText);
  }
  return (
    <div>
      count: <b>{count}</b>
      <button onClick={handleClick}>Click</button>
      {showGreenText && GreenText}
      {isToggleA ? <ToggleA /> : ToggleB}
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
