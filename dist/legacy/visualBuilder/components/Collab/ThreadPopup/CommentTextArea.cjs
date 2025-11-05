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

// src/visualBuilder/components/Collab/ThreadPopup/CommentTextArea.tsx
var CommentTextArea_exports = {};
__export(CommentTextArea_exports, {
  default: () => CommentTextArea_default
});
module.exports = __toCommonJS(CommentTextArea_exports);
var import_compat = __toESM(require("preact/compat"), 1);
var import_hooks = require("preact/hooks");
var import_useCommentTextArea = require("../../../hooks/useCommentTextArea.cjs");
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_Tooltip = __toESM(require("../Tooltip/Tooltip.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var ErrorIndicator = ({
  errorMessage
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    className: (0, import_classnames.default)(
      "collab-thread-input-indicator--error",
      (0, import_collab.collabStyles)()["collab-thread-input-indicator--error"]
    ),
    children: errorMessage
  }
);
var CharacterCounter = ({ currentLength, maxLength }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "div",
  {
    className: (0, import_classnames.default)(
      "collab-thread-input-indicator--count",
      (0, import_collab.collabStyles)()["collab-thread-input-indicator--count"]
    ),
    children: [
      currentLength,
      "/",
      maxLength
    ]
  }
);
var MentionSuggestionsList = ({
  filteredUsers,
  selectedIndex,
  cursorPosition,
  inputRef,
  listRef,
  itemRefs,
  insertMention,
  handleKeyDown
}) => {
  var _a, _b;
  if (filteredUsers.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "ul",
    {
      className: (0, import_classnames.default)(
        "collab-thread-body--input--textarea--suggestionsList",
        (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--suggestionsList"]
      ),
      style: {
        ...cursorPosition.showAbove ? {
          bottom: `${window.innerHeight - (((_a = inputRef.current) == null ? void 0 : _a.getBoundingClientRect().top) || 0) - cursorPosition.top}px`,
          top: "auto"
        } : {
          top: `${(((_b = inputRef.current) == null ? void 0 : _b.getBoundingClientRect().top) || 0) + cursorPosition.top}px`
        }
      },
      ref: listRef,
      children: filteredUsers.map((user, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "li",
        {
          onClick: () => insertMention(user),
          className: (0, import_classnames.default)(
            "collab-thread-body--input--textarea--suggestionsList--item",
            (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--suggestionsList--item"],
            index === selectedIndex ? (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--suggestionsList--item-selected"] : ""
          ),
          ref: (el) => {
            itemRefs.current[index] = el;
          },
          onKeyDown: (e) => e.key === "Enter" ? insertMention(user) : handleKeyDown(e),
          tabIndex: -1,
          "aria-selected": index === selectedIndex,
          children: user.display === user.email ? user.display.length > 20 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Tooltip.default, { content: user.display || "", children: (user.display || "").substring(0, 18) + "..." }) : user.display : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_Tooltip.default,
            {
              content: user.display + " - " + user.email || "",
              children: user.display.length > 20 ? (user.display || "").substring(0, 18) + "..." : user.display
            }
          )
        },
        user.uid
      ))
    }
  );
};
var CommentTextArea = import_compat.default.memo(
  ({ userState, handleOnSaveRef, comment, onClose }) => {
    const {
      state,
      error,
      showSuggestions,
      cursorPosition,
      selectedIndex,
      filteredUsers,
      inputRef,
      listRef,
      itemRefs,
      handleInputChange,
      handleKeyDown,
      handleSubmit,
      insertMention,
      maxMessageLength
    } = (0, import_useCommentTextArea.useCommentTextArea)(userState, comment, onClose);
    const onChangeHandler = (event) => handleInputChange(event);
    const onKeyDownHandler = (event) => handleKeyDown(event);
    (0, import_hooks.useEffect)(() => {
      handleOnSaveRef.current = handleSubmit;
    }, [handleSubmit, handleOnSaveRef]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_classnames.default)(
          "collab-thread-body--input--wrapper",
          (0, import_collab.collabStyles)()["collab-thread-body--input--wrapper"]
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_classnames.default)(
                "collab-thread-body--input",
                (0, import_collab.collabStyles)()["collab-thread-body--input"]
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: (0, import_classnames.default)(
                    "collab-thread-body--input--textarea--wrapper",
                    (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--wrapper"]
                  ),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "textarea",
                      {
                        name: "collab-thread-body--input--textarea",
                        id: "collab-thread-body--input--textarea",
                        rows: 1,
                        className: (0, import_classnames.default)(
                          "collab-thread-body--input--textarea",
                          (0, import_collab.collabStyles)()["collab-thread-body--input--textarea"]
                        ),
                        value: state.message,
                        onChange: onChangeHandler,
                        onKeyDown: onKeyDownHandler,
                        maxLength: maxMessageLength,
                        placeholder: "Enter a comment or tag others using \u201C@\u201D",
                        ref: inputRef
                      }
                    ),
                    showSuggestions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      MentionSuggestionsList,
                      {
                        filteredUsers,
                        selectedIndex,
                        cursorPosition,
                        inputRef,
                        listRef,
                        itemRefs,
                        insertMention,
                        handleKeyDown
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: (0, import_classnames.default)(
                "collab-thread-input-indicator--wrapper",
                "flex-v-center",
                (0, import_collab.collabStyles)()["collab-thread-input-indicator--wrapper"],
                import_collab.flexAlignCenter
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorIndicator, { errorMessage: error.message }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  CharacterCounter,
                  {
                    currentLength: state.message.length,
                    maxLength: maxMessageLength
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
);
var CommentTextArea_default = CommentTextArea;
//# sourceMappingURL=CommentTextArea.cjs.map