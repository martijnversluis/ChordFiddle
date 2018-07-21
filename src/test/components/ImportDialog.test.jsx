import React from 'react';
import { configure as configureEnzyme, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ImportDialog from '../../components/ImportDialog';

configureEnzyme({ adapter: new Adapter() });

describe('ImportDialog', () => {
  it('does not render when show=false', () => {
    const importDialog = shallow(
      <ImportDialog
        show={false}
        onCloseButtonClick={jest.fn()}
        onImportButtonClick={jest.fn()}
        onImportableChordSheetChange={jest.fn()}
      />,
    );

    expect(importDialog.find('*')).toHaveLength(0);
  });

  it('notifies a listener when the close button is clicked', () => {
    const onCloseButtonClick = jest.fn();

    const importDialog = shallow(
      <ImportDialog
        show
        onCloseButtonClick={onCloseButtonClick}
        onImportButtonClick={jest.fn()}
        onImportableChordSheetChange={jest.fn()}
      />,
    );

    const closeButton = importDialog.findWhere(node => node.type() === 'button' && node.text() === '×');
    closeButton.simulate('click');

    expect(onCloseButtonClick.mock.calls).toHaveLength(1);
  });

  it('notifies a listener when the importable chord sheet changes', () => {
    const onImportableChordSheetChange = jest.fn();

    const importDialog = shallow(
      <ImportDialog
        show
        onCloseButtonClick={jest.fn()}
        onImportButtonClick={jest.fn()}
        onImportableChordSheetChange={onImportableChordSheetChange}
      />,
    );

    const chordSheetEditor = importDialog.find('textarea');
    chordSheetEditor.simulate('change', { target: { value: 'importable chord sheet' } });

    expect(onImportableChordSheetChange.mock.calls).toHaveLength(1);
    expect(onImportableChordSheetChange.mock.calls[0][0]).toEqual('importable chord sheet');
  });

  it('notifies a listener when the import button is clicked', () => {
    const onImportButtonClick = jest.fn();

    const importDialog = shallow(
      <ImportDialog
        show
        onCloseButtonClick={jest.fn()}
        onImportButtonClick={onImportButtonClick}
        onImportableChordSheetChange={jest.fn()}
      />,
    );

    const importButton = importDialog.findWhere(node => (
      node.type() === 'button' && node.text() === 'Import chord sheet'
    ));

    importButton.simulate('click');

    expect(onImportButtonClick.mock.calls).toHaveLength(1);
  });
});
