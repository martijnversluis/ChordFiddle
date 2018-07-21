import React from 'react';
import { configure as configureEnzyme, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RadioGroup from '../../components/RadioGroup';

configureEnzyme({ adapter: new Adapter() });

describe('RadioGroup', () => {
  describe('for each option', () => {
    it('renders the label', () => {
      const radioGroup = shallow(
        <RadioGroup
          id={'my_options'}
          onOptionSelected={jest.fn()}
          selected={'two'}
          options={{ one: 'First option' }}
        />,
      );

      const label = radioGroup.find('label');
      expect(label.text()).toEqual('First option');
    });

    it('checks the selected option', () => {
      const radioGroup = shallow(
        <RadioGroup
          id={'my_options'}
          onOptionSelected={jest.fn()}
          selected={'two'}
          options={{ one: 'First option', two: 'Second option' }}
        />,
      );

      const selectedRadio = radioGroup.find('input').findWhere(input => (
        input.prop('value') === 'two' && input.prop('checked') === true
      ));

      expect(selectedRadio).toHaveLength(1);
    });

    it('assigns as unique group name', () => {
      const radioGroup = shallow(
        <RadioGroup
          id={'my_options'}
          onOptionSelected={jest.fn()}
          selected={'two'}
          options={{ one: 'First option' }}
        />,
      );

      const input = radioGroup.find('input');
      expect(input.prop('name')).toEqual('radio-group-my_options');
    });

    it('assigns an unique ID', () => {
      const radioGroup = shallow(
        <RadioGroup
          id={'my_options'}
          onOptionSelected={jest.fn()}
          selected={'two'}
          options={{ one: 'First option' }}
        />,
      );

      const input = radioGroup.find('input');
      expect(input.prop('id')).toEqual('radio-group-my_options-one');

      const label = radioGroup.find('label');
      expect(label.prop('htmlFor')).toEqual('radio-group-my_options-one');
    });

    it('notifies the listener of changes', () => {
      const onOptionSelected = jest.fn();

      const radioGroup = shallow(
        <RadioGroup
          id={'my_options'}
          onOptionSelected={onOptionSelected}
          selected={'two'}
          options={{ one: 'First option' }}
        />,
      );

      const input = radioGroup.find('input');
      input.simulate('change', { target: { value: input.prop('value') } });
      expect(onOptionSelected.mock.calls).toHaveLength(1);
      expect(onOptionSelected.mock.calls[0][0]).toEqual('one');
    });
  });
});
