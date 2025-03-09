import lodashSet from 'lodash.set';

import Component from './component';

class ConfigEditor extends Component {
  setup() {
    this.config = {};
    this.onConfigChange = () => {};
    this.inputChanged = this.inputChanged.bind(this);

    Array.from(this.container.querySelectorAll('[data-config-editor-attribute]')).forEach((input) => {
      this.saveConfigValue(input);
      input.addEventListener('input', this.inputChanged);
    });
  }

  getConfig() {
    return this.config;
  }

  setConfig(config, prefix = '') {
    Object.keys(config).forEach((key) => {
      const value = config[key];

      if (typeof value === 'object') {
        this.setConfig(value, `${prefix}${key}.`);
      } else {
        const input = this.container.querySelector(`[data-config-editor-attribute="${prefix}${key}"]`);

        if (input) {
          input.value = value;
        }
      }
    });
  }

  inputChanged({ target }) {
    this.saveConfigValue(target);
  }

  saveConfigValue({ value, dataset: { configEditorAttribute, configEditorType } }) {
    const parsedValue = this.parseValue(value, configEditorType);
    this.config = lodashSet(this.config, configEditorAttribute, parsedValue);
    this.onConfigChange(this.config);
  }

  parseValue(value, type) {
    if (type === 'boolean') {
      return value === 'true';
    }

    return value;
  }
}

export default ConfigEditor;
