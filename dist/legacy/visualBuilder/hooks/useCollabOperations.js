import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/hooks/useCollabOperations.ts
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { removeCollabIcon } from "../generators/generateThread.js";
import Config from "../../configManager/configManager.js";
import { normalizePath } from "../utils/collabUtils.js";
var useCollabOperations = () => {
  const createComment = async (payload) => {
    var _a;
    const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_CREATE_COMMENT,
      payload
    ));
    if (!data) throw new Error("Failed to create comment");
    return data;
  };
  const editComment = async (payload) => {
    var _a;
    const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_EDIT_COMMENT,
      payload
    ));
    if (!data) throw new Error("Failed to update comment");
    return data;
  };
  const deleteComment = async (payload) => {
    var _a;
    const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_DELETE_COMMENT,
      payload
    ));
    if (!data) throw new Error("Failed to delete comment");
    return data;
  };
  const resolveThread = async (payload) => {
    var _a;
    const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_RESOLVE_THREAD,
      payload
    ));
    if (!data) throw new Error("Failed to resolve thread");
    return data;
  };
  const fetchComments = async (payload) => {
    var _a;
    return await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_FETCH_COMMENTS,
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
      pageRoute: normalizePath(window.location.pathname),
      inviteUid: inviteMetadata.inviteUid,
      createdBy: inviteMetadata.currentUser.uid
    };
    const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_CREATE_THREAD,
      payload
    ));
    parentDiv.setAttribute("threaduid", data.thread._id);
    return data;
  };
  const deleteThread = async (payload) => {
    var _a, _b;
    const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.COLLAB_DELETE_THREAD,
      payload
    ));
    if (!data) throw new Error("Failed to delete thread");
    removeCollabIcon(payload.threadUid);
    const config = Config.get();
    if (((_b = config == null ? void 0 : config.collab) == null ? void 0 : _b.isFeedbackMode) === false) {
      Config.set("collab.isFeedbackMode", true);
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
export {
  useCollabOperations
};
//# sourceMappingURL=useCollabOperations.js.map