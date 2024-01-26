import ReactDOM from './core/ReactDOM';
import React from './core/React';

function App() {
  return (
    <div id="app">
      hello, mini react
      <TextComponent value={1000000} />
      <TextComponent value="xxxxx" />
      <Child count={100} />
      <Child count={500}>
        px xxxxxxxx
      </Child>
    </div>);
}

// eslint-disable-next-line react/prop-types
function TextComponent({ value }) {
  return <section>Text: {value ?? ''}</section>;
}

// TODO: {children}没被渲染
// eslint-disable-next-line react/prop-types
function Child({ count, children }) {
  return (
    <p>
      {count} {children}
      <TextComponent />
    </p>
  );
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);
