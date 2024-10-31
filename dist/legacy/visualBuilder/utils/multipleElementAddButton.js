import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/multipleElementAddButton.ts
import {
  generateAddInstanceButton,
  getAddInstanceButtons
} from "../generators/generateAddInstanceButtons.js";
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import getChildrenDirection from "./getChildrenDirection.js";
import { hideOverlay } from "../generators/generateOverlay.js";
import { hideHoverOutline } from "../listeners/mouseHover.js";
var WAIT_FOR_NEW_INSTANCE_TIMEOUT = 4e3;
function handleAddButtonsForMultiple(eventDetails, elements, config) {
  var _a, _b;
  const { editableElement, visualBuilderContainer, resizeObserver } = elements;
  const { expectedFieldData, fieldSchema, disabled, label } = config;
  const parentCslpValue = (_b = (_a = eventDetails.fieldMetadata.multipleFieldMetadata) == null ? void 0 : _a.parentDetails) == null ? void 0 : _b.parentCslpValue;
  if (!editableElement || !parentCslpValue) {
    return;
  }
  const direction = getChildrenDirection(editableElement, parentCslpValue);
  if (direction === "none" || !visualBuilderContainer) {
    return;
  }
  const targetDOMDimension = editableElement.getBoundingClientRect();
  removeAddInstanceButtons(
    {
      visualBuilderContainer,
      eventTarget: null,
      overlayWrapper: null
    },
    true
  );
  const overlayWrapper = visualBuilderContainer.querySelector(
    ".visual-builder__overlay__wrapper"
  );
  const focusedToolbar = visualBuilderContainer.querySelector(
    ".visual-builder__focused-toolbar"
  );
  const hideOverlayAndHoverOutline = () => {
    hideHoverOutline(visualBuilderContainer);
    hideOverlay({
      visualBuilderContainer,
      visualBuilderOverlayWrapper: overlayWrapper,
      focusedToolbar,
      resizeObserver
    });
  };
  if (disabled) {
    return;
  }
  const isField = eventDetails.fieldMetadata.instance.fieldPathWithIndex === eventDetails.fieldMetadata.fieldPathWithIndex;
  const prevIndex = isField ? 0 : eventDetails.fieldMetadata.multipleFieldMetadata.index;
  const nextIndex = isField ? expectedFieldData.length : eventDetails.fieldMetadata.multipleFieldMetadata.index + 1;
  const parentCslp = isField ? eventDetails.cslpData : parentCslpValue;
  const onMessageSent = (index) => {
    hideOverlayAndHoverOutline();
    observeParentAndFocusNewInstance({
      parentCslp,
      index
    });
  };
  const previousButton = generateAddInstanceButton({
    onClick: () => {
      var _a2;
      (_a2 = visualBuilderPostMessage) == null ? void 0 : _a2.send(VisualBuilderPostMessageEvents.ADD_INSTANCE, {
        fieldMetadata: eventDetails.fieldMetadata,
        index: prevIndex
      }).then(onMessageSent.bind(null, prevIndex));
    },
    label,
    fieldSchema,
    value: expectedFieldData
  });
  const nextButton = generateAddInstanceButton({
    onClick: () => {
      var _a2;
      (_a2 = visualBuilderPostMessage) == null ? void 0 : _a2.send(VisualBuilderPostMessageEvents.ADD_INSTANCE, {
        fieldMetadata: eventDetails.fieldMetadata,
        index: nextIndex
      }).then(onMessageSent.bind(null, nextIndex));
    },
    label,
    fieldSchema,
    value: expectedFieldData
  });
  if (!visualBuilderContainer.contains(previousButton)) {
    visualBuilderContainer.appendChild(previousButton);
  }
  if (!visualBuilderContainer.contains(nextButton)) {
    visualBuilderContainer.appendChild(nextButton);
  }
  if (direction === "horizontal") {
    const middleHeight = targetDOMDimension.top + (targetDOMDimension.bottom - targetDOMDimension.top) / 2 + window.scrollY;
    previousButton.style.left = `${targetDOMDimension.left}px`;
    previousButton.style.top = `${middleHeight}px`;
    nextButton.style.left = `${targetDOMDimension.right}px`;
    nextButton.style.top = `${middleHeight}px`;
  } else {
    const middleWidth = targetDOMDimension.left + (targetDOMDimension.right - targetDOMDimension.left) / 2;
    previousButton.style.left = `${middleWidth}px`;
    previousButton.style.top = `${targetDOMDimension.top + window.scrollY}px`;
    nextButton.style.left = `${middleWidth}px`;
    nextButton.style.top = `${targetDOMDimension.bottom + window.scrollY}px`;
  }
}
function removeAddInstanceButtons(elements, forceRemoveAll = false) {
  const { visualBuilderContainer, overlayWrapper, eventTarget } = elements;
  if (!visualBuilderContainer) {
    return;
  }
  if (forceRemoveAll) {
    const addInstanceButtons2 = getAddInstanceButtons(
      visualBuilderContainer,
      true
    );
    addInstanceButtons2 == null ? void 0 : addInstanceButtons2.forEach((button) => button.remove());
  }
  const addInstanceButtons = getAddInstanceButtons(visualBuilderContainer);
  if (!addInstanceButtons) {
    return;
  }
  const [previousButton, nextButton] = addInstanceButtons;
  if (overlayWrapper == null ? void 0 : overlayWrapper.classList.contains("visible")) {
    return;
  }
  if (eventTarget && (previousButton.contains(eventTarget) || nextButton.contains(eventTarget))) {
    return;
  }
  nextButton.remove();
  previousButton.remove();
}
function observeParentAndFocusNewInstance({
  parentCslp,
  index
}) {
  const parent = document.querySelector(
    `[data-cslp='${parentCslp}']`
  );
  if (parent) {
    const expectedCslp = [parentCslp, index].join(".");
    let hasObserverDisconnected = false;
    let timeoutId = null;
    const mutationObserver = new MutationObserver(
      (_mutations, observer) => {
        const newInstance = parent.querySelector(
          `[data-cslp='${expectedCslp}']`
        );
        if (newInstance) {
          setTimeout(() => newInstance.click(), 150);
          observer.disconnect();
          hasObserverDisconnected = true;
          return;
        }
        if (!hasObserverDisconnected && !timeoutId) {
          timeoutId = setTimeout(() => {
            observer.disconnect();
            hasObserverDisconnected = false;
          }, WAIT_FOR_NEW_INSTANCE_TIMEOUT);
        }
      }
    );
    mutationObserver.observe(parent, {
      childList: true,
      // watch subtrees as there may be wrapper elements
      subtree: true,
      // we don't need to watch for attribute changes
      attributes: false
    });
  }
}
export {
  handleAddButtonsForMultiple,
  observeParentAndFocusNewInstance,
  removeAddInstanceButtons
};
//# sourceMappingURL=multipleElementAddButton.js.map