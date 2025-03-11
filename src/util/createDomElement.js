const createDOMElement = ({ tag, children, ...props }) => {
  if (!tag) {
    throw new Error('Tag is required');
  }

  const element = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    element[key] = value;
  });

  if (children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  return element;
};

export default createDOMElement;
