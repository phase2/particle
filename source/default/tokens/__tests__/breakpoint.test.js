import { mediaBreakpoint, breakpoints } from '../js/utils/breakpoints';

test('breakpoints is empty object without DOM', () => {
  expect(breakpoints).toEqual({});
});

test('media query down is proper media query format', () => {
  expect(mediaBreakpoint.down('992px')).toBe('screen and (max-width: 992px)');
});

test('media query up is proper media query format', () => {
  expect(mediaBreakpoint.up('992px')).toBe('screen and (min-width: 992px)');
});
