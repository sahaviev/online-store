// eslint-disable-next-line import/no-cycle
import { AbstractView } from './abstract-view.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

function getElement(object) {
  if (object instanceof AbstractView) {
    return object.getElement();
  }
  return object;
}

export const render = (container, child, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      getElement(container).prepend(getElement(child));
      break;
    case RenderPosition.BEFOREEND:
    default:
      getElement(container).append(getElement(child));
  }
};

export const replace = (newChild, oldChild) => {
  const { parentElement } = getElement(oldChild);

  if (parentElement === null || newChild === null) {
    throw new Error('Can\'t replace non-existent elements');
  }

  parentElement.replaceChild(getElement(newChild), getElement(oldChild));
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Possible to remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
