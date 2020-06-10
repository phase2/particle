import $ from 'jquery';
import tabs, { name } from '..';

const markup = `
<div class="tabs ">
  <ul class="tabs__list" role="tablist" aria-label="Demo Tabs">
      <li class="tabs__list-item" role="presentation">
        <a class="tabs__list-link" id="tabs-tab--1239233704-0" href="#tabs-panel--1239233704-0" role="tab" aria-controls="tabs-panel--1239233704-0" aria-selected="true">
          Tab 1
        </a>
      </li>
      <li class="tabs__list-item inline-block" role="presentation">
        <a class="tabs__list-link" id="tabs-tab--1239233704-1" href="#tabs-panel--1239233704-1" role="tab" aria-controls="tabs-panel--1239233704-1" tabindex="-1">
          Tab 2
        </a>
      </li>
      <li class="tabs__list-item inline-block" role="presentation">
        <a class="tabs__list-link" id="tabs-tab--1239233704-2" href="#tabs-panel--1239233704-2" role="tab" aria-controls="tabs-panel--1239233704-2" tabindex="-1">
          Tab 3
        </a>
      </li>
      </ul>

  <div class="tabs__panels">
      <section class="tabs__panels-item" id="tabs-panel--1239233704-0" role="tabpanel" aria-labelledby="tabs-tab--1239233704-0" tabindex="-1">
           <h3>Tab 1</h3>
            Panel 1 content
      </section>
      <section class="tabs__panels-item" id="tabs-panel--1239233704-1" role="tabpanel" aria-labelledby="tabs-tab--1239233704-1" tabindex="-1">
           <h3>Tab 2</h3>
            Panel 2 content
      </section>
      <section class="tabs__panels-item" id="tabs-panel--1239233704-2" role="tabpanel" aria-labelledby="tabs-tab--1239233704-2" tabindex="-1">
           <h3>Tab 3</h3>
           Panel 3 content
      </section>
  </div>

</div>
`;
test('tabs component is registered', () => {
  expect(name).toBe('tabs');
});

test('First panel components to not have hidden attribute', () => {
  document.body.innerHTML = markup;
  tabs($(document));
  expect($('#tabs-panel--1239233704-0').prop('hidden')).toBe(false);
});
test('panel components have hidden attribute', () => {
  document.body.innerHTML = markup;
  tabs($(document));
  expect($('#tabs-panel--1239233704-2').prop('hidden')).toBe(true);
});
test('First tab has aria-selected', () => {
  document.body.innerHTML = markup;
  tabs($(document));
  expect($('#tabs-tab--1239233704-0').attr('aria-selected')).toBe('true');
});
test('Activate 3rd tab', () => {
  document.body.innerHTML = markup;
  tabs($(document));
  $('#tabs-tab--1239233704-2').trigger('click');
  expect($('#tabs-panel--1239233704-2').prop('hidden')).toBe(false);
});
