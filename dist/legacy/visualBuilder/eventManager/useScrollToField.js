import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useScrollToField.ts
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
var handleScrollToField = (event) => {
  const { content_type_uid, entry_uid, locale, path } = event.data.cslpData;
  const cslpValue = `${content_type_uid}.${entry_uid}.${locale}.${path}`;
  const element = document.querySelector(`[data-cslp="${cslpValue}"]`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
var useScrollToField = () => {
  var _a;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
    VisualBuilderPostMessageEvents.SCROLL_TO_FIELD,
    handleScrollToField
  );
};
export {
  useScrollToField
};
//# sourceMappingURL=useScrollToField.js.map