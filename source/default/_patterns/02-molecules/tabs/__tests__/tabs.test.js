import $ from 'jquery';
import tabs, { name, selectedIndexState, updateSelectedState } from '..';

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
const firstSelected = [
  {
    id: 'tab-1',
    panelId: 'panel-1',
    selected: true,
  },
  {
    id: 'tab-2',
    panelId: 'panel-2',
    selected: false,
  },
  {
    id: 'tab-3',
    panelId: 'panel-3',
    selected: false,
  },
];
const secondSelected = [
  {
    id: 'tab-1',
    panelId: 'panel-1',
    selected: false,
  },
  {
    id: 'tab-2',
    panelId: 'panel-2',
    selected: true,
  },
  {
    id: 'tab-3',
    panelId: 'panel-3',
    selected: false,
  },
];
const thirdSelected = [
  {
    id: 'tab-1',
    panelId: 'panel-1',
    selected: false,
  },
  {
    id: 'tab-2',
    panelId: 'panel-2',
    selected: false,
  },
  {
    id: 'tab-3',
    panelId: 'panel-3',
    selected: true,
  },
];
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
  expect($('#tabs-panel--1239233704-1').prop('hidden')).toBe(true);
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
test('should return index of selected tab from tabs array', () => {
  expect(selectedIndexState(firstSelected)).toBe(0);
  expect(selectedIndexState(secondSelected)).toBe(1);
  expect(selectedIndexState(thirdSelected)).toBe(2);
});
test('should return object with updated selected tab', () => {
  const nowSecondSelected = updateSelectedState(1, firstSelected);
  const nowThirdSelected = updateSelectedState(2, firstSelected);
  const expectThirdObjectSelected = {
    id: 'tab-3',
    panelId: 'panel-3',
    selected: true,
  };
  expect(selectedIndexState(firstSelected)).toBe(0);
  expect(selectedIndexState(nowSecondSelected)).toBe(1);
  expect(selectedIndexState(nowThirdSelected)).toBe(2);
  // Test if object matches expected output.
  expect(nowThirdSelected[2]).toMatchObject(expectThirdObjectSelected);
  // Another way to test object structure without exact values.
  expect(nowThirdSelected[2]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      panelId: expect.any(String),
      selected: true,
    })
  );
});
