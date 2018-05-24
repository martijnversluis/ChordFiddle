import { connect } from 'react-redux';

import Toolbar from '../components/Toolbar';

const mapDispatchToProps = dispatch => ({
  onButtonClicked(action) {
    dispatch(action());
  },
});

export default connect(null, mapDispatchToProps)(Toolbar);
