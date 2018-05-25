import React from 'react';
import { configure as configureEnzyme, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '../matchers';
import Navigation from '../../components/Navigation';

configureEnzyme({ adapter: new Adapter() });

jest.mock('../../../package.json', () => ({
  version: '1.2.3',
  githubHome: 'https://github.com/test/test',
  bugs: { url: 'https://github.com/test/test/issues/new' },
  about: 'https://github.com/test/test#readme',
}));

describe('Navigation', () => {
  it('shows the current version', () => {
    const navigation = shallow(<Navigation />);

    expect(navigation.text()).toMatch(/1.2.3/);
  });

  it('shows a link to the GitHub home', () => {
    const navigation = shallow(<Navigation />);

    expect(navigation).toHaveExternalLink('GitHub', { href: 'https://github.com/test/test' });
  });

  it('shows a link to report issues', () => {
    const navigation = shallow(<Navigation />);

    expect(navigation).toHaveExternalLink('Issues', { href: 'https://github.com/test/test/issues/new' });
  });

  it('shows a link to the about section', () => {
    const navigation = shallow(<Navigation />);

    expect(navigation).toHaveExternalLink('About', { href: 'https://github.com/test/test#readme' });
  });
});
