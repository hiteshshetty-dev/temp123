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
  var _a, _b, _c, _d, _e, _f;
  const config = Config.get();
  const collabEnable = (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
    VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
      if (!((_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.collab)) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if ((_c2 = (_b2 = data == null ? void 0 : data.data) == null ? void 0 : _b2.collab) == null ? void 0 : _c2.fromShare) {
        Config.set(
          "collab.pauseFeedback",
          (_e2 = (_d2 = data == null ? void 0 : data.data) == null ? void 0 : _d2.collab) == null ? void 0 : _e2.pauseFeedback
        );
        Config.set(
          "collab.isFeedbackMode",
          (_g = (_f2 = data == null ? void 0 : data.data) == null ? void 0 : _f2.collab) == null ? void 0 : _g.isFeedbackMode
        );
        showAllCollabIcons();
        return;
      }
      Config.set("collab.enable", data.data.collab.enable ?? false);
      Config.set(
        "collab.isFeedbackMode",
        data.data.collab.isFeedbackMode ?? false
      );
      Config.set(
        "collab.pauseFeedback",
        (_i = (_h = data == null ? void 0 : data.data) == null ? void 0 : _h.collab) == null ? void 0 : _i.pauseFeedback
      );
      Config.set(
        "collab.inviteMetadata",
        data.data.collab.inviteMetadata
      );
    }
  );
  const collabPayload = (_b = visualBuilderPostMessage) == null ? void 0 : _b.on(
    VisualBuilderPostMessageEvents.COLLAB_DATA_UPDATE,
    (data) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
      if (!((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.enable)) return;
      if (!((_b2 = data == null ? void 0 : data.data) == null ? void 0 : _b2.collab)) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if ((_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.collab) == null ? void 0 : _d2.inviteMetadata) {
        Config.set(
          "collab.inviteMetadata",
          (_f2 = (_e2 = data == null ? void 0 : data.data) == null ? void 0 : _e2.collab) == null ? void 0 : _f2.inviteMetadata
        );
        return;
      }
      const missingThreadIds = ((_i = (_h = (_g = data == null ? void 0 : data.data) == null ? void 0 : _g.collab) == null ? void 0 : _h.payload) == null ? void 0 : _i.map((payload) => generateThread(payload)).filter((id) => id !== void 0)) || [];
      if (missingThreadIds.length > 0) {
        handleMissingThreads({
          payload: { isElementPresent: false },
          threadUids: missingThreadIds
        });
      }
    }
  );
  const collabDisable = (_c = visualBuilderPostMessage) == null ? void 0 : _c.on(
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
  const collabThreadRemove = (_d = visualBuilderPostMessage) == null ? void 0 : _d.on(
    VisualBuilderPostMessageEvents.COLLAB_THREADS_REMOVE,
    (data) => {
      var _a2, _b2, _c2;
      const threadUids = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.threadUids;
      if (!((_b2 = config == null ? void 0 : config.collab) == null ? void 0 : _b2.enable)) return;
      if ((_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.updateConfig) {
        Config.set("collab.isFeedbackMode", true);
      }
      if (threadUids.length > 0) {
        threadUids.forEach((threadUid) => {
          removeCollabIcon(threadUid);
        });
      }
    }
  );
  const collabThreadReopen = (_e = visualBuilderPostMessage) == null ? void 0 : _e.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN,
    (data) => {
      var _a2, _b2;
      const thread = data.data.thread;
      if (!((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.enable)) return;
      const result = generateThread(thread, {
        hidden: Boolean((_b2 = config == null ? void 0 : config.collab) == null ? void 0 : _b2.pauseFeedback)
      });
      if (result) {
        handleMissingThreads({
          payload: { isElementPresent: false },
          threadUids: [result]
        });
      }
    }
  );
  const collabThreadHighlight = (_f = visualBuilderPostMessage) == null ? void 0 : _f.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      var _a2, _b2;
      const { threadUid } = data.data;
      if (!((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.enable) || ((_b2 = config == null ? void 0 : config.collab) == null ? void 0 : _b2.pauseFeedback))
        return;
      HighlightThread(threadUid);
    }
  );
  return () => {
    collabEnable == null ? void 0 : collabEnable.unregister();
    collabPayload == null ? void 0 : collabPayload.unregister();
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