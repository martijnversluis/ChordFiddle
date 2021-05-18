export default function debounce(func, interval = 100) {
  let debounceTimer = null;

  return function debouncedFunction(...args) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const boundFunction = func.bind(null, ...args);
    debounceTimer = setTimeout(boundFunction, interval);
  };
}
