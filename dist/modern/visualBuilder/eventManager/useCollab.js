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
  const config = Config.get();
  const collabEnable = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      if (!data?.data?.collab) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if (data?.data?.collab?.fromShare) {
        Config.set(
          "collab.pauseFeedback",
          data?.data?.collab?.pauseFeedback
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
        data?.data?.collab?.pauseFeedback
      );
      Config.set(
        "collab.inviteMetadata",
        data.data.collab.inviteMetadata
      );
    }
  );
  const collabPayload = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_DATA_UPDATE,
    (data) => {
      if (!config?.collab?.enable) return;
      if (!data?.data?.collab) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if (data?.data?.collab?.inviteMetadata) {
        Config.set(
          "collab.inviteMetadata",
          data?.data?.collab?.inviteMetadata
        );
        return;
      }
      const missingThreadIds = data?.data?.collab?.payload?.map((payload) => generateThread(payload)).filter((id) => id !== void 0) || [];
      if (missingThreadIds.length > 0) {
        handleMissingThreads({
          payload: { isElementPresent: false },
          threadUids: missingThreadIds
        });
      }
    }
  );
  const collabDisable = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_DISABLE,
    (data) => {
      if (data?.data?.collab?.fromShare) {
        Config.set(
          "collab.pauseFeedback",
          data?.data?.collab?.pauseFeedback
        );
        handleRemoveCommentIcons(true);
        return;
      }
      Config.set("collab.enable", false);
      Config.set("collab.isFeedbackMode", false);
      handleRemoveCommentIcons();
    }
  );
  const collabThreadRemove = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_THREADS_REMOVE,
    (data) => {
      const threadUids = data?.data?.threadUids;
      if (!config?.collab?.enable) return;
      if (data?.data?.updateConfig) {
        Config.set("collab.isFeedbackMode", true);
      }
      if (threadUids.length > 0) {
        threadUids.forEach((threadUid) => {
          removeCollabIcon(threadUid);
        });
      }
    }
  );
  const collabThreadReopen = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN,
    (data) => {
      const thread = data.data.thread;
      if (!config?.collab?.enable) return;
      const result = generateThread(thread, {
        hidden: Boolean(config?.collab?.pauseFeedback)
      });
      if (result) {
        handleMissingThreads({
          payload: { isElementPresent: false },
          threadUids: [result]
        });
      }
    }
  );
  const collabThreadHighlight = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      const { threadUid } = data.data;
      if (!config?.collab?.enable || config?.collab?.pauseFeedback)
        return;
      HighlightThread(threadUid);
    }
  );
  return () => {
    collabEnable?.unregister();
    collabPayload?.unregister();
    collabDisable?.unregister();
    collabThreadRemove?.unregister();
    collabThreadReopen?.unregister();
    collabThreadHighlight?.unregister();
  };
};
export {
  useCollab
};
//# sourceMappingURL=useCollab.js.map