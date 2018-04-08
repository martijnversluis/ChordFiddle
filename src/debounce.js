export default function debounce(func, interval = 100) {
  return function (...args) {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    const boundFunction = func.bind(null, args);
    this._debounceTimer = setTimeout(boundFunction, interval);
  };
}
