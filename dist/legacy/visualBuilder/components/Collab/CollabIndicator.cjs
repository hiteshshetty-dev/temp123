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

// src/visualBuilder/components/Collab/CollabIndicator.tsx
var CollabIndicator_exports = {};
__export(CollabIndicator_exports, {
  default: () => CollabIndicator_default
});
module.exports = __toCommonJS(CollabIndicator_exports);
var import_collab = require("../../collab.style.cjs");
var import_hooks = require("preact/hooks");
var import_classnames = __toESM(require("classnames"), 1);
var import_ThreadPopup = __toESM(require("./ThreadPopup/index.cjs"), 1);
var import_configManager = __toESM(require("../../../configManager/configManager.cjs"), 1);
var import_useCollabIndicator = require("../../hooks/useCollabIndicator.cjs");
var import_useCollabOperations = require("../../hooks/useCollabOperations.cjs");
var import_generateThread = require("../../generators/generateThread.cjs");
var import_CollabIcons = require("../icons/CollabIcons.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var CollabIndicator = (props) => {
  var _a, _b;
  const config = import_configManager.default.get();
  const [inviteMetadata, setInviteMetadata] = (0, import_hooks.useState)(
    (_a = config == null ? void 0 : config.collab) == null ? void 0 : _a.inviteMetadata
  );
  (0, import_hooks.useEffect)(() => {
    var _a2;
    setInviteMetadata((_a2 = config == null ? void 0 : config.collab) == null ? void 0 : _a2.inviteMetadata);
  }, [(_b = config == null ? void 0 : config.collab) == null ? void 0 : _b.inviteMetadata]);
  const {
    buttonRef,
    popupRef,
    showPopup,
    setShowPopup,
    activeThread,
    setActiveThread,
    togglePopup
  } = (0, import_useCollabIndicator.useCollabIndicator)({
    newThread: props.newThread ?? false,
    thread: props.activeThread || { _id: "new" }
  });
  const {
    createComment,
    editComment,
    deleteComment,
    resolveThread,
    fetchComments,
    createNewThread,
    deleteThread
  } = (0, import_useCollabOperations.useCollabOperations)();
  const handleClose = (isResolved = false) => {
    var _a2, _b2, _c;
    if (isResolved) {
      (_b2 = (_a2 = buttonRef.current) == null ? void 0 : _a2.closest("div[field-path]")) == null ? void 0 : _b2.remove();
    }
    (0, import_generateThread.handleEmptyThreads)();
    setShowPopup(false);
    if (((_c = config == null ? void 0 : config.collab) == null ? void 0 : _c.isFeedbackMode) === false) {
      import_configManager.default.set("collab.isFeedbackMode", true);
    }
  };
  const IconComponent = import_CollabIcons.iconComponents["Indicator"];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref: buttonRef,
        "data-testid": "collab-indicator",
        className: (0, import_classnames.default)(
          "collab-indicator",
          (0, import_collab.collabStyles)()["collab-indicator"]
        ),
        onClick: togglePopup,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { active: !showPopup })
      }
    ),
    showPopup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: popupRef,
        className: (0, import_classnames.default)(
          "collab-popup",
          (0, import_collab.collabStyles)()["collab-popup"]
        ),
        "data-testid": "collab-popup",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ThreadPopup.default,
          {
            onCreateComment: createComment,
            onEditComment: editComment,
            onDeleteComment: deleteComment,
            onClose: handleClose,
            onResolve: resolveThread,
            inviteMetadata,
            loadMoreMessages: fetchComments,
            activeThread,
            setActiveThread,
            onDeleteThread: deleteThread,
            createNewThread: () => createNewThread(buttonRef, inviteMetadata)
          }
        )
      }
    )
  ] });
};
var CollabIndicator_default = CollabIndicator;
//# sourceMappingURL=CollabIndicator.cjs.map