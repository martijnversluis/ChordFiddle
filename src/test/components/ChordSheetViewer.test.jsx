import React from 'react';
import context from 'jest-plugin-context';
import { configure as configureEnzyme, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChordSheetViewer from '../../components/ChordSheetViewer';
import ChordSheetHTMLViewer from '../../components/ChordSheetHTMLViewer';
import ChordSheetTextViewer from '../../components/ChordSheetTextViewer';

configureEnzyme({ adapter: new Adapter() });

describe('ChordSheetViewer', () => {
  context('when the preview mode is html', () => {
    it('renders a html viewer', () => {
      const chordSheetViewer = shallow(<ChordSheetViewer chordSheet={''} previewMode={'html'} />);

      expect(chordSheetViewer.find(ChordSheetHTMLViewer)).toHaveLength(1);
    });
  });

  context('when the preview mode is text', () => {
    it('renders a text viewer', () => {
      const chordSheetViewer = shallow(<ChordSheetViewer chordSheet={''} previewMode={'text'} />);

      expect(chordSheetViewer.find(ChordSheetTextViewer)).toHaveLength(1);
    });
  });

  context('when the preview mode is something else', () => {
    it('returns null', () => {
      const chordSheetViewer = shallow(<ChordSheetViewer chordSheet={''} previewMode={'foobar'} />);

      expect(chordSheetViewer.html()).toBeNull();
    });
  });
});
