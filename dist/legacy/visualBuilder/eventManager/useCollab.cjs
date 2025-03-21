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
  var _a, _b, _c, _d, _e, _f;
  const config = import_configManager.default.get();
  const collabEnable = (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g;
      if (!((_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.collab)) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if ((_c2 = (_b2 = data == null ? void 0 : data.data) == null ? void 0 : _b2.collab) == null ? void 0 : _c2.fromShare) {
        import_configManager.default.set(
          "collab.pauseFeedback",
          (_e2 = (_d2 = data == null ? void 0 : data.data) == null ? void 0 : _d2.collab) == null ? void 0 : _e2.pauseFeedback
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
        (_g = (_f2 = data == null ? void 0 : data.data) == null ? void 0 : _f2.collab) == null ? void 0 : _g.pauseFeedback
      );
      import_configManager.default.set(
        "collab.inviteMetadata",
        data.data.collab.inviteMetadata
      );
    }
  );
  const collabPayload = (_b = import_visualBuilderPostMessage.default) == null ? void 0 : _b.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_DATA_UPDATE,
    (data) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
      if (!((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.enable)) return;
      if (!((_b2 = data == null ? void 0 : data.data) == null ? void 0 : _b2.collab)) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      if ((_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.collab) == null ? void 0 : _d2.inviteMetadata) {
        import_configManager.default.set(
          "collab.inviteMetadata",
          (_f2 = (_e2 = data == null ? void 0 : data.data) == null ? void 0 : _e2.collab) == null ? void 0 : _f2.inviteMetadata
        );
        return;
      }
      const missingThreadIds = ((_i = (_h = (_g = data == null ? void 0 : data.data) == null ? void 0 : _g.collab) == null ? void 0 : _h.payload) == null ? void 0 : _i.map((payload) => (0, import_generateThread2.generateThread)(payload)).filter((id) => id !== void 0)) || [];
      if (missingThreadIds.length > 0) {
        (0, import_generateThread2.handleMissingThreads)({
          payload: { isElementPresent: false },
          threadUids: missingThreadIds
        });
      }
    }
  );
  const collabDisable = (_c = import_visualBuilderPostMessage.default) == null ? void 0 : _c.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_DISABLE,
    (data) => {
      var _a2, _b2, _c2, _d2;
      if ((_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.collab) == null ? void 0 : _b2.fromShare) {
        import_configManager.default.set(
          "collab.pauseFeedback",
          (_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.collab) == null ? void 0 : _d2.pauseFeedback
        );
        handleRemoveCommentIcons(true);
        return;
      }
      import_configManager.default.set("collab.enable", false);
      import_configManager.default.set("collab.isFeedbackMode", false);
      handleRemoveCommentIcons();
    }
  );
  const collabThreadRemove = (_d = import_visualBuilderPostMessage.default) == null ? void 0 : _d.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREADS_REMOVE,
    (data) => {
      var _a2, _b2, _c2;
      const threadUids = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.threadUids;
      if (!((_b2 = config == null ? void 0 : config.collab) == null ? void 0 : _b2.enable)) return;
      if ((_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.updateConfig) {
        import_configManager.default.set("collab.isFeedbackMode", true);
      }
      if (threadUids.length > 0) {
        threadUids.forEach((threadUid) => {
          (0, import_generateThread.removeCollabIcon)(threadUid);
        });
      }
    }
  );
  const collabThreadReopen = (_e = import_visualBuilderPostMessage.default) == null ? void 0 : _e.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN,
    (data) => {
      var _a2, _b2;
      const thread = data.data.thread;
      if (!((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.enable)) return;
      const result = (0, import_generateThread2.generateThread)(thread, {
        hidden: Boolean((_b2 = config == null ? void 0 : config.collab) == null ? void 0 : _b2.pauseFeedback)
      });
      if (result) {
        (0, import_generateThread2.handleMissingThreads)({
          payload: { isElementPresent: false },
          threadUids: [result]
        });
      }
    }
  );
  const collabThreadHighlight = (_f = import_visualBuilderPostMessage.default) == null ? void 0 : _f.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      var _a2, _b2;
      const { threadUid } = data.data;
      if (!((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.enable) || ((_b2 = config == null ? void 0 : config.collab) == null ? void 0 : _b2.pauseFeedback))
        return;
      (0, import_generateThread.HighlightThread)(threadUid);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCollab
});
//# sourceMappingURL=useCollab.cjs.map