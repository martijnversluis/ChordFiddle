class ValueWithHistory {
  constructor(initialValue) {
    this.value = initialValue;
    this.valueWas = undefined;
  }

  set(newValue) {
    this.valueWas = this.value;
    this.value = newValue;
  }
}

function valueWithHistory(initialValue) {
  return new ValueWithHistory(initialValue);
}

export default valueWithHistory;
