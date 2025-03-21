import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/CommentTextArea.tsx
import React from "preact/compat";
import { useEffect } from "preact/hooks";
import { collabStyles, flexAlignCenter } from "../../../collab.style.js";
import { useCommentTextArea } from "../../../hooks/useCommentTextArea.js";
import classNames from "classnames";
import Tooltip from "../Tooltip/Tooltip.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var CommentTextArea = React.memo(
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
    } = useCommentTextArea(userState, comment, onClose);
    useEffect(() => {
      handleOnSaveRef.current = handleSubmit;
    }, [handleSubmit, handleOnSaveRef]);
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
                        onChange: (event) => handleInputChange(event),
                        onKeyDown: (event) => handleKeyDown(event),
                        maxLength: maxMessageLength,
                        placeholder: "Enter a comment or tag others using \u201C@\u201D",
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
                        style: {
                          ...cursorPosition.showAbove ? {
                            bottom: `${window.innerHeight - (inputRef.current?.getBoundingClientRect().top || 0) - cursorPosition.top}px`,
                            top: "auto"
                          } : {
                            top: `${(inputRef.current?.getBoundingClientRect().top || 0) + cursorPosition.top}px`
                          }
                        },
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
                                handleKeyDown(
                                  e
                                );
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
                flexAlignCenter
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