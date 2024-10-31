import "../chunk-5WRI5ZAA.js";

// src/livePreview/onPageTraversal.ts
import livePreviewPostMessage from "./eventManager/livePreviewEventManager.js";
import { LIVE_PREVIEW_POST_MESSAGE_EVENTS } from "./eventManager/livePreviewEventManager.constant.js";
function handlePageTraversal() {
  window.addEventListener("unload", () => {
    var _a;
    const targetURL = document.activeElement.href;
    if (targetURL) {
      (_a = livePreviewPostMessage) == null ? void 0 : _a.send(
        LIVE_PREVIEW_POST_MESSAGE_EVENTS.URL_CHANGE,
        {
          targetURL
        }
      );
    }
  });
}
export {
  handlePageTraversal
};
//# sourceMappingURL=onPageTraversal.js.map