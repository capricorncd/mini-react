import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import React from '../src/core/React';
import { render } from "../src/core/ReactDOM";

describe('render', () => {
  beforeEach(() => {
    const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');
    vi.stubGlobal('document', window.document);
  });

  it('Can render real DOM without attributes normally', () => {
    const el = React.createElement('p', null, 'hello');
    render(el, document.querySelector('#app'));

    expect(document.querySelector('#app').innerHTML)
      .toBe(`<p>hello</p>`);

  });

  it('Can render real DOM with attributes normally', () => {
    const el = React.createElement('section', { id: 'container' }, 'hello');
    render(el, document.querySelector('#app'));

    expect(document.querySelector('#app').innerHTML)
      .toBe(`<section id="container">hello</section>`);

    expect(document.querySelector('#app').childNodes[0])
      .toEqual(document.querySelector('#container'));

  });
});
