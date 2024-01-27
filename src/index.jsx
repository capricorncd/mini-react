import ReactDOM from './core/ReactDOM';
import React from './core/React';

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

function Counter() {
  function handleClick(e) {
    console.log(e);
  }
  return (
    <div>
      <button onClick={handleClick}>Click</button>
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
