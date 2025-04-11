import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useHideFocusOverlayPostMessageEvent.ts
import { hideOverlay } from "../generators/generateOverlay.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import Config from "../../configManager/configManager.js";
function useHideFocusOverlayPostMessageEvent({
  visualBuilderContainer,
  overlayWrapper,
  focusedToolbar,
  resizeObserver
}) {
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.HIDE_FOCUS_OVERLAY,
    (args) => {
      if (Boolean(args?.data?.fromCollab)) {
        Config.set("collab.enable", true);
        Config.set("collab.pauseFeedback", true);
      }
      hideOverlay({
        visualBuilderOverlayWrapper: overlayWrapper,
        visualBuilderContainer,
        focusedToolbar,
        resizeObserver,
        noTrigger: Boolean(args?.data?.noTrigger)
      });
    }
  );
}
export {
  useHideFocusOverlayPostMessageEvent
};
//# sourceMappingURL=useHideFocusOverlayPostMessageEvent.js.map