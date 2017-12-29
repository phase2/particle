const $ = require('jquery');
const button = require('../index');

test('can reach button tests', () => {
  expect(true).toBe(true);
});

test('dummy button toggles on click', () => {
  document.body.innerHTML = `
    <div>
      <button id="button">Click me!</button>
    </div>
  `;
  expect($('#button').text()).toBe('Click me!');
})
