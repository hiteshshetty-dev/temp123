import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/listeners/mouseHover.ts
import { debounce, throttle } from "lodash-es";
import { getCsDataOfElement } from "../utils/getCsDataOfElement.js";
import { removeAddInstanceButtons } from "../utils/multipleElementAddButton.js";
import { generateCustomCursor } from "../generators/generateCustomCursor.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { isFieldDisabled } from "../utils/isFieldDisabled.js";
import { getFieldType } from "../utils/getFieldType.js";
import { VisualBuilder } from "../index.js";
import { addHoverOutline } from "../generators/generateHoverOutline.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { VB_EmptyBlockParentClass } from "../../index.js";
import Config from "../../configManager/configManager.js";
import { isCollabThread } from "../generators/generateThread.js";
import { appendFieldPathDropdown } from "../generators/generateToolbar.js";
import { fetchEntryPermissionsAndStageDetails } from "../utils/fetchEntryPermissionsAndStageDetails.js";
var config = Config.get();
function resetCustomCursor(customCursor) {
  if (customCursor) {
    generateCustomCursor({
      fieldType: "empty",
      customCursor
    });
  }
}
function collabCustomCursor(customCursor) {
  if (!customCursor) return;
  generateCustomCursor({
    fieldType: "discussion",
    customCursor
  });
}
function handleCursorPosition(event, customCursor) {
  if (customCursor) {
    const mouseY = event.clientY;
    const mouseX = event.clientX;
    customCursor.style.left = `${mouseX}px`;
    customCursor.style.top = `${mouseY}px`;
  }
}
async function addOutline(params) {
  if (!params) {
    return;
  }
  const {
    editableElement,
    eventDetails,
    content_type_uid,
    fieldPath,
    fieldMetadata,
    fieldDisabled
  } = params;
  if (!editableElement) return;
  addHoverOutline(editableElement, fieldDisabled);
  const fieldSchema = await FieldSchemaMap.getFieldSchema(
    content_type_uid,
    fieldPath
  );
  if (!fieldSchema) return;
  const { acl: entryAcl, workflowStage: entryWorkflowStageDetails } = await fetchEntryPermissionsAndStageDetails({
    entryUid: fieldMetadata.entry_uid,
    contentTypeUid: fieldMetadata.content_type_uid,
    locale: fieldMetadata.locale,
    variantUid: fieldMetadata.variant
  });
  const { isDisabled } = isFieldDisabled(
    fieldSchema,
    eventDetails,
    entryAcl,
    entryWorkflowStageDetails
  );
  addHoverOutline(editableElement, fieldDisabled || isDisabled);
}
var debouncedAddOutline = debounce(addOutline, 50, { trailing: true });
var showOutline = (params) => debouncedAddOutline(params);
function hideDefaultCursor() {
  if (document?.body && !document.body.classList.contains(
    visualBuilderStyles()["visual-builder__default-cursor--disabled"]
  ))
    document.body.classList.add(
      visualBuilderStyles()["visual-builder__default-cursor--disabled"]
    );
}
function showDefaultCursor() {
  if (document?.body && document.body.classList.contains(
    visualBuilderStyles()["visual-builder__default-cursor--disabled"]
  ))
    document.body.classList.remove(
      visualBuilderStyles()["visual-builder__default-cursor--disabled"]
    );
}
function hideHoverOutline(visualBuilderContainer) {
  if (!visualBuilderContainer) {
    return;
  }
  const hoverOutline = visualBuilderContainer.querySelector(
    ".visual-builder__hover-outline"
  );
  if (!hoverOutline) {
    return;
  }
  hoverOutline.classList.add(
    visualBuilderStyles()["visual-builder__hover-outline--hidden"]
  );
}
function hideCustomCursor(customCursor) {
  showDefaultCursor();
  customCursor?.classList.remove("visible");
}
function showCustomCursor(customCursor) {
  hideDefaultCursor();
  if (config.collab.enable && (!config.collab.isFeedbackMode || config.collab.pauseFeedback))
    return;
  customCursor?.classList.add("visible");
}
var debouncedRenderHoverToolbar = debounce(async (params) => {
  const eventDetails = getCsDataOfElement(params.event);
  if (!eventDetails || !params.overlayWrapper || !params.visualBuilderContainer || !params.focusedToolbar) {
    return;
  }
  appendFieldPathDropdown(eventDetails, params.focusedToolbar, {
    isHover: true
  });
}, 50, { trailing: true });
var showHoverToolbar = async (params) => await debouncedRenderHoverToolbar(params);
function isOverlay(target) {
  return target.classList.contains("visual-builder__overlay");
}
function isContentEditable(target) {
  if (target.hasAttribute("contenteditable"))
    return target.getAttribute("contenteditable") === "true";
  return false;
}
function isFieldPathDropdown(target) {
  return target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper") || target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper__current-field");
}
function isFieldPathParent(target) {
  return target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper__parent-field");
}
var throttledMouseHover = throttle(async (params) => {
  const eventDetails = getCsDataOfElement(params.event);
  const eventTarget = params.event.target;
  if (config?.collab.enable && config?.collab.pauseFeedback) {
    hideCustomCursor(params.customCursor);
    return;
  }
  if (!eventDetails) {
    if (eventTarget && (isOverlay(eventTarget) || isContentEditable(eventTarget) || isCollabThread(eventTarget))) {
      handleCursorPosition(params.event, params.customCursor);
      hideCustomCursor(params.customCursor);
      return;
    }
    if (eventTarget && (isFieldPathDropdown(eventTarget) || isFieldPathParent(eventTarget))) {
      params.customCursor && hideCustomCursor(params.customCursor);
      showOutline();
      showHoverToolbar({
        event: params.event,
        overlayWrapper: params.overlayWrapper,
        visualBuilderContainer: params.visualBuilderContainer,
        previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: params.focusedToolbar,
        resizeObserver: params.resizeObserver
      });
    }
    if (!config?.collab.enable) {
      resetCustomCursor(params.customCursor);
    }
    removeAddInstanceButtons({
      eventTarget: params.event.target,
      visualBuilderContainer: params.visualBuilderContainer,
      overlayWrapper: params.overlayWrapper
    });
    handleCursorPosition(params.event, params.customCursor);
    if (config?.collab.enable && config?.collab.isFeedbackMode) {
      showCustomCursor(params.customCursor);
      collabCustomCursor(params.customCursor);
    }
    return;
  }
  const { editableElement, fieldMetadata } = eventDetails;
  const { content_type_uid, fieldPath } = fieldMetadata;
  if (VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM && VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM.isSameNode(
    editableElement
  )) {
    hideCustomCursor(params.customCursor);
    return;
  }
  if (params.customCursor) {
    const elementUnderCursor = document.elementFromPoint(
      params.event.clientX,
      params.event.clientY
    );
    if (elementUnderCursor) {
      if (elementUnderCursor.nodeName === "A" || elementUnderCursor.nodeName === "BUTTON") {
        elementUnderCursor.classList.add(
          visualBuilderStyles()["visual-builder__no-cursor-style"]
        );
      }
    }
    if (config?.collab.enable && config?.collab.isFeedbackMode) {
      collabCustomCursor(params.customCursor);
      handleCursorPosition(params.event, params.customCursor);
      showCustomCursor(params.customCursor);
      return;
    } else if (config?.collab.enable && !config?.collab.isFeedbackMode) {
      hideCustomCursor(params.customCursor);
      return;
    }
    if (VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM !== editableElement) {
      resetCustomCursor(params.customCursor);
      removeAddInstanceButtons({
        eventTarget: params.event.target,
        visualBuilderContainer: params.visualBuilderContainer,
        overlayWrapper: params.overlayWrapper
      });
    }
    if (!FieldSchemaMap.hasFieldSchema(content_type_uid, fieldPath)) {
      generateCustomCursor({
        fieldType: "loading",
        customCursor: params.customCursor
      });
    }
    generateCursor({
      eventDetails,
      customCursor: params.customCursor
    });
    handleCursorPosition(params.event, params.customCursor);
    showCustomCursor(params.customCursor);
  }
  if (!editableElement.classList.contains(VB_EmptyBlockParentClass) && !editableElement.classList.contains("visual-builder__empty-block")) {
    showOutline({
      editableElement,
      eventDetails,
      content_type_uid,
      fieldPath,
      fieldMetadata
    });
    const isFocussed = VisualBuilder.VisualBuilderGlobalState.value.isFocussed;
    if (!isFocussed) {
      showHoverToolbar({
        event: params.event,
        overlayWrapper: params.overlayWrapper,
        visualBuilderContainer: params.visualBuilderContainer,
        previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: params.focusedToolbar,
        resizeObserver: params.resizeObserver
      });
    }
  }
  if (VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM === editableElement) {
    return;
  }
  VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM = editableElement;
}, 10);
async function generateCursor({
  eventDetails,
  customCursor
}) {
  if (!customCursor) return;
  const { fieldMetadata } = eventDetails;
  const fieldSchema = await FieldSchemaMap.getFieldSchema(
    fieldMetadata.content_type_uid,
    fieldMetadata.fieldPath
  );
  if (!fieldSchema) {
    return;
  }
  const { acl: entryAcl, workflowStage: entryWorkflowStageDetails } = await fetchEntryPermissionsAndStageDetails({
    entryUid: fieldMetadata.entry_uid,
    contentTypeUid: fieldMetadata.content_type_uid,
    locale: fieldMetadata.locale,
    variantUid: fieldMetadata.variant
  });
  const { isDisabled: fieldDisabled } = isFieldDisabled(
    fieldSchema,
    eventDetails,
    entryAcl,
    entryWorkflowStageDetails
  );
  const fieldType = getFieldType(fieldSchema);
  generateCustomCursor({
    fieldType,
    customCursor,
    fieldDisabled
  });
}
var handleMouseHover = async (params) => await throttledMouseHover(params);
var mouseHover_default = handleMouseHover;
export {
  mouseHover_default as default,
  hideCustomCursor,
  hideHoverOutline,
  showCustomCursor,
  showHoverToolbar
};
//# sourceMappingURL=mouseHover.js.map