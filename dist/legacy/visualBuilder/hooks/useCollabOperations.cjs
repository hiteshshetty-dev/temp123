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

// src/visualBuilder/hooks/useCollabOperations.ts
var useCollabOperations_exports = {};
__export(useCollabOperations_exports, {
  useCollabOperations: () => useCollabOperations
});
module.exports = __toCommonJS(useCollabOperations_exports);
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_generateThread = require("../generators/generateThread.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_collabUtils = require("../utils/collabUtils.cjs");
var useCollabOperations = () => {
  const createComment = async (payload) => {
    var _a;
    const data = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_CREATE_COMMENT,
      payload
    ));
    if (!data) throw new Error("Failed to create comment");
    return data;
  };
  const editComment = async (payload) => {
    var _a;
    const data = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_EDIT_COMMENT,
      payload
    ));
    if (!data) throw new Error("Failed to update comment");
    return data;
  };
  const deleteComment = async (payload) => {
    var _a;
    const data = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_DELETE_COMMENT,
      payload
    ));
    if (!data) throw new Error("Failed to delete comment");
    return data;
  };
  const resolveThread = async (payload) => {
    var _a;
    const data = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_RESOLVE_THREAD,
      payload
    ));
    if (!data) throw new Error("Failed to resolve thread");
    return data;
  };
  const fetchComments = async (payload) => {
    var _a;
    return await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_FETCH_COMMENTS,
      payload
    ));
  };
  const createNewThread = async (buttonRef, inviteMetadata) => {
    var _a;
    if (!buttonRef.current) {
      throw new Error("Button ref not found");
    }
    const parentDiv = buttonRef.current.closest("div[field-path]");
    if (!parentDiv) {
      throw new Error("Count not find parent div");
    }
    const fieldPath = parentDiv.getAttribute("field-path");
    const relative = parentDiv.getAttribute("relative");
    if (!fieldPath || !relative)
      throw new Error("Invalid field attributes");
    const match = relative == null ? void 0 : relative.match(/x: ([\d.]+), y: ([\d.]+)/);
    if (!match) {
      throw new Error("Invalid relative attribute");
    }
    const relativeX = parseFloat(match[1]);
    const relativeY = parseFloat(match[2]);
    const payload = {
      elementXPath: fieldPath,
      position: { x: relativeX, y: relativeY },
      author: inviteMetadata.currentUser.email,
      pageRoute: (0, import_collabUtils.normalizePath)(window.location.pathname),
      inviteUid: inviteMetadata.inviteUid,
      createdBy: inviteMetadata.currentUser.uid
    };
    const data = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_CREATE_THREAD,
      payload
    ));
    parentDiv.setAttribute("threaduid", data.thread._id);
    return data;
  };
  const deleteThread = async (payload) => {
    var _a, _b;
    const data = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.COLLAB_DELETE_THREAD,
      payload
    ));
    if (!data) throw new Error("Failed to delete thread");
    (0, import_generateThread.removeCollabIcon)(payload.threadUid);
    const config = import_configManager.default.get();
    if (((_b = config == null ? void 0 : config.collab) == null ? void 0 : _b.isFeedbackMode) === false) {
      import_configManager.default.set("collab.isFeedbackMode", true);
    }
    return data;
  };
  return {
    createComment,
    editComment,
    deleteComment,
    resolveThread,
    fetchComments,
    createNewThread,
    deleteThread
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCollabOperations
});
//# sourceMappingURL=useCollabOperations.cjs.map