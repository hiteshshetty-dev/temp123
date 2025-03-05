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
import { addFocusOverlay, hideOverlay } from "../generators/generateOverlay.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { VisualBuilder } from "../index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { isFieldDisabled } from "../utils/isFieldDisabled.js";
import { toggleHighlightedCommentIconDisplay } from "../generators/generateHighlightedComment.js";
import { VB_EmptyBlockParentClass } from "../../index.js";
import { getFieldVariantStatus } from "../components/FieldRevert/FieldRevertComponent.js";
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
  appendFocusedToolbar(
    params.eventDetails,
    params.focusedToolbar,
    params.hideOverlay,
    params.isVariant
  );
}
async function handleBuilderInteraction(params) {
  const eventTarget = params.event.target;
  const isAnchorElement = eventTarget instanceof HTMLAnchorElement;
  const elementHasCslp = eventTarget && (eventTarget.hasAttribute("data-cslp") || eventTarget.closest("[data-cslp]"));
  if ((eventTarget == null ? void 0 : eventTarget.getAttribute("data-studio-ui")) === "true") {
    return;
  }
  if (isAnchorElement || elementHasCslp && !eventTarget.closest(".visual-builder__empty-block")) {
    params.event.preventDefault();
    params.event.stopPropagation();
  }
  const eventDetails = getCsDataOfElement(params.event);
  sendMouseClickPostMessage(eventDetails);
  if (!eventDetails || !params.overlayWrapper || !params.visualBuilderContainer) {
    return;
  }
  const { editableElement, fieldMetadata } = eventDetails;
  const variantStatus = await getFieldVariantStatus(fieldMetadata);
  const isVariant = variantStatus ? Object.values(variantStatus).some((value) => value === true) : false;
  cleanResidualsIfNeeded(params, editableElement);
  if (isEmptyBlockElement(editableElement)) {
    return;
  }
  const previousSelectedElement = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (isSameSelectedElement(previousSelectedElement, editableElement, params)) {
    return;
  }
  VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = editableElement;
  addOverlayAndToolbar(params, eventDetails, editableElement, isVariant);
  const { cslpValue } = fieldMetadata;
  toggleHighlightedCommentIconDisplay(cslpValue, false);
  await handleFieldSchemaAndIndividualFields(
    params,
    eventDetails,
    fieldMetadata,
    editableElement,
    previousSelectedElement
  );
  observeEditableElementChanges(params, editableElement);
}
function sendMouseClickPostMessage(eventDetails) {
  var _a;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.MOUSE_CLICK, {
    cslpData: eventDetails == null ? void 0 : eventDetails.cslpData,
    fieldMetadata: eventDetails == null ? void 0 : eventDetails.fieldMetadata
  }).catch((err) => {
    console.warn("Error while sending post message", err);
  });
}
function cleanResidualsIfNeeded(params, editableElement) {
  const previousSelectedElement = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedElement && previousSelectedElement !== editableElement || params.reEvaluate) {
    cleanIndividualFieldResidual({
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      focusedToolbar: params.focusedToolbar,
      resizeObserver: params.resizeObserver
    });
  }
}
function isEmptyBlockElement(editableElement) {
  return editableElement.classList.contains(VB_EmptyBlockParentClass) || editableElement.classList.contains("visual-builder__empty-block");
}
function isSameSelectedElement(previousSelectedElement, editableElement, params) {
  return !!(previousSelectedElement && previousSelectedElement === editableElement && !params.reEvaluate);
}
function addOverlayAndToolbar(params, eventDetails, editableElement, isVariant) {
  addOverlay({
    overlayWrapper: params.overlayWrapper,
    resizeObserver: params.resizeObserver,
    editableElement
  });
  addFocusedToolbar({
    eventDetails,
    focusedToolbar: params.focusedToolbar,
    hideOverlay: () => {
      hideOverlay({
        visualBuilderContainer: params.visualBuilderContainer,
        visualBuilderOverlayWrapper: params.overlayWrapper,
        focusedToolbar: params.focusedToolbar,
        resizeObserver: params.resizeObserver
      });
    },
    isVariant
  });
}
async function handleFieldSchemaAndIndividualFields(params, eventDetails, fieldMetadata, editableElement, previousSelectedElement) {
  var _a;
  const { content_type_uid, fieldPath } = fieldMetadata;
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
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.FOCUS_FIELD, {
    DOMEditStack: getDOMEditStack(editableElement)
  });
  await handleIndividualFields(eventDetails, {
    visualBuilderContainer: params.visualBuilderContainer,
    resizeObserver: params.resizeObserver,
    lastEditedField: previousSelectedElement
  });
}
function observeEditableElementChanges(params, editableElement) {
  const focusElementObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-cslp") {
        focusElementObserver == null ? void 0 : focusElementObserver.disconnect();
        VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver = null;
        handleBuilderInteraction({ ...params, reEvaluate: true });
      }
    });
  });
  VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver = focusElementObserver;
  focusElementObserver.observe(editableElement, { attributes: true });
}
var mouseClick_default = handleBuilderInteraction;
export {
  addFocusedToolbar,
  mouseClick_default as default
};
//# sourceMappingURL=mouseClick.js.map