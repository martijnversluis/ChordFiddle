import React from 'react';
import { configure as configureEnzyme, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChordSheetEditor from '../../components/ChordSheetEditor';

configureEnzyme({ adapter: new Adapter() });

describe('ChordSheetEditor', () => {
  it('notifies a listener when the chord sheet changes', () => {
    const onChordSheetChange = jest.fn();

    const chordSheetEditor = shallow(
      <ChordSheetEditor
        selectionStart={0}
        selectionEnd={0}
        chordSheet={''}
        onChordSheetChange={onChordSheetChange}
        onSelectionChange={jest.fn()}
      />,
    );

    const textarea = chordSheetEditor.find('textarea');

    textarea.simulate('change', {
      target: { value: 'changed chord sheet' },
    });

    expect(onChordSheetChange.mock.calls).toHaveLength(1);
    expect(onChordSheetChange.mock.calls[0][0]).toEqual('changed chord sheet');
  });

  it('notifies a listener when the selection changes', () => {
    const onSelectionChange = jest.fn();

    const chordSheetEditor = shallow(
      <ChordSheetEditor
        selectionStart={0}
        selectionEnd={0}
        chordSheet={''}
        onChordSheetChange={jest.fn()}
        onSelectionChange={onSelectionChange}
      />,
    );

    const textarea = chordSheetEditor.find('textarea');

    textarea.simulate('select', {
      target: { selectionStart: 5, selectionEnd: 10 },
    });

    expect(onSelectionChange.mock.calls).toHaveLength(1);
    expect(onSelectionChange.mock.calls[0]).toEqual([5, 10]);
  });
});
