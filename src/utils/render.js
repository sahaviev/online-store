// eslint-disable-next-line import/no-cycle
import {AbstractView} from '../view/abstract-view.js';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const getElement = (object) => {
  if (object instanceof AbstractView) {
    return object.getElement();
  }
  return object;
};

const handleBeforeRenderCallback = (object) => {
  if (object instanceof AbstractView) {
    object.handleBeforeRenderCallback();
  }
};

const handleAfterRenderCallback = (object) => {
  if (object instanceof AbstractView) {
    object.handleAfterRenderCallback();
  }
};

export const render = (container, child, place = RenderPosition.BEFOREEND) => {
  handleBeforeRenderCallback(child);
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      getElement(container).prepend(getElement(child));
      break;
    case RenderPosition.BEFOREEND:
    default:
      getElement(container).append(getElement(child));
  }
  handleAfterRenderCallback(child);
};

export const replace = (newChild, oldChild) => {
  const {parentElement} = getElement(oldChild);

  if (parentElement === null || newChild === null) {
    throw new Error(`Can't replace non-existent elements`);
  }

  handleBeforeRenderCallback(newChild);
  parentElement.replaceChild(getElement(newChild), getElement(oldChild));
  handleAfterRenderCallback(newChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Possible to remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
