import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/CommentTextArea.tsx
import React from "preact/compat";
import {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef
} from "preact/hooks";
import { collabStyles } from "../../../collab.style.js";
import {
  validateCommentAndMentions,
  filterOutInvalidMentions,
  getMessageWithDisplayName,
  getUserName,
  getCommentBody
} from "../../../utils/collabUtils.js";
import { maxMessageLength } from "../../../utils/constants.js";
import { ThreadProvider } from "./ContextProvider/index.js";
import useDynamicTextareaRows from "../../../hooks/useDynamicTextareaRows.js";
import { cloneDeep, findIndex } from "lodash-es";
import classNames from "classnames";
import Tooltip from "../Tooltip/Tooltip.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var initialState = {
  message: "",
  toUsers: [],
  images: [],
  createdBy: "",
  author: ""
};
var CommentTextArea = React.memo(
  ({ userState, handleOnSaveRef, comment, onClose }) => {
    const [state, setState] = useState(initialState);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({
      top: 0,
      left: 0
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const itemRefs = useRef([]);
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
    } = useContext(ThreadProvider);
    useDynamicTextareaRows(
      ".collab-thread-body--input--textarea",
      state.message
    );
    useEffect(() => {
      itemRefs.current = itemRefs.current.slice(
        0,
        userState.mentionsList.length
      );
    }, [userState.mentionsList]);
    useEffect(() => {
      const filteredUsersList = userState.mentionsList.filter((user) => {
        if (!searchTerm) return true;
        return user.display.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredUsers(filteredUsersList);
    }, [searchTerm]);
    useEffect(() => {
      const textArea = document.getElementById(
        "collab-thread-body--input--textarea"
      );
      if (!textArea) return;
      const baseClasses = {
        focus: {
          base: "collab-thread-body--input--textarea--focus",
          goober: collabStyles()["collab-thread-body--input--textarea--focus"]
        },
        hover: {
          base: "collab-thread-body--input--textarea--hover",
          goober: collabStyles()["collab-thread-body--input--textarea--hover"]
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
      const updatedMentions = filterOutInvalidMentions(newValue, [
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
    const handleSubmit = useCallback(async () => {
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
          ...getCommentBody({
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
            const updatedComments = cloneDeep(prevState.comments);
            const commentIndex = findIndex(
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
    useEffect(() => {
      if (state.message.length === 0) {
        setError({ hasError: true, message: "" });
      }
      handleOnSaveRef.current = handleSubmit;
    }, [state, activeThread]);
    useEffect(() => {
      const toUsers = [];
      comment?.toUsers?.forEach((userId) => {
        const user = userState.userMap[userId];
        toUsers.push({
          display: `${user.display || getUserName(user)}`,
          id: userId
        });
      });
      setState({
        message: getMessageWithDisplayName(comment, userState, "text") ?? "",
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
      const errorMessage = validateCommentAndMentions(
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames(
          "collab-thread-body--input--wrapper",
          collabStyles()["collab-thread-body--input--wrapper"]
        ),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: classNames(
                "collab-thread-body--input",
                collabStyles()["collab-thread-body--input"]
              ),
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: classNames(
                    "collab-thread-body--input--textarea--wrapper",
                    collabStyles()["collab-thread-body--input--textarea--wrapper"]
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        name: "collab-thread-body--input--textarea",
                        id: "collab-thread-body--input--textarea",
                        rows: 1,
                        className: classNames(
                          "collab-thread-body--input--textarea",
                          collabStyles()["collab-thread-body--input--textarea"]
                        ),
                        value: state.message,
                        onChange: handleInputChange,
                        onKeyDown: handleKeyDown,
                        maxLength: maxMessageLength,
                        placeholder: "Enter a comment",
                        ref: inputRef
                      }
                    ),
                    showSuggestions && filteredUsers.length > 0 && /* @__PURE__ */ jsx(
                      "ul",
                      {
                        className: classNames(
                          "collab-thread-body--input--textarea--suggestionsList",
                          collabStyles()["collab-thread-body--input--textarea--suggestionsList"]
                        ),
                        ref: listRef,
                        children: filteredUsers.map((user, index) => /* @__PURE__ */ jsx(
                          "li",
                          {
                            onClick: () => insertMention(user),
                            className: classNames(
                              "collab-thread-body--input--textarea--suggestionsList--item",
                              collabStyles()["collab-thread-body--input--textarea--suggestionsList--item"],
                              "collab-thread-body--input--textarea--suggestionsList--item-selected",
                              index === selectedIndex ? collabStyles()["collab-thread-body--input--textarea--suggestionsList--item-selected"] : ""
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
                            children: user.display.length > 20 ? /* @__PURE__ */ jsx(Tooltip, { content: user.display, children: user.display.substring(0, 18) + "..." }) : user.display
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
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: classNames(
                "collab-thread-input-indicator--wrapper",
                "flex-v-center",
                collabStyles()["collab-thread-input-indicator--wrapper"],
                collabStyles()["flex-v-center"]
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: classNames(
                      "collab-thread-input-indicator--error",
                      collabStyles()["collab-thread-input-indicator--error"]
                    ),
                    children: error.message
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: classNames(
                      "collab-thread-input-indicator--count",
                      collabStyles()["collab-thread-input-indicator--count"]
                    ),
                    children: [
                      state.message.length,
                      "/",
                      maxMessageLength
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
export {
  CommentTextArea_default as default
};
//# sourceMappingURL=CommentTextArea.js.map