class Component {
  constructor(containerID) {
    this.containerID = containerID;
    this.container = document.getElementById(containerID);

    if (!this.container) {
      throw new Error(`Could not find ${this.constructor.name} container with ID: ${containerID}`);
    }

    this.setup();
  }

  setup() {}

  onClick(elementID, listener) {
    this.bindEvent(elementID, 'click', listener);
  }

  onChange(elementID, listener) {
    this.bindEvent(elementID, 'change', listener);
  }

  bindEvent(elementID, event, listener) {
    this.element(elementID).addEventListener(event, listener);
  }

  element(elementID) {
    return document.getElementById(`${this.containerID}__${elementID}`);
  }
}

export default Component;
