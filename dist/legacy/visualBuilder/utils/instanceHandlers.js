import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/instanceHandlers.ts
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./../utils/types/postMessage.types.js";
function handleDeleteInstance(fieldMetadata) {
  var _a;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.DELETE_INSTANCE, {
    data: fieldMetadata.fieldPathWithIndex + "." + fieldMetadata.multipleFieldMetadata.index,
    fieldMetadata
  }).finally(closeOverlay);
}
function handleMoveInstance(fieldMetadata, direction) {
  var _a;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.MOVE_INSTANCE, {
    data: fieldMetadata.fieldPathWithIndex + "." + fieldMetadata.multipleFieldMetadata.index,
    direction,
    fieldMetadata
  }).finally(closeOverlay);
}
function closeOverlay() {
  var _a;
  (_a = document.querySelector(".visual-builder__overlay--top")) == null ? void 0 : _a.click();
}
export {
  handleDeleteInstance,
  handleMoveInstance
};
//# sourceMappingURL=instanceHandlers.js.map