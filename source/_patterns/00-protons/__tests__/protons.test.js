/**
 * Tests for protons
 *
 * The tests below are only a very minimal start to verify that we can access a global. You
 * probably do not actually need a `blerp` value in your code. If you do, please let us know!
 */

import protons from '..';

test('GLOBAL_CONSTANT of `blerp` is available', () => {
  const { GLOBAL_CONSTANT } = protons;

  expect(GLOBAL_CONSTANT).toBe('blerp');
});
