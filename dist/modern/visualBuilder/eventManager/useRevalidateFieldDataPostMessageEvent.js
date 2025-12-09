import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useRevalidateFieldDataPostMessageEvent.ts
import { VisualBuilder } from "../index.js";
import { extractDetailsFromCslp } from "../../cslp/index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { hideFocusOverlay } from "../generators/generateOverlay.js";
import { handleBuilderInteraction } from "../listeners/mouseClick.js";
async function handleRevalidateFieldData() {
  const focusedElement = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  const hoveredElement = VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM;
  const elementCslp = focusedElement?.getAttribute("data-cslp");
  const elementCslpUniqueId = focusedElement?.getAttribute("data-cslp-unique-id") || null;
  const shouldRefocus = !!focusedElement;
  try {
    if (shouldRefocus) {
      await unfocusElement();
    }
    const targetElement = hoveredElement || focusedElement;
    if (targetElement) {
      const cslp = targetElement.getAttribute("data-cslp");
      if (cslp) {
        const fieldMetadata = extractDetailsFromCslp(cslp);
        FieldSchemaMap.clearContentTypeSchema(
          fieldMetadata.content_type_uid
        );
      }
    }
    FieldSchemaMap.clear();
  } catch (error) {
    console.error("Error handling revalidate field data:", error);
    window.location.reload();
  } finally {
    if (shouldRefocus && elementCslp) {
      await refocusElement(elementCslp, elementCslpUniqueId);
    }
  }
}
async function unfocusElement() {
  const { visualBuilderContainer, overlayWrapper, focusedToolbar } = getVisualBuilderElements();
  if (!visualBuilderContainer || !overlayWrapper) return;
  const dummyResizeObserver = new ResizeObserver(() => {
  });
  hideFocusOverlay({
    visualBuilderContainer,
    visualBuilderOverlayWrapper: overlayWrapper,
    focusedToolbar,
    resizeObserver: dummyResizeObserver,
    noTrigger: true
  });
  VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = null;
  VisualBuilder.VisualBuilderGlobalState.value.isFocussed = false;
}
async function refocusElement(cslp, uniqueId) {
  try {
    const elementToRefocus = uniqueId && document.querySelector(
      `[data-cslp-unique-id="${uniqueId}"]`
    ) || document.querySelector(`[data-cslp="${cslp}"]`);
    if (!elementToRefocus) return;
    const { visualBuilderContainer, overlayWrapper, focusedToolbar } = getVisualBuilderElements();
    if (!visualBuilderContainer || !overlayWrapper) return;
    const syntheticEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    });
    Object.defineProperty(syntheticEvent, "target", {
      value: elementToRefocus,
      enumerable: true
    });
    await handleBuilderInteraction({
      event: syntheticEvent,
      previousSelectedEditableDOM: null,
      visualBuilderContainer,
      overlayWrapper,
      focusedToolbar,
      resizeObserver: new ResizeObserver(() => {
      })
    });
  } catch (error) {
    console.warn("Could not refocus element after revalidation:", error);
  }
}
function getVisualBuilderElements() {
  return {
    visualBuilderContainer: document.querySelector(
      ".visual-builder__container"
    ),
    overlayWrapper: document.querySelector(
      ".visual-builder__overlay__wrapper"
    ),
    focusedToolbar: document.querySelector(
      ".visual-builder__focused-toolbar"
    )
  };
}
export {
  handleRevalidateFieldData
};
//# sourceMappingURL=useRevalidateFieldDataPostMessageEvent.js.map