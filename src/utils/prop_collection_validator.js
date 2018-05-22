const propCollectionValidator = callback => (
  (props, propName, componentName) => {
    const collection = props[propName];

    const errors = Object
      .keys(collection)
      .map((key) => {
        const value = collection[key];
        return callback(key, value);
      })
      .reduce((allAssertions, itemAssertions) => allAssertions.concat(itemAssertions))
      .filter(([assertion]) => !assertion)
      .map(([, message]) => message);

    if (errors.length > 0) {
      return Error(`Invalid prop ${propName} supplied to component ${componentName}:\n${errors.join('\n')}`);
    }

    return null;
  }
);

export default propCollectionValidator;
