const createDOMElement = ({ tag, children, ...props }) => {
  if (!tag) {
    throw new Error('Tag is required');
  }

  const element = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      // ✅ 일반 속성 등록
      element[key] = value;
    }
  });

  if (children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  return element;
};

export default createDOMElement;
