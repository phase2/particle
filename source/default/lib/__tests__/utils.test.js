import { randRGB } from 'lib/utils';

test('0 >= randRGB <= 255', () => {
  const rand = randRGB();
  expect(rand).toBeGreaterThanOrEqual(0);
  expect(rand).toBeLessThanOrEqual(255);
});
