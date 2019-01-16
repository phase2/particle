import $ from 'jquery';
import Button from '..';

console.log(Button);

test('button component is registered', () => {
  expect(Button.name).toBe('button');
});

test('simple .text() is verified', () => {
  document.body.innerHTML = `
    <div>
      <button id="button">Click me!</button>
    </div>
  `;
  expect($('#button').text()).toBe('Click me!');
});

test('non-#blah button is not active', () => {
  document.body.innerHTML = `
    <div>
      <button id="button">Click me!</button>
    </div>
  `;

  Button.enable($(document));
  expect($('#button').hasClass('active')).toBe(false);
});

test('#blah button is immediately active', () => {
  document.body.innerHTML = `
    <div>
      <button id="blah">Click me!</button>
    </div>
  `;

  Button.enable($(document));
  expect($('#blah').hasClass('active')).toBe(true);
});
