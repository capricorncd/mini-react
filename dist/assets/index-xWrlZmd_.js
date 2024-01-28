(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(o){if(o.ep)return;o.ep=!0;const c=t(o);fetch(o.href,c)}})();const p={UPDATE:"update",PLACEMENT:"placement"},x=["SVG","PATH"],H=["viewBox","d"];let a=null,s=null,A=null;const m=[];function D(e,n){s={dom:n,props:{children:[e]}},a=s}function M(e){var t;let n=!1;for(;!n&&a;)a=U(a),((t=s==null?void 0:s.sibling)==null?void 0:t.type)===(a==null?void 0:a.type)&&(a=void 0),n=e.timeRemaining()<1;!a&&s&&I(),requestIdleCallback(M)}function I(){m.forEach(O),g(s.child),V(),s=null,m.length=0}function g(e){var t;if(!e)return;let n=e.parent;for(;!n.dom;)n=n.parent;e.effectType===p.UPDATE?F(e.dom,e.props,(t=e.alternate)==null?void 0:t.props):e.effectType===p.PLACEMENT&&e.dom&&n.dom.append(e.dom),g(e.child),g(e.sibling)}function F(e,n,t={}){Object.keys(t).forEach(l=>{l!=="children"&&(l in n||e.removeAttribute(l))}),Object.keys(n).forEach(l=>{if(l!=="children"&&n[l]!==t[l])if(/^on[A-Z]\w*$/.test(l)){const o=l.slice(2).toLocaleLowerCase();e.removeEventListener(o,t[l]),e.addEventListener(o,n[l])}else e instanceof Element?x.includes(e.nodeName)&&H.includes(l)?e.setAttributeNS(null,l,n[l]):e.setAttribute(l,n[l]):e[l]=n[l]})}function B(e){return e===v.TEXT_ELEMENT?document.createTextNode(""):x.includes(e.toUpperCase())?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e)}function G(e,n){var o;let t=(o=e.alternate)==null?void 0:o.child,l=null;n.flat().forEach((c,i)=>{let u;for(t&&t.type===c.type?u={...c,child:null,parent:e,sibling:null,dom:t.dom,effectType:p.UPDATE,alternate:t}:(c&&(u={...c,child:null,parent:e,sibling:null,dom:null,effectType:p.PLACEMENT}),t&&m.push(t)),t&&(t=t.sibling),i===0?e.child=u:l.sibling=u,u&&(l=u);t;)m.push(t),t=t.sibling})}function P(e){h=[],T=0,C=[],A=e;const n=[e.type(e.props)];G(e,n)}function R(e){e.dom||(e.dom=B(e.type),F(e.dom,e.props));const n=e.props.children;G(e,n)}function U(e){if(e.props||(e.props={children:[]}),typeof e.type=="function"?P(e):R(e),e.child)return e.child;let t=e;for(;t;){if(t.sibling)return t.sibling;t=t.parent}}requestIdleCallback(M);function O(e){var n;if(e){if(e.dom){let t=e.parent;for(;!t.dom;)t=t.parent;t.dom.removeChild(e.dom)}else O(e.child);(n=e.effectHookList)==null||n.forEach(t=>{var l;return(l=t.cleanup)==null?void 0:l.call(t)})}}let h,T;function f(e){var c;const n=A,t=(c=n.alternate)==null?void 0:c.stateHookList[T],l={state:t?t.state:e,queue:t?t.queue:[]};l.queue.forEach(i=>{l.state=i}),l.queue.length=0,h.push(l),T++,n.stateHookList=h;function o(i){const u=typeof i=="function"?i(l.state):i;u!==l.state&&(l.queue.push(u),s={...n,alternate:n},a=s)}return[l.state,o]}let C;function L(e,n){C.push({callback:e,deps:n,cleanup:null}),A.effectHookList=C}function V(){function e(t){var l,o;t&&(t.alternate?(o=t.effectHookList)==null||o.forEach((c,i)=>{var d;if(!c.deps.length)return;const u=(d=t.alternate)==null?void 0:d.effectHookList[i];(u==null?void 0:u.deps.some((E,q)=>E!==c.deps[q]))&&(c.cleanup=c.callback())}):(l=t.effectHookList)==null||l.forEach(c=>{c.cleanup=c.callback()}),e(t.child),e(t.sibling))}function n(t){var l,o;t&&((o=(l=t.alternate)==null?void 0:l.effectHookList)==null||o.forEach(c=>{var i;c.deps.length&&((i=c.cleanup)==null||i.call(c))}),n(t.child),n(t.sibling))}n(s),e(s)}const v={TEXT_ELEMENT:"TEXT_ELEMENT"};function _(e){return{type:v.TEXT_ELEMENT,props:{nodeValue:e,children:[]}}}function X(e,n,...t){return{type:e,props:{...n,children:t.map(l=>typeof l=="string"||typeof l=="number"?_(l):l)}}}const r={createElement:X,createTextNode:_,ELEMENT_TYPES:v},Y={createRoot(e){return{render(n){D(n,e)}}}};function j(){return r.createElement("header",null,r.createElement("h2",null,"mini-react"),r.createElement("a",{href:"https://github.com/capricorncd/mini-react",target:"_blank",rel:"noreferrer"},r.createElement($,null)))}function $(){return r.createElement("svg",{width:"24",height:"24",viewBox:"0 0 16 16",version:"1.1","aria-hidden":"true"},r.createElement("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"}))}function z(){return r.createElement("div",{id:"app"},r.createElement(j,null),r.createElement("main",null,"hello, mini react",r.createElement(y,{value:1e6}),r.createElement(y,{value:"xxxxx"}),r.createElement(S,{count:100}),r.createElement(S,{count:500},"slot children"),r.createElement(J,null)))}function K(){return L(()=>(console.log("initial ToggleA"),()=>{console.log("cleanup ToggleA")}),[]),r.createElement("div",null,"ToggleA",r.createElement("div",null,"ToggleA Child1"),r.createElement("div",null,"ToggleA Child2"))}const Z=r.createElement("div",{style:"color:red"},"ToggleB",r.createElement("div",null,"ToggleB Child1")),w=r.createElement("div",{style:"color:green"},"Green Text");function J(){const[e,n]=f(0),[t,l]=f(!0),[o,c]=f(!0);console.log("Counter");function i(d){console.log(d),n(E=>E+1)}function u(){l(!t)}function N(){c(!o)}return L(()=>(console.log("useEffect initial"),()=>{console.log("cleanup initial")}),[]),L(()=>(console.log(`useEffect count: ${e}`),()=>{console.log("cleanup count")}),[e]),r.createElement("div",null,r.createElement("p",null,r.createElement("button",{onClick:i},"Count"),r.createElement("button",{onClick:u},"Toggle ComponentA"),r.createElement("button",{onClick:N},"Toggle GreenText")),"count: ",r.createElement("b",null,e),t?r.createElement(K,null):Z,o&&w,o?w:null)}function y({value:e}){return console.log("TextComponent"),r.createElement("p",null,"Text: ",e??"")}function S({count:e,children:n}){return console.log("Child"),r.createElement("section",null,e," ",n)}Y.createRoot(document.querySelector("#root")).render(r.createElement(z,null));
