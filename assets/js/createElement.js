function createElement(
  tag,
  { classNames = [], attributes = {}, events = {}, name = [] },
  ...children
) {
  const element = document.createElement(tag);
  if (classNames.length) {
    element.classList.add(...classNames);
  }
  for (const [nameAttr, valueAttr] of Object.entries(attributes)) {
    element.setAttribute(nameAttr, valueAttr);
  }
  for (const [typeEvent, handleEvent] of Object.entries(events)) {
    element.addEventListener(typeEvent, handleEvent);
  }
  if (name.length) {
    element.style.backgroundColor = stringToColour(...(name || "Anonim"));
    element.append(document.createTextNode(getInitials(name)));
  }
  element.append(...children);
  return element;
}
