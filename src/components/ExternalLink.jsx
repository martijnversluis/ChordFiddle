import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = (props) => {
  const { children, href } = props;
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
};

ExternalLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

ExternalLink.defaultProps = {
  children: [],
};

export default ExternalLink;
