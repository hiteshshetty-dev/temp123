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
  const collabEnable = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      if (data?.data?.collab?.fromShare) {
        Config.set(
          "collab.pauseFeedback",
          data?.data?.collab?.pauseFeedback
        );
        showAllCollabIcons();
        return;
      }
      if (!data?.data?.collab) {
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
      const missingThreadIds = data?.data?.payload?.map(
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
    VisualBuilderPostMessageEvents.COLLAB_THREAD_REMOVE,
    (data) => {
      const { threadUid } = data.data;
      removeCollabIcon(threadUid);
    }
  );
  const collabThreadReopen = visualBuilderPostMessage?.on(
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
  const collabThreadHighlight = visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      const { threadUid } = data.data;
      HighlightThread(threadUid);
    }
  );
  return () => {
    collabEnable?.unregister();
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