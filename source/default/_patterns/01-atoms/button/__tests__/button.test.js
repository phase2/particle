import $ from 'jquery';
import { name } from '..';

test('button component is registered', () => {
  expect(name).toBe('button');
});
test('simple .text() is verified', () => {
  document.body.innerHTML = `
    <div>
      <button id="button">Click me!</button>
    </div>
  `;
  expect($('#button').text()).toBe('Click me!');
});
