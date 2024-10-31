import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/listeners/keyboardShortcuts.ts
import { hideOverlay } from "../generators/generateOverlay.js";
function addKeyboardShortcuts({
  overlayWrapper,
  visualBuilderContainer,
  focusedToolbar,
  resizeObserver
}) {
  document.addEventListener("keydown", (e) => {
    const event = e;
    if (event.key === "Escape") {
      hideOverlay({
        visualBuilderOverlayWrapper: overlayWrapper,
        visualBuilderContainer,
        focusedToolbar,
        resizeObserver
      });
    }
  });
}
export {
  addKeyboardShortcuts
};
//# sourceMappingURL=keyboardShortcuts.js.map