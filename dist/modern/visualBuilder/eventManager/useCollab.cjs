"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/eventManager/useCollab.ts
var useCollab_exports = {};
__export(useCollab_exports, {
  useCollab: () => useCollab
});
module.exports = __toCommonJS(useCollab_exports);
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_generateThread = require("../generators/generateThread.cjs");
var import_generateThread2 = require("../generators/generateThread.cjs");
var handleRemoveCommentIcons = (fromShare = false) => {
  if (fromShare) {
    (0, import_generateThread.hideAllCollabIcons)();
    return;
  }
  (0, import_generateThread.removeAllCollabIcons)();
};
var useCollab = () => {
  const config = import_configManager.default.get();
  const collabEnable = import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      if (!data?.data?.collab) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if (data?.data?.collab?.fromShare) {
        import_configManager.default.set(
          "collab.pauseFeedback",
          data?.data?.collab?.pauseFeedback
        );
        (0, import_generateThread.showAllCollabIcons)();
        return;
      }
      import_configManager.default.set("collab.enable", data.data.collab.enable ?? false);
      import_configManager.default.set(
        "collab.isFeedbackMode",
        data.data.collab.isFeedbackMode ?? false
      );
      import_configManager.default.set(
        "collab.pauseFeedback",
        data?.data?.collab?.pauseFeedback
      );
      import_configManager.default.set(
        "collab.inviteMetadata",
        data.data.collab.inviteMetadata
      );
    }
  );
  const collabPayload = import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_DATA_UPDATE,
    (data) => {
      if (!config?.collab?.enable) return;
      if (!data?.data?.collab) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if (data?.data?.collab?.inviteMetadata) {
        import_configManager.default.set(
          "collab.inviteMetadata",
          data?.data?.collab?.inviteMetadata
        );
        return;
      }
      const missingThreadIds = data?.data?.collab?.payload?.map((payload) => (0, import_generateThread2.generateThread)(payload)).filter((id) => id !== void 0) || [];
      if (missingThreadIds.length > 0) {
        (0, import_generateThread2.handleMissingThreads)({
          payload: { isElementPresent: false },
          threadUids: missingThreadIds
        });
      }
    }
  );
  const collabDisable = import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_DISABLE,
    (data) => {
      if (data?.data?.collab?.fromShare) {
        import_configManager.default.set(
          "collab.pauseFeedback",
          data?.data?.collab?.pauseFeedback
        );
        handleRemoveCommentIcons(true);
        return;
      }
      import_configManager.default.set("collab.enable", false);
      import_configManager.default.set("collab.isFeedbackMode", false);
      handleRemoveCommentIcons();
    }
  );
  const collabThreadRemove = import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREADS_REMOVE,
    (data) => {
      const threadUids = data?.data?.threadUids;
      if (!config?.collab?.enable) return;
      if (data?.data?.updateConfig) {
        import_configManager.default.set("collab.isFeedbackMode", true);
      }
      if (threadUids.length > 0) {
        threadUids.forEach((threadUid) => {
          (0, import_generateThread.removeCollabIcon)(threadUid);
        });
      }
    }
  );
  const collabThreadReopen = import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN,
    (data) => {
      const thread = data.data.thread;
      if (!config?.collab?.enable) return;
      const result = (0, import_generateThread2.generateThread)(thread, {
        hidden: Boolean(config?.collab?.pauseFeedback)
      });
      if (result) {
        (0, import_generateThread2.handleMissingThreads)({
          payload: { isElementPresent: false },
          threadUids: [result]
        });
      }
    }
  );
  const collabThreadHighlight = import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      const { threadUid } = data.data;
      if (!config?.collab?.enable || config?.collab?.pauseFeedback)
        return;
      (0, import_generateThread.HighlightThread)(threadUid);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCollab
});
//# sourceMappingURL=useCollab.cjs.map