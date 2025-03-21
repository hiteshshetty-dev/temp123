import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useHideFocusOverlayPostMessageEvent.ts
import { hideOverlay } from "../generators/generateOverlay.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
function useHideFocusOverlayPostMessageEvent({
  visualBuilderContainer,
  overlayWrapper,
  focusedToolbar,
  resizeObserver
}) {
  var _a;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
    VisualBuilderPostMessageEvents.HIDE_FOCUS_OVERLAY,
    (args) => {
      var _a2;
      hideOverlay({
        visualBuilderOverlayWrapper: overlayWrapper,
        visualBuilderContainer,
        focusedToolbar,
        resizeObserver,
        noTrigger: Boolean((_a2 = args == null ? void 0 : args.data) == null ? void 0 : _a2.noTrigger)
      });
    }
  );
}
export {
  useHideFocusOverlayPostMessageEvent
};
//# sourceMappingURL=useHideFocusOverlayPostMessageEvent.js.map