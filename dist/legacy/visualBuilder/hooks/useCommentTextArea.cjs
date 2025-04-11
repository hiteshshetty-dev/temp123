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

// src/visualBuilder/hooks/useCommentTextArea.ts
var useCommentTextArea_exports = {};
__export(useCommentTextArea_exports, {
  useCommentTextArea: () => useCommentTextArea
});
module.exports = __toCommonJS(useCommentTextArea_exports);
var import_hooks = require("preact/hooks");
var import_lodash_es = require("lodash-es");
var import_collabUtils = require("../utils/collabUtils.cjs");
var import_collab = require("../collab.style.cjs");
var import_constants = require("../utils/constants.cjs");
var import_ContextProvider = require("../components/Collab/ThreadPopup/ContextProvider/index.cjs");
var import_useDynamicTextareaRows = __toESM(require("../hooks/useDynamicTextareaRows.cjs"), 1);
var initialState = {
  message: "",
  toUsers: [],
  images: [],
  createdBy: "",
  author: ""
};
var useCommentTextArea = (userState, comment, onClose) => {
  const [state, setState] = (0, import_hooks.useState)(initialState);
  const [showSuggestions, setShowSuggestions] = (0, import_hooks.useState)(false);
  const [cursorPosition, setCursorPosition] = (0, import_hooks.useState)({
    top: 0,
    left: 0,
    showAbove: false
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
  }, [searchTerm, userState.mentionsList]);
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
  (0, import_hooks.useEffect)(() => {
    var _a;
    if (!comment) return;
    const toUsers = [];
    (_a = comment == null ? void 0 : comment.toUsers) == null ? void 0 : _a.forEach((userId) => {
      const user = userState.userMap[userId];
      toUsers.push({
        display: `${user.display || (0, import_collabUtils.getUserName)(user)}`,
        id: userId
      });
    });
    setState({
      message: (0, import_collabUtils.getMessageWithDisplayName)(comment, userState, "text") ?? "",
      toUsers,
      images: (comment == null ? void 0 : comment.images) ?? [],
      createdBy: (comment == null ? void 0 : comment.createdBy) ?? "",
      author: (comment == null ? void 0 : comment.author) ?? ""
    });
  }, [comment, userState]);
  const findMentionSearchPosition = (0, import_hooks.useCallback)(
    (text, cursorPos) => {
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
    },
    []
  );
  const calculatePosition = (0, import_hooks.useCallback)(
    (textarea, cursorPosition2) => {
      const text = textarea == null ? void 0 : textarea.value;
      const textBeforeCursor = text == null ? void 0 : text.slice(0, cursorPosition2);
      const lines = textBeforeCursor == null ? void 0 : textBeforeCursor.split("\n");
      const currentLineNumber = ((lines == null ? void 0 : lines.length) || 0) - 1;
      const currentLine = lines == null ? void 0 : lines[currentLineNumber];
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
      );
      document.body.removeChild(span);
      const scrollTop = textarea.scrollTop;
      const currentLineY = currentLineNumber * lineHeight + paddingTop - scrollTop;
      const nextLineY = currentLineY + lineHeight;
      const viewportHeight = window.innerHeight;
      const suggestionsHeight = 160;
      const textareaRect = textarea.getBoundingClientRect();
      const absoluteTop = textareaRect.top + nextLineY;
      const spaceBelow = viewportHeight - absoluteTop;
      const showAbove = spaceBelow < suggestionsHeight;
      const top = showAbove ? currentLineY : nextLineY;
      return {
        top,
        left,
        showAbove,
        absoluteTop,
        scrollTop,
        currentLineNumber
      };
    },
    []
  );
  const insertMention = (0, import_hooks.useCallback)(
    (user) => {
      var _a, _b;
      const mention = findMentionSearchPosition(
        state.message,
        ((_a = inputRef.current) == null ? void 0 : _a.selectionStart) || 0
      );
      if (!mention) return;
      const beforeMention = state.message.slice(0, mention.start);
      const afterMention = state.message.slice(
        ((_b = inputRef.current) == null ? void 0 : _b.selectionStart) || 0
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
    },
    [state.message, state.toUsers, findMentionSearchPosition]
  );
  const handleInputChange = (0, import_hooks.useCallback)(
    (event) => {
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
          calculatePosition(
            inputRef.current,
            newPosition
          )
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
    },
    [state.toUsers, findMentionSearchPosition, calculatePosition, setError]
  );
  const handleKeyDown = (0, import_hooks.useCallback)(
    (e) => {
      var _a;
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
          (_a = inputRef.current) == null ? void 0 : _a.focus();
          break;
      }
    },
    [
      showSuggestions,
      filteredUsers,
      selectedIndex,
      insertMention,
      calculatePosition
    ]
  );
  (0, import_hooks.useEffect)(() => {
    var _a;
    (_a = itemRefs.current[selectedIndex]) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }, [selectedIndex]);
  const handleSubmit = (0, import_hooks.useCallback)(async () => {
    var _a;
    if (error.hasError) return;
    try {
      let threadUID = activeThread == null ? void 0 : activeThread._id;
      if ((activeThread == null ? void 0 : activeThread._id) == "new") {
        let currentThread = await createNewThread();
        threadUID = (_a = currentThread == null ? void 0 : currentThread.thread) == null ? void 0 : _a._id;
        setActiveThread(currentThread == null ? void 0 : currentThread.thread);
      }
      const commentState = {
        ...state,
        createdBy: userState.currentUser.uid,
        author: userState.currentUser.email
      };
      const commentPayload = {
        ...(0, import_collabUtils.getCommentBody)(commentState)
      };
      const commentData = {
        threadUid: threadUID,
        commentPayload
      };
      if (editComment) {
        let commentResponse = await onEditComment({
          threadUid: threadUID,
          commentUid: editComment,
          payload: commentPayload
        });
        setThreadState((prevState) => {
          const updatedComments = (0, import_lodash_es.cloneDeep)(prevState.comments);
          const commentIndex = (0, import_lodash_es.findIndex)(
            updatedComments,
            (c) => c._id === (comment == null ? void 0 : comment._id)
          );
          updatedComments.splice(
            commentIndex,
            1,
            commentResponse == null ? void 0 : commentResponse.comment
          );
          return {
            ...prevState,
            editComment: "",
            comments: updatedComments
          };
        });
        onClose(false);
      } else {
        let commentResponse = await onCreateComment(commentData);
        setThreadState((prevState) => ({
          ...prevState,
          comments: [commentResponse.comment, ...prevState.comments],
          commentCount: prevState.commentCount + 1
        }));
        setState(initialState);
        onClose(false);
      }
    } catch (error2) {
      console.error("Error submitting comment:", error2);
    }
  }, [error.hasError, state, activeThread]);
  (0, import_hooks.useEffect)(() => {
    if (state.message.length === 0) {
      setError({ hasError: true, message: "" });
    }
  }, [state.message, setError]);
  return {
    state,
    setState,
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
    maxMessageLength: import_constants.maxMessageLength
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCommentTextArea
});
//# sourceMappingURL=useCommentTextArea.cjs.map