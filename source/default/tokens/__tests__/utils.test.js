import { randRGB, sass2Array, cssVars2Obj } from '../js/utils';

test('0 >= randRGB <= 255', () => {
  const rand = randRGB();
  expect(rand).toBeGreaterThanOrEqual(0);
  expect(rand).toBeLessThanOrEqual(255);
});

test('sass2Array properly cleans string for array', () => {
  const trimString = sass2Array(' flerp, derp, merp ');
  expect(trimString).toEqual(['flerp', 'derp', 'merp']);
});

test('single root css props are read successfully', () => {
  // Note: jest (jsdom) does not support reading css vars, so we'll test with
  // standard css props for now (it's the same set/get object)
  document.querySelector(':root').style.setProperty('background', 'blue');

  const cssReader = cssVars2Obj();
  expect(cssReader(['background'])).toEqual({
    background: 'blue',
  });
});

test('multiple root css props are read successfully', () => {
  // Note: jest (jsdom) does not support reading css vars, so we'll test with
  // standard css props for now (it's the same set/get object)
  document.querySelector(':root').style.setProperty('background', 'blue');
  document.querySelector(':root').style.setProperty('color', 'red');

  const cssReader = cssVars2Obj();
  expect(cssReader(['background', 'color'])).toEqual({
    background: 'blue',
    color: 'red',
  });
});
