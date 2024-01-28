import React, { useState, useEffect } from './core/React';
import Header from './Header';

export default function App() {
  return (
    <div id="app">
      <Header />
      <main>
        hello, mini react
        <Counter />
        <TextComponent value={1000000} />
        <TextComponent value="xxxxx" />
        <Child count={100} />
        <Child count={500}>
          px xxxxxxxx
        </Child>
      </main>
    </div>);
}

function ToggleA() {
  useEffect(() => {
    console.log('initial ToggleA');
    return () => {
      console.log('cleanup ToggleA');
    };
  }, []);

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

  useEffect(() => {
    console.log(`useEffect initial`);
    return () => {
      console.log('cleanup initial');
    };
  }, []);

  useEffect(() => {
    console.log(`useEffect count: ${count}`);
    return () => {
      console.log('cleanup count');
    };
  }, [count]);

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
