import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/listeners/mouseClick.ts
import {
  cleanIndividualFieldResidual,
  handleIndividualFields
} from "../utils/handleIndividualFields.js";
import {
  getCsDataOfElement,
  getDOMEditStack
} from "../utils/getCsDataOfElement.js";
import { appendFocusedToolbar } from "../generators/generateToolbar.js";
import { addFocusOverlay } from "../generators/generateOverlay.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { VisualBuilder } from "../index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { isFieldDisabled } from "../utils/isFieldDisabled.js";
import { toggleHighlightedCommentIconDisplay } from "../generators/generateHighlightedComment.js";
function addOverlay(params) {
  if (!params.overlayWrapper || !params.editableElement) return;
  addFocusOverlay(
    params.editableElement,
    params.overlayWrapper,
    params.isFieldDisabled
  );
  params.resizeObserver.observe(params.editableElement);
}
function addFocusedToolbar(params) {
  const { editableElement } = params.eventDetails;
  if (!editableElement || !params.focusedToolbar) return;
  appendFocusedToolbar(params.eventDetails, params.focusedToolbar);
}
async function handleBuilderInteraction(params) {
  var _a, _b;
  const eventTarget = params.event.target;
  const isAnchorElement = eventTarget instanceof HTMLAnchorElement;
  const elementHasCslp = eventTarget && (eventTarget.hasAttribute("data-cslp") || eventTarget.closest("[data-cslp]"));
  if (isAnchorElement || elementHasCslp && !eventTarget.closest(".visual-builder__empty-block")) {
    params.event.preventDefault();
    params.event.stopPropagation();
  }
  const eventDetails = getCsDataOfElement(params.event);
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.MOUSE_CLICK, {
    cslpData: eventDetails == null ? void 0 : eventDetails.cslpData,
    fieldMetadata: eventDetails == null ? void 0 : eventDetails.fieldMetadata
  }).catch((err) => {
    console.warn("Error while sending post message", err);
  });
  if (!eventDetails || !params.overlayWrapper || !params.visualBuilderContainer) {
    return;
  }
  const { editableElement, fieldMetadata } = eventDetails;
  if (VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM && VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM !== editableElement) {
    cleanIndividualFieldResidual({
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      focusedToolbar: params.focusedToolbar,
      resizeObserver: params.resizeObserver
    });
  }
  if (editableElement.classList.contains(
    "visual-builder__empty-block-parent"
  ) || editableElement.classList.contains("visual-builder__empty-block")) {
    return;
  }
  const previousSelectedElement = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedElement && previousSelectedElement === editableElement) {
    return;
  }
  VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = editableElement;
  addOverlay({
    overlayWrapper: params.overlayWrapper,
    resizeObserver: params.resizeObserver,
    editableElement
  });
  addFocusedToolbar({
    eventDetails,
    focusedToolbar: params.focusedToolbar
  });
  const { content_type_uid, fieldPath, cslpValue } = fieldMetadata;
  toggleHighlightedCommentIconDisplay(cslpValue, false);
  const fieldSchema = await FieldSchemaMap.getFieldSchema(
    content_type_uid,
    fieldPath
  );
  if (fieldSchema) {
    const { isDisabled } = isFieldDisabled(fieldSchema, eventDetails);
    if (isDisabled) {
      addOverlay({
        overlayWrapper: params.overlayWrapper,
        resizeObserver: params.resizeObserver,
        editableElement,
        isFieldDisabled: true
      });
    }
  }
  (_b = visualBuilderPostMessage) == null ? void 0 : _b.send(VisualBuilderPostMessageEvents.FOCUS_FIELD, {
    DOMEditStack: getDOMEditStack(editableElement)
  });
  await handleIndividualFields(eventDetails, {
    visualBuilderContainer: params.visualBuilderContainer,
    resizeObserver: params.resizeObserver,
    lastEditedField: previousSelectedElement
  });
}
var mouseClick_default = handleBuilderInteraction;
export {
  addFocusedToolbar,
  mouseClick_default as default
};
//# sourceMappingURL=mouseClick.js.map