import $ from 'jquery';
import dropdown, { name } from '..';

const dropHTML = `
  <div class="dropdown">
    <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdownMenuButton">Dropdown button</button>
    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item " href="#">Action</a>
      <a class="dropdown-item " href="#">Another Action</a>
      <a class="dropdown-item " href="#">Something else here</a>
    </div>
  </div>
`;

test('dropdown component is registered', () => {
  expect(name).toBe('dropdown');
});

test('dropdown menu starts out hidden', () => {
  document.body.innerHTML = dropHTML;
  dropdown(document);

  // `show` class should NOT start out on dropdowns
  expect($('.dropdown, .dropdown-menu').hasClass('show')).not.toBe(true);
  // attributes are strings, not booleans
  expect($('.dropdown-toggle').attr('aria-expanded')).toBe('false');
});

test('dropdown menu shows after clicking button', () => {
  document.body.innerHTML = dropHTML;
  dropdown(document);

  $('#dropdownMenuButton').click();

  // `show` class should now be on dropdowns
  expect($('.dropdown, .dropdown-menu').hasClass('show')).toBe(true);
  // attributes are strings, not booleans
  expect($('.dropdown-toggle').attr('aria-expanded')).toBe('true');
});
