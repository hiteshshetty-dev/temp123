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
var import_collab = require("../../../collab.style.cjs");
var import_collabUtils = require("../../../utils/collabUtils.cjs");
var import_constants = require("../../../utils/constants.cjs");
var import_ContextProvider = require("./ContextProvider/index.cjs");
var import_useDynamicTextareaRows = __toESM(require("../../../hooks/useDynamicTextareaRows.cjs"), 1);
var import_lodash_es = require("lodash-es");
var import_classnames = __toESM(require("classnames"), 1);
var import_Tooltip = __toESM(require("../Tooltip/Tooltip.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var initialState = {
  message: "",
  toUsers: [],
  images: [],
  createdBy: "",
  author: ""
};
var CommentTextArea = import_compat.default.memo(
  ({ userState, handleOnSaveRef, comment, onClose }) => {
    const [state, setState] = (0, import_hooks.useState)(initialState);
    const [showSuggestions, setShowSuggestions] = (0, import_hooks.useState)(false);
    const [cursorPosition, setCursorPosition] = (0, import_hooks.useState)({
      top: 0,
      left: 0
    });
    const [searchTerm, setSearchTerm] = (0, import_hooks.useState)("");
    const [selectedIndex, setSelectedIndex] = (0, import_hooks.useState)(0);
    const [filteredUsers, setFilteredUsers] = (0, import_hooks.useState)([]);
    const inputRef = (0, import_hooks.useRef)(null);
    const listRef = (0, import_hooks.useRef)(null);
    const itemRefs = (0, import_hooks.useRef)([]);
    const {
      error,
      setError,
      onCreateComment,
      onEditComment,
      editComment,
      setThreadState,
      activeThread,
      setActiveThread,
      createNewThread
    } = (0, import_hooks.useContext)(import_ContextProvider.ThreadProvider);
    (0, import_useDynamicTextareaRows.default)(
      ".collab-thread-body--input--textarea",
      state.message
    );
    (0, import_hooks.useEffect)(() => {
      itemRefs.current = itemRefs.current.slice(
        0,
        userState.mentionsList.length
      );
    }, [userState.mentionsList]);
    (0, import_hooks.useEffect)(() => {
      const filteredUsersList = userState.mentionsList.filter((user) => {
        if (!searchTerm) return true;
        return user.display.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredUsers(filteredUsersList);
    }, [searchTerm]);
    (0, import_hooks.useEffect)(() => {
      const textArea = document.getElementById(
        "collab-thread-body--input--textarea"
      );
      if (!textArea) return;
      const baseClasses = {
        focus: {
          base: "collab-thread-body--input--textarea--focus",
          goober: (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--focus"]
        },
        hover: {
          base: "collab-thread-body--input--textarea--hover",
          goober: (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--hover"]
        }
      };
      const handleFocus = () => {
        textArea.classList.add(
          baseClasses.focus.base,
          baseClasses.focus.goober
        );
      };
      const handleBlur = () => {
        textArea.classList.remove(
          baseClasses.focus.base,
          baseClasses.focus.goober
        );
      };
      const handleMouseEnter = () => {
        textArea.classList.add(
          baseClasses.hover.base,
          baseClasses.hover.goober
        );
      };
      const handleMouseLeave = () => {
        textArea.classList.remove(
          baseClasses.hover.base,
          baseClasses.hover.goober
        );
      };
      textArea.addEventListener("focus", handleFocus);
      textArea.addEventListener("blur", handleBlur);
      textArea.addEventListener("mouseenter", handleMouseEnter);
      textArea.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        textArea.removeEventListener("focus", handleFocus);
        textArea.removeEventListener("blur", handleBlur);
        textArea.removeEventListener("mouseenter", handleMouseEnter);
        textArea.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);
    const findMentionSearchPosition = (text, cursorPos) => {
      const textBeforeCursor = text.slice(0, cursorPos);
      const atSymbolIndex = textBeforeCursor.lastIndexOf("@");
      if (atSymbolIndex === -1) return null;
      const textBetweenAtAndCursor = textBeforeCursor.slice(
        atSymbolIndex + 1
      );
      if (textBetweenAtAndCursor.includes(" ")) return null;
      return {
        start: atSymbolIndex,
        searchTerm: textBetweenAtAndCursor
      };
    };
    const insertMention = (user) => {
      const mention = findMentionSearchPosition(
        state.message,
        inputRef.current?.selectionStart || 0
      );
      if (!mention) return;
      const beforeMention = state.message.slice(0, mention.start);
      const afterMention = state.message.slice(
        inputRef.current?.selectionStart || 0
      );
      const newValue = `${beforeMention}@${user.display} ${afterMention}`;
      const updatedMentions = (0, import_collabUtils.filterOutInvalidMentions)(newValue, [
        ...state.toUsers || [],
        { display: user.display, id: user.uid || "" }
      ]);
      setState((prevState) => ({
        ...prevState,
        message: newValue,
        toUsers: updatedMentions.toUsers
      }));
      setShowSuggestions(false);
      const ele = inputRef.current;
      if (ele) {
        ele.focus();
      }
    };
    const calculatePosition = (textarea, cursorPosition2) => {
      const text = inputRef.current?.value;
      const textBeforeCursor = text?.slice(0, cursorPosition2);
      const lines = textBeforeCursor?.split("\n");
      const currentLineNumber = (lines?.length || 0) - 1;
      const currentLine = lines?.[currentLineNumber];
      const style = window.getComputedStyle(textarea);
      const lineHeight = parseInt(style.lineHeight);
      const paddingLeft = parseInt(style.paddingLeft);
      const paddingTop = parseInt(style.paddingTop);
      const span = document.createElement("span");
      span.style.font = style.font;
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.style.whiteSpace = "pre";
      span.textContent = currentLine ? currentLine : "";
      document.body.appendChild(span);
      const left = Math.min(
        span.offsetWidth + paddingLeft,
        textarea.offsetWidth - 200
        // Keep list inside textarea
      );
      document.body.removeChild(span);
      const currentLineY = currentLineNumber * lineHeight + paddingTop;
      const nextLineY = currentLineY + lineHeight;
      const textareaBottom = textarea.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;
      const suggestionsHeight = 160;
      const spaceBelow = viewportHeight - (textarea.getBoundingClientRect().top + nextLineY);
      const showAbove = spaceBelow < suggestionsHeight;
      const top = showAbove ? currentLineY - suggestionsHeight : nextLineY;
      return {
        top,
        left,
        showAbove
      };
    };
    const handleSubmit = (0, import_hooks.useCallback)(async () => {
      if (error.hasError) return;
      try {
        let threadUID = activeThread?._id;
        if (activeThread?._id == "new") {
          let currentThread = await createNewThread();
          threadUID = currentThread?.thread?._id;
          setActiveThread(currentThread?.thread);
        }
        setState((prevState) => ({
          ...prevState,
          createdBy: userState.currentUser.uid
        }));
        const commentPayload = {
          ...(0, import_collabUtils.getCommentBody)({
            ...state,
            createdBy: userState.currentUser.uid,
            author: userState.currentUser.email
          })
        };
        const commentData = {
          threadUid: threadUID,
          commentPayload
        };
        if (editComment) {
          let commentResponse = await onEditComment(
            {
              threadUid: threadUID,
              commentUid: editComment,
              payload: commentPayload
            }
          );
          setThreadState((prevState) => {
            const updatedComments = (0, import_lodash_es.cloneDeep)(prevState.comments);
            const commentIndex = (0, import_lodash_es.findIndex)(
              updatedComments,
              (c) => c._id === comment?._id
            );
            updatedComments.splice(
              commentIndex,
              1,
              commentResponse?.comment
            );
            return {
              ...prevState,
              editComment: "",
              // Clear the edit mode
              comments: updatedComments
              // Update the comments list in the state
            };
          });
          onClose(false);
        } else {
          let commentResponse = await onCreateComment(commentData);
          setThreadState((prevState) => ({
            ...prevState,
            comments: [
              commentResponse.comment,
              ...prevState.comments
            ],
            // Prepend the new comment
            commentCount: prevState.commentCount + 1
            // Increment the comment count
          }));
          setState(initialState);
          onClose(false);
        }
      } catch (error2) {
      }
    }, [error.hasError, state, activeThread]);
    (0, import_hooks.useEffect)(() => {
      if (state.message.length === 0) {
        setError({ hasError: true, message: "" });
      }
      handleOnSaveRef.current = handleSubmit;
    }, [state, activeThread]);
    (0, import_hooks.useEffect)(() => {
      const toUsers = [];
      comment?.toUsers?.forEach((userId) => {
        const user = userState.userMap[userId];
        toUsers.push({
          display: `${user.display || (0, import_collabUtils.getUserName)(user)}`,
          id: userId
        });
      });
      setState({
        message: (0, import_collabUtils.getMessageWithDisplayName)(comment, userState, "text") ?? "",
        toUsers,
        images: comment?.images ?? [],
        createdBy: comment?.createdBy ?? "",
        author: comment?.author ?? ""
      });
    }, [comment]);
    const handleInputChange = (event) => {
      const target = event.target;
      if (!target) return;
      const newPlainTextValue = target.value;
      const trimmedValue = newPlainTextValue.trim();
      const newPosition = target.selectionStart;
      const mention = findMentionSearchPosition(
        newPlainTextValue,
        newPosition
      );
      if (mention) {
        setSearchTerm(mention.searchTerm);
        setShowSuggestions(true);
        setCursorPosition(
          calculatePosition(inputRef.current, newPosition)
        );
        setSelectedIndex(0);
      } else {
        setShowSuggestions(false);
      }
      const errorMessage = (0, import_collabUtils.validateCommentAndMentions)(
        newPlainTextValue,
        state.toUsers ?? []
      );
      setError({
        hasError: errorMessage !== "" || trimmedValue === "",
        message: errorMessage
      });
      setState((prevState) => ({
        ...prevState,
        message: newPlainTextValue
      }));
    };
    const handleKeyDown = (e) => {
      if (e.key === "@") {
        const position = calculatePosition(
          inputRef.current,
          e.target.selectionStart
        );
        setCursorPosition(position);
        setSelectedIndex(0);
      }
      if (!showSuggestions) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(
            (prev) => prev < filteredUsers.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => prev > 0 ? prev - 1 : prev);
          break;
        case "Enter":
          e.preventDefault();
          if (showSuggestions) {
            insertMention(filteredUsers[selectedIndex]);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          inputRef.current?.focus();
          break;
      }
    };
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
                        onChange: handleInputChange,
                        onKeyDown: handleKeyDown,
                        maxLength: import_constants.maxMessageLength,
                        placeholder: "Enter a comment",
                        ref: inputRef
                      }
                    ),
                    showSuggestions && filteredUsers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "ul",
                      {
                        className: (0, import_classnames.default)(
                          "collab-thread-body--input--textarea--suggestionsList",
                          (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--suggestionsList"]
                        ),
                        ref: listRef,
                        children: filteredUsers.map((user, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "li",
                          {
                            onClick: () => insertMention(user),
                            className: (0, import_classnames.default)(
                              "collab-thread-body--input--textarea--suggestionsList--item",
                              (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--suggestionsList--item"],
                              "collab-thread-body--input--textarea--suggestionsList--item-selected",
                              index === selectedIndex ? (0, import_collab.collabStyles)()["collab-thread-body--input--textarea--suggestionsList--item-selected"] : ""
                            ),
                            ref: (el) => itemRefs.current[index] = el,
                            onKeyDown: (e) => {
                              if (e.key === "Enter") {
                                insertMention(user);
                              } else {
                                handleKeyDown(e);
                              }
                            },
                            tabIndex: -1,
                            "aria-selected": index === selectedIndex,
                            children: user.display.length > 20 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Tooltip.default, { content: user.display, children: user.display.substring(0, 18) + "..." }) : user.display
                          },
                          user.uid
                        ))
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
                (0, import_collab.collabStyles)()["flex-v-center"]
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: (0, import_classnames.default)(
                      "collab-thread-input-indicator--error",
                      (0, import_collab.collabStyles)()["collab-thread-input-indicator--error"]
                    ),
                    children: error.message
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    className: (0, import_classnames.default)(
                      "collab-thread-input-indicator--count",
                      (0, import_collab.collabStyles)()["collab-thread-input-indicator--count"]
                    ),
                    children: [
                      state.message.length,
                      "/",
                      import_constants.maxMessageLength
                    ]
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