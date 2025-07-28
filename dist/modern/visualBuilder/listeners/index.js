import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/listeners/index.ts
import { VisualBuilder } from "../index.js";
import handleBuilderInteraction from "./mouseClick.js";
import handleMouseHover, {
  hideCustomCursor,
  hideHoverOutline,
  showCustomCursor
} from "./mouseHover.js";
var eventHandlers = {
  click: (params) => (event) => {
    handleBuilderInteraction({
      event,
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      previousSelectedEditableDOM: VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
      focusedToolbar: params.focusedToolbar,
      resizeObserver: params.resizeObserver
    });
  },
  mousemove: (params) => (event) => {
    handleMouseHover({
      event,
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      customCursor: params.customCursor
    });
  },
  mouseleave: (params) => () => {
    hideCustomCursor(params.customCursor);
    hideHoverOutline(params.visualBuilderContainer);
  },
  mouseenter: (params) => () => {
    showCustomCursor(params.customCursor);
  }
};
var eventListenersMap = /* @__PURE__ */ new Map();
function addEventListeners(params) {
  const clickHandler = eventHandlers.click(params);
  const mousemoveHandler = eventHandlers.mousemove(params);
  const mouseleaveHandler = eventHandlers.mouseleave(params);
  const mouseenterHandler = eventHandlers.mouseenter(params);
  eventListenersMap.set("click", clickHandler);
  eventListenersMap.set("mousemove", mousemoveHandler);
  eventListenersMap.set("mouseleave", mouseleaveHandler);
  eventListenersMap.set("mouseenter", mouseenterHandler);
  window.addEventListener("click", clickHandler, { capture: true });
  window.addEventListener("mousemove", mousemoveHandler);
  document.documentElement.addEventListener("mouseleave", mouseleaveHandler);
  document.documentElement.addEventListener("mouseenter", mouseenterHandler);
}
function removeEventListeners(params) {
  const clickHandler = eventListenersMap.get("click");
  const mousemoveHandler = eventListenersMap.get("mousemove");
  const mouseleaveHandler = eventListenersMap.get("mouseleave");
  const mouseenterHandler = eventListenersMap.get("mouseenter");
  if (clickHandler) {
    window.removeEventListener("click", clickHandler, { capture: true });
  }
  if (mousemoveHandler) {
    window.removeEventListener("mousemove", mousemoveHandler);
  }
  if (mouseleaveHandler) {
    document.documentElement.removeEventListener(
      "mouseleave",
      mouseleaveHandler
    );
  }
  if (mouseenterHandler) {
    document.documentElement.removeEventListener(
      "mouseenter",
      mouseenterHandler
    );
  }
  eventListenersMap.clear();
}
export {
  addEventListeners,
  removeEventListeners
};
//# sourceMappingURL=index.js.map