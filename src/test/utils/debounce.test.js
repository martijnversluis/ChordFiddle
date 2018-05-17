import debounce from '../../utils/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('cancels an invocation when invoked again within the given interval', () => {
    expect.assertions(1);

    const heavyFunction = jest.fn();
    const debouncedFunction = debounce(heavyFunction, 10);

    setTimeout(debouncedFunction, 1);
    setTimeout(debouncedFunction, 4);
    setTimeout(debouncedFunction, 15);

    jest.runTimersToTime(25);

    expect(heavyFunction.mock.calls.length).toBe(2);
  });
});
