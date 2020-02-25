import $ from 'jquery';
import dropdown, { name } from '..';
const dropHTML = `
  <div class="relative">
    <button type="button" class=" inline-block w-0 h-0 ml-1 align border-b-0 border-t-1 border-r-1 border-l-1" data-toggle="relative" aria-haspopup="true" aria-expanded="false" id="dropdownMenuButton">Dropdown button</button>
    <div class=" absolute pin-l z-50 float-left hidden list-reset	 py-2 mt-1 text-base bg-white border border-grey-light rounded " aria-labelledby="relativeMenuButton">
      <a class="block w-full py-1 px-6 font-normal text-grey-darkest whitespace-no-wrap border-0 " href="#">Action</a>
      <a class="block w-full py-1 px-6 font-normal text-grey-darkest whitespace-no-wrap border-0 " href="#">Another Action</a>
      <a class="block w-full py-1 px-6 font-normal text-grey-darkest whitespace-no-wrap border-0 " href="#">Something else here</a>
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
