import React from 'react';
import { configure as configureEnzyme, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ToolbarButton from '../../components/ToolbarButton';

configureEnzyme({ adapter: new Adapter() });

describe('ToolbarButton', () => {
  it('renders the text', () => {
    const toolbarButton = shallow(<ToolbarButton onClick={jest.fn()} text={'My button text'} />);

    const button = toolbarButton.find('button');
    expect(button.text()).toEqual('My button text');
  });

  it('notifies a listener when the button is clicked', () => {
    const onButtonClick = jest.fn();
    const toolbarButton = shallow(<ToolbarButton onClick={onButtonClick} text={'My button text'} />);

    const button = toolbarButton.find('button');
    button.simulate('click');

    expect(onButtonClick.mock.calls.length).toBe(1);
  });
});
