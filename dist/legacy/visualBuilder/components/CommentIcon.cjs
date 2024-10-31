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

// src/visualBuilder/components/CommentIcon.tsx
var CommentIcon_exports = {};
__export(CommentIcon_exports, {
  default: () => CommentIcon
});
module.exports = __toCommonJS(CommentIcon_exports);
var import_compat = require("preact/compat");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_icons = require("./icons/index.cjs");
var import_getDiscussionIdByFieldMetaData = require("../utils/getDiscussionIdByFieldMetaData.cjs");
var import_loading = require("./icons/loading.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function CommentIcon(props) {
  const { fieldMetadata, fieldSchema, invertTooltipPosition = false } = props;
  const [activeDiscussion, setActiveDiscussion] = (0, import_compat.useState)(null);
  const [isLoading, setIsLoading] = (0, import_compat.useState)(false);
  (0, import_compat.useEffect)(() => {
    const fetchDiscussionId = async () => {
      try {
        setIsLoading(true);
        const discussion = await (0, import_getDiscussionIdByFieldMetaData.getDiscussionIdByFieldMetaData)({
          fieldMetadata,
          fieldSchema
        });
        setActiveDiscussion(discussion);
      } catch (error) {
        console.error("Failed to fetch discussion ID:", error);
        setActiveDiscussion({ uid: "new" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscussionId();
  }, [fieldMetadata]);
  (0, import_compat.useEffect)(() => {
    var _a;
    const handleReceiveDiscussionId = (response) => {
      const { entryId, discussion, contentTypeId, fieldPath } = response.data;
      if (fieldMetadata.entry_uid === entryId && fieldMetadata.content_type_uid === contentTypeId && fieldMetadata.fieldPathWithIndex === fieldPath) {
        setActiveDiscussion(discussion ?? { uid: "new" });
      }
    };
    const recieveDiscussionIDEvent = (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.on(
      import_postMessage.VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID,
      handleReceiveDiscussionId
    );
    return () => {
      recieveDiscussionIDEvent == null ? void 0 : recieveDiscussionIDEvent.unregister();
    };
  }, []);
  const handleCommentModal = async () => {
    var _a;
    (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL,
      {
        fieldMetadata,
        discussion: activeDiscussion,
        fieldSchema
      }
    );
  };
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__comment-button-loading",
        className: (0, import_classnames.default)(
          "visual-builder__button visual-builder__button--secondary visual-builder__button--comment-loader",
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--comment-loader"]
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_loading.LoadingIcon, {})
      }
    );
  }
  if (!(activeDiscussion == null ? void 0 : activeDiscussion.uid)) {
    return;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__comment-button",
      className: (0, import_classnames.default)(
        "visual-builder__button visual-builder__button--secondary",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Add comment",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCommentModal();
      },
      children: (activeDiscussion == null ? void 0 : activeDiscussion.uid) === "new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.AddCommentIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.ReadCommentIcon, {})
    }
  );
}
//# sourceMappingURL=CommentIcon.cjs.map