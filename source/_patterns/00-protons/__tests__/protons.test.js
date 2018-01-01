import protons from '../';

test('GLOBAL_CONSTANT of `blerp` is available', () => {
  const { GLOBAL_CONSTANT } = protons;

  expect(GLOBAL_CONSTANT).toBe('blerp');
});
