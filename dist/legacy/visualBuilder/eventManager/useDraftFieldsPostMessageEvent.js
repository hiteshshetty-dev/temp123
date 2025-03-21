import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useDraftFieldsPostMessageEvent.ts
import { visualBuilderStyles } from "../visualBuilder.style.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
function removeDraftFieldClass() {
  const draftFieldElements = document.querySelectorAll(
    `.${visualBuilderStyles()["visual-builder__draft-field"]}`
  );
  draftFieldElements.forEach((element) => {
    element.classList.remove(
      visualBuilderStyles()["visual-builder__draft-field"]
    );
  });
}
function addDraftFieldClass(fields) {
  fields.forEach((field) => {
    const element = document.querySelector(`[data-cslp="${field}"]`);
    if (element) {
      element.classList.add(
        visualBuilderStyles()["visual-builder__draft-field"]
      );
    }
  });
}
function useDraftFieldsPostMessageEvent() {
  var _a, _b;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
    VisualBuilderPostMessageEvents.SHOW_DRAFT_FIELDS,
    (event) => {
      removeDraftFieldClass();
      addDraftFieldClass(event.data.fields);
    }
  );
  (_b = visualBuilderPostMessage) == null ? void 0 : _b.on(
    VisualBuilderPostMessageEvents.REMOVE_DRAFT_FIELDS,
    () => {
      removeDraftFieldClass();
    }
  );
}
export {
  useDraftFieldsPostMessageEvent
};
//# sourceMappingURL=useDraftFieldsPostMessageEvent.js.map