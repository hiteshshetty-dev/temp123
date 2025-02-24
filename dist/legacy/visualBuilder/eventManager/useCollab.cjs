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
  var _a, _b, _c, _d, _e;
  const collabEnable = (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_ENABLE,
    (data) => {
      var _a2, _b2, _c2, _d2, _e2, _f, _g;
      if ((_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.collab) == null ? void 0 : _b2.fromShare) {
        import_configManager.default.set(
          "collab.pauseFeedback",
          (_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.collab) == null ? void 0 : _d2.pauseFeedback
        );
        (0, import_generateThread.showAllCollabIcons)();
        return;
      }
      if (!((_e2 = data == null ? void 0 : data.data) == null ? void 0 : _e2.collab)) {
        console.error("Invalid collab data structure:", data);
        return;
      }
      import_configManager.default.set("collab.enable", data.data.collab.enable ?? false);
      import_configManager.default.set(
        "collab.isFeedbackMode",
        data.data.collab.isFeedbackMode ?? false
      );
      import_configManager.default.set(
        "collab.inviteMetadata",
        data.data.collab.inviteMetadata
      );
      const missingThreadIds = (_g = (_f = data == null ? void 0 : data.data) == null ? void 0 : _f.payload) == null ? void 0 : _g.map(
        (payload) => (0, import_generateThread2.generateThread)(payload, { isNewThread: false })
      ).filter(Boolean);
      if (missingThreadIds.length > 0) {
        (0, import_generateThread2.handleMissingThreads)({
          payload: { isElementPresent: false },
          threadUids: missingThreadIds
        });
      }
    }
  );
  const collabDisable = (_b = import_visualBuilderPostMessage.default) == null ? void 0 : _b.on(
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
  const collabThreadRemove = (_c = import_visualBuilderPostMessage.default) == null ? void 0 : _c.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_REMOVE,
    (data) => {
      const { threadUid } = data.data;
      (0, import_generateThread.removeCollabIcon)(threadUid);
    }
  );
  const collabThreadReopen = (_d = import_visualBuilderPostMessage.default) == null ? void 0 : _d.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_REOPEN,
    (data) => {
      const thread = data.data.thread;
      const result = (0, import_generateThread2.generateThread)(thread, { isNewThread: false });
      if (result) {
        (0, import_generateThread2.handleMissingThreads)({
          payload: { isElementPresent: false },
          threadUids: [result]
        });
      }
    }
  );
  const collabThreadHighlight = (_e = import_visualBuilderPostMessage.default) == null ? void 0 : _e.on(
    import_postMessage.VisualBuilderPostMessageEvents.COLLAB_THREAD_HIGHLIGHT,
    (data) => {
      const { threadUid } = data.data;
      (0, import_generateThread.HighlightThread)(threadUid);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCollab
});
//# sourceMappingURL=useCollab.cjs.map