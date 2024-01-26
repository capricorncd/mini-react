import { describe, it, expect } from 'vitest';
import React from "../src/core/React";

describe('React.createElement', () => {
  it('Should be return vDom of the element', () => {
    const el1 = React.createElement('div', null, 'hello');

    expect(el1).toEqual({
      type: 'div',
      props: {
        children: [{
          type: React.ELEMENT_TYPES.TEXT_ELEMENT,
          props: {
            nodeValue: 'hello',
            children: [],
          }
        }]
      }
    });

    // or toMatchInlineSnapshot
    expect(el1).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `);

    const el2 = React.createElement('div', { id: 'app' }, 'hello', ' world');
    expect(el2).toEqual({
      type: 'div',
      props: {
        id: 'app',
        children: [
          {
            type: React.ELEMENT_TYPES.TEXT_ELEMENT,
            props: {
              nodeValue: 'hello',
              children: [],
            },
          },
          {
            type: React.ELEMENT_TYPES.TEXT_ELEMENT,
            props: {
              nodeValue: ' world',
              children: [],
            },
          },
        ]
      }
    });
  });
});
