import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useCollab.ts
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import Config from "../../configManager/configManager.js";
import {
  removeAllCollabIcons,
  hideAllCollabIcons,
  removeCollabIcon,
  HighlightThread,
  showAllCollabIcons
} from "../generators/generateThread.js";
import {
  generateThread,
  handleMissingThreads
} from "../generators/generateThread.js";
var handleRemoveCommentIcons = (fromShare = false) => {
  if (fromShare) {
    hideAllCollabIcons();
    return;
  }
  removeAllCollabIcons();
};
var useCollab = () => {
  var _a, _b, _c, _d, _e;
  const collabEnable = (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
    VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      var _a2, _b2, _c2, _d2, _e2, _f, _g;
      if ((_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.collab) == null ? void 0 : _b2.fromShare) {
        Config.set(
          "collab.pauseFeedback",
          (_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.collab) == null ? void 0 : _d2.pauseFeedback
        );
        showAllCollabIcons();
        return;
      }
      if (!((_e2 = data == null ? void 0 : data.data) == null ? void 0 : _e2.collab)) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      Config.set("collab.enable", data.data.collab.enable ?? false);
      Config.set(
        "collab.isFeedbackMode",
        data.data.collab.isFeedbackMode ?? false
      );
      Config.set(
        "collab.inviteMetadata",
        data.data.collab.inviteMetadata
      );
      const missingThreadIds = (_g = (_f = data == null ? void 0 : data.data) == null ? void 0 : _f.payload) == null ? void 0 : _g.map(
        (payload) => generateThread(payload, { isNewThread: false })
      ).filter(Boolean);
      if (missingThreadIds.length > 0) {
        handleMissingThreads({
          payload: { isElementPresent: false },
          threadUids: missingThreadIds
        });
      }
    }
  );
  const collabDisable = (_b = visualBuilderPostMessage) == null ? void 0 : _b.on(
    VisualBuilderPostMessageEvents.COLLAB_DISABLE,
    (data) => {
      var _a2, _b2, _c2, _d2;
      if ((_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.collab) == null ? void 0 : _b2.fromShare) {
        Config.set(
          "collab.pauseFeedback",
          (_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.collab) == null ? void 0 : _d2.pauseFeedback
        );
        handleRemoveCommentIcons(true);
        return;
      }
      Config.set("collab.enable", false);
      Config.set("collab.isFeedbackMode", false);
      handleRemoveCommentIcons();
    }
  );
  const collabThreadRemove = (_c = visualBuilderPostMessage) == null ? void 0 : _c.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_REMOVE,
    (data) => {
      const { threadUid } = data.data;
      removeCollabIcon(threadUid);
    }
  );
  const collabThreadReopen = (_d = visualBuilderPostMessage) == null ? void 0 : _d.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN,
    (data) => {
      const thread = data.data.thread;
      const result = generateThread(thread, { isNewThread: false });
      if (result) {
        handleMissingThreads({
          payload: { isElementPresent: false },
          threadUids: [result]
        });
      }
    }
  );
  const collabThreadHighlight = (_e = visualBuilderPostMessage) == null ? void 0 : _e.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      const { threadUid } = data.data;
      HighlightThread(threadUid);
    }
  );
  return () => {
    collabEnable == null ? void 0 : collabEnable.unregister();
    collabDisable == null ? void 0 : collabDisable.unregister();
    collabThreadRemove == null ? void 0 : collabThreadRemove.unregister();
    collabThreadReopen == null ? void 0 : collabThreadReopen.unregister();
    collabThreadHighlight == null ? void 0 : collabThreadHighlight.unregister();
  };
};
export {
  useCollab
};
//# sourceMappingURL=useCollab.js.map