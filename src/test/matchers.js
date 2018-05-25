import expect from 'expect';

const hrefMatches = (node, href) => {
  if (href) {
    return node.prop('href') === href;
  }

  return true;
};

const textMatches = (node, text) => {
  const nodeText = node.childAt(0).text();

  if (text instanceof RegExp) {
    return text.test(nodeText);
  }

  return text === nodeText;
};

const linkDescription = (text, href) => {
  let description = `"${text}"`;

  if (href) {
    description = `${description} and href ${href}`;
  }

  return description;
};

expect.extend({
  toHaveExternalLink(container, text, options = {}) {
    const { href } = options;
    const links = container.find('ExternalLink').findWhere(node => hrefMatches(node, href) && textMatches(node, text));
    const pass = links.length > 0;

    if (pass) {
      return {
        message: () => `Expected container not to have link ${linkDescription(text, href)}`,
        pass: true,
      };
    }

    return {
      message: () => `Expected container to have link ${linkDescription(text, href)}`,
      pass: false,
    };
  },
});
