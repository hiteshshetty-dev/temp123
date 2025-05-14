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
import getXPath from "get-xpath";
import Config from "../../configManager/configManager.js";
import { generateThread } from "../generators/generateThread.js";
import { isCollabThread } from "../generators/generateThread.js";
import { toggleCollabPopup } from "../generators/generateThread.js";
import { fixSvgXPath } from "../utils/collabUtils.js";
import { v4 as uuidV4 } from "uuid";
import { getEntryPermissionsCached } from "../utils/getEntryPermissionsCached.js";
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
  const duplicates = document.querySelectorAll(
    `[data-cslp="${eventTarget?.getAttribute("data-cslp")}"]`
  );
  if (duplicates.length > 1) {
    duplicates.forEach((ele) => {
      if (!ele.hasAttribute("data-cslp-unique-id")) {
        const uniqueId = `cslp-${uuidV4()}`;
        ele.setAttribute("data-cslp-unique-id", uniqueId);
      }
    });
  }
  if (eventTarget?.getAttribute("data-studio-ui") === "true") {
    return;
  }
  if (params.event.altKey) {
    if (isAnchorElement) {
      params.event.preventDefault();
      params.event.stopPropagation();
    }
    return;
  }
  if (isAnchorElement || elementHasCslp && !eventTarget.closest(".visual-builder__empty-block")) {
    params.event.preventDefault();
    params.event.stopPropagation();
  }
  const config = Config.get();
  if (config?.collab.enable === true) {
    if (config?.collab.pauseFeedback) return;
    const xpath = fixSvgXPath(getXPath(eventTarget));
    if (!eventTarget) return;
    const rect = eventTarget.getBoundingClientRect();
    const relativeX = (params.event.clientX - rect.left) / rect.width;
    const relativeY = (params.event.clientY - rect.top) / rect.height;
    if (!isCollabThread(eventTarget)) {
      params.event.preventDefault();
      params.event.stopPropagation();
    }
    if (isCollabThread(eventTarget)) {
      Config.set("collab.isFeedbackMode", false);
    } else if (config?.collab.isFeedbackMode) {
      generateThread(
        { xpath, relativeX, relativeY },
        {
          isNewThread: true,
          updateConfig: true
        }
      );
    } else {
      toggleCollabPopup({ threadUid: "", action: "close" });
      Config.set("collab.isFeedbackMode", true);
    }
    return;
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
  visualBuilderPostMessage?.send(VisualBuilderPostMessageEvents.MOUSE_CLICK, {
    cslpData: eventDetails?.cslpData,
    fieldMetadata: eventDetails?.fieldMetadata
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
  const { content_type_uid, entry_uid, fieldPath, locale } = fieldMetadata;
  const fieldSchema = await FieldSchemaMap.getFieldSchema(
    content_type_uid,
    fieldPath
  );
  const entryAcl = await getEntryPermissionsCached({
    entryUid: entry_uid,
    contentTypeUid: content_type_uid,
    locale
  });
  if (fieldSchema) {
    const { isDisabled } = isFieldDisabled(
      fieldSchema,
      eventDetails,
      entryAcl
    );
    if (isDisabled) {
      addOverlay({
        overlayWrapper: params.overlayWrapper,
        resizeObserver: params.resizeObserver,
        editableElement,
        isFieldDisabled: true
      });
    }
  }
  visualBuilderPostMessage?.send(VisualBuilderPostMessageEvents.FOCUS_FIELD, {
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
        focusElementObserver?.disconnect();
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