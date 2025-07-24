import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateOverlay.tsx
import { extractDetailsFromCslp } from "../../cslp/cslpdata.js";
import { cleanIndividualFieldResidual } from "../utils/handleIndividualFields.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { VisualBuilder } from "../index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { FieldDataType } from "../utils/types/index.types.js";
import { getFieldType } from "../utils/getFieldType.js";
import { getMultilinePlaintext } from "../utils/getMultilinePlaintext.js";
import { showAllHiddenHighlightedCommentIcons } from "./generateHighlightedComment.js";
function addFocusOverlay(targetElement, focusOverlayWrapper, disabled) {
  const targetElementDimension = targetElement.getBoundingClientRect();
  if (targetElementDimension.width === 0 || targetElementDimension.height === 0)
    return;
  focusOverlayWrapper.classList.add("visible");
  const distanceFromTop = targetElementDimension.top + window.scrollY;
  const topOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--top"
  );
  if (topOverlayDOM) {
    topOverlayDOM.style.top = "0";
    topOverlayDOM.style.left = "0";
    topOverlayDOM.style.width = "100%";
    topOverlayDOM.style.height = `calc(${distanceFromTop}px)`;
  }
  const bottomOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--bottom"
  );
  if (bottomOverlayDOM) {
    bottomOverlayDOM.style.top = `${targetElementDimension.bottom + window.scrollY}px`;
    bottomOverlayDOM.style.height = `${window.document.body.scrollHeight - targetElementDimension.bottom - window.scrollY}px`;
    bottomOverlayDOM.style.left = "0";
    bottomOverlayDOM.style.width = "100%";
  }
  const leftOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--left"
  );
  if (leftOverlayDOM) {
    leftOverlayDOM.style.left = "0";
    leftOverlayDOM.style.top = `${distanceFromTop}px`;
    leftOverlayDOM.style.height = `${targetElementDimension.height}px`;
    leftOverlayDOM.style.width = `${targetElementDimension.left}px`;
  }
  const rightOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--right"
  );
  if (rightOverlayDOM) {
    rightOverlayDOM.style.left = `${targetElementDimension.right}px`;
    rightOverlayDOM.style.top = `${distanceFromTop}px`;
    rightOverlayDOM.style.height = `${targetElementDimension.height}px`;
    rightOverlayDOM.style.width = `${document.documentElement.clientWidth - targetElementDimension.right}px`;
  }
  const outlineDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--outline"
  );
  if (outlineDOM) {
    outlineDOM.style.top = `${targetElementDimension.top + window.scrollY}px`;
    outlineDOM.style.height = `${targetElementDimension.height}px`;
    outlineDOM.style.width = `${targetElementDimension.width}px`;
    outlineDOM.style.left = `${targetElementDimension.left}px`;
    outlineDOM.style.outlineColor = disabled ? "#909090" : "#715cdd";
  }
}
function hideFocusOverlay(elements) {
  const {
    visualBuilderContainer,
    visualBuilderOverlayWrapper,
    focusedToolbar,
    resizeObserver,
    noTrigger
  } = elements;
  if (visualBuilderOverlayWrapper) {
    visualBuilderOverlayWrapper.classList.remove("visible");
    visualBuilderOverlayWrapper.childNodes.forEach((childNode) => {
      if (childNode instanceof Element) {
        childNode.removeAttribute("style");
      }
    });
    if (!noTrigger && // send update when focussed field has received input
    VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput) {
      sendFieldEvent({
        visualBuilderContainer,
        eventType: VisualBuilderPostMessageEvents.UPDATE_FIELD
      });
    } else if (noTrigger) {
      const { previousSelectedEditableDOM, focusFieldValue } = VisualBuilder.VisualBuilderGlobalState.value || {};
      if (previousSelectedEditableDOM && "innerText" in previousSelectedEditableDOM && focusFieldValue != null) {
        previousSelectedEditableDOM.innerText = focusFieldValue;
      }
    }
    VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = null;
    VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput = false;
    cleanIndividualFieldResidual({
      overlayWrapper: visualBuilderOverlayWrapper,
      visualBuilderContainer,
      focusedToolbar,
      resizeObserver
    });
  }
}
function sendFieldEvent(options) {
  const { visualBuilderContainer, eventType } = options;
  const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  const pseudoEditableElement = visualBuilderContainer == null ? void 0 : visualBuilderContainer.querySelector(
    "div.visual-builder__pseudo-editable-element"
  );
  if (previousSelectedEditableDOM && (previousSelectedEditableDOM.hasAttribute("contenteditable") || pseudoEditableElement)) {
    const actualEditedElement = pseudoEditableElement || previousSelectedEditableDOM;
    let data = "innerText" in actualEditedElement ? actualEditedElement.innerText : actualEditedElement.textContent;
    const fieldMetadata = extractDetailsFromCslp(
      previousSelectedEditableDOM.getAttribute("data-cslp")
    );
    FieldSchemaMap.getFieldSchema(
      fieldMetadata.content_type_uid,
      fieldMetadata.fieldPath
    ).then((fieldSchema) => {
      if (fieldSchema && eventType === VisualBuilderPostMessageEvents.UPDATE_FIELD) {
        const fieldType = getFieldType(fieldSchema);
        if (fieldType && fieldType === FieldDataType.MULTILINE) {
          data = getMultilinePlaintext(actualEditedElement);
          actualEditedElement.innerText = data;
        }
      }
    }).finally(() => {
      var _a;
      (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(eventType, {
        data,
        fieldMetadata
      });
    });
  }
}
function hideOverlay(params) {
  VisualBuilder.VisualBuilderGlobalState.value.isFocussed = false;
  const focusElementObserver = VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver;
  if (focusElementObserver) {
    focusElementObserver.disconnect();
    VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver = null;
  }
  hideFocusOverlay({
    visualBuilderContainer: params.visualBuilderContainer,
    visualBuilderOverlayWrapper: params.visualBuilderOverlayWrapper,
    focusedToolbar: params.focusedToolbar,
    resizeObserver: params.resizeObserver,
    noTrigger: Boolean(params.noTrigger)
  });
  showAllHiddenHighlightedCommentIcons();
  if (!VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM)
    return;
  params.resizeObserver.unobserve(
    VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM
  );
  VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = null;
}
export {
  addFocusOverlay,
  hideFocusOverlay,
  hideOverlay,
  sendFieldEvent
};
//# sourceMappingURL=generateOverlay.js.map