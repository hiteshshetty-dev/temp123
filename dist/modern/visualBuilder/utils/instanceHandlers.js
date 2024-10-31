import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/instanceHandlers.ts
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./../utils/types/postMessage.types.js";
function handleDeleteInstance(fieldMetadata) {
  visualBuilderPostMessage?.send(VisualBuilderPostMessageEvents.DELETE_INSTANCE, {
    data: fieldMetadata.fieldPathWithIndex + "." + fieldMetadata.multipleFieldMetadata.index,
    fieldMetadata
  }).finally(closeOverlay);
}
function handleMoveInstance(fieldMetadata, direction) {
  visualBuilderPostMessage?.send(VisualBuilderPostMessageEvents.MOVE_INSTANCE, {
    data: fieldMetadata.fieldPathWithIndex + "." + fieldMetadata.multipleFieldMetadata.index,
    direction,
    fieldMetadata
  }).finally(closeOverlay);
}
function closeOverlay() {
  document.querySelector(".visual-builder__overlay--top")?.click();
}
export {
  handleDeleteInstance,
  handleMoveInstance
};
//# sourceMappingURL=instanceHandlers.js.map