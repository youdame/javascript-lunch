import createDOMElement from '../util/createDomElement.js';

function Root({ label, input, caption }) {
  return createDOMElement({
    tag: 'div',
    className: 'form-item form-item--required',
    children: [label, input, caption].filter(Boolean)
  });
}

function Label({ text, className, ...attribute }) {
  return createDOMElement({
    tag: 'label',
    textContent: text,
    className: `${className} text-caption`,
    ...attribute
  });
}

function Select({ options, ...attribute }) {
  return createDOMElement({
    tag: 'select',
    children: options.map(({ value, option }) =>
      createDOMElement({
        tag: 'option',
        value: value,
        textContent: option
      })
    ),
    ...attribute
  });
}

function Input({ ...attribute }) {
  return createDOMElement({
    tag: 'input',
    ...attribute
  });
}

function TextArea({ ...attribute }) {
  return createDOMElement({
    tag: 'textarea',
    ...attribute
  });
}

function Caption({ text }) {
  return createDOMElement({
    tag: 'span',
    className: 'help-text text-caption',
    textContent: text
  });
}

export const InputBox = { Root, Label, Select, Input, TextArea, Caption };
