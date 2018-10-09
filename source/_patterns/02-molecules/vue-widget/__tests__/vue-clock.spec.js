import { render } from 'vue-testing-library';
import vueClock from 'molecules/vue-widget/src/vue-clock/vue-clock.vue';

describe('vue-clock.vue', () => {
  it('sets rotate property for the seconds hand', () => {
    const { getByTestId } = render(vueClock);
    const secondsHand = getByTestId('seconds-hand');
    expect(secondsHand.style.transform).toContain('rotate');
  });

  it('sets rotate property for the minutes hand', () => {
    const { getByTestId } = render(vueClock);
    const minutesHand = getByTestId('minutes-hand');
    expect(minutesHand.style.transform).toContain('rotate');
  });

  it('sets rotate property for the hours hand', () => {
    const { getByTestId } = render(vueClock);
    const hoursHand = getByTestId('hours-hand');
    expect(hoursHand.style.transform).toContain('rotate');
  });

  it('updates the seconds hand', done => {
    const { getByTestId } = render(vueClock);
    const secondsHand = getByTestId('seconds-hand');
    const before = secondsHand.style.transform;
    setTimeout(() => {
      const after = secondsHand.style.transform;
      expect(before).not.toEqual(after);
      done();
    }, 1000);
  });
});
