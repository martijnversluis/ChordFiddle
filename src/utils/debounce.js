export default function debounce(func, interval = 100) {
  return function debouncedFunction(...args) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    const boundFunction = func.bind(null, args);
    this.debounceTimer = setTimeout(boundFunction, interval);
  };
}
