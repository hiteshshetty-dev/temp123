import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/hooks/useCommentTextArea.ts
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext
} from "preact/hooks";
import { cloneDeep, findIndex } from "lodash-es";
import {
  validateCommentAndMentions,
  filterOutInvalidMentions,
  getMessageWithDisplayName,
  getUserName,
  getCommentBody
} from "../utils/collabUtils.js";
import { collabStyles } from "../collab.style.js";
import { maxMessageLength } from "../utils/constants.js";
import { ThreadProvider } from "../components/Collab/ThreadPopup/ContextProvider/index.js";
import useDynamicTextareaRows from "../hooks/useDynamicTextareaRows.js";
var initialState = {
  message: "",
  toUsers: [],
  images: [],
  createdBy: "",
  author: ""
};
var useCommentTextArea = (userState, comment, onClose) => {
  const [state, setState] = useState(initialState);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
    showAbove: false
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
  }, [searchTerm, userState.mentionsList]);
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
  useEffect(() => {
    var _a;
    if (!comment) return;
    const toUsers = [];
    (_a = comment == null ? void 0 : comment.toUsers) == null ? void 0 : _a.forEach((userId) => {
      const user = userState.userMap[userId];
      toUsers.push({
        display: `${user.display || getUserName(user)}`,
        id: userId
      });
    });
    setState({
      message: getMessageWithDisplayName(comment, userState, "text") ?? "",
      toUsers,
      images: (comment == null ? void 0 : comment.images) ?? [],
      createdBy: (comment == null ? void 0 : comment.createdBy) ?? "",
      author: (comment == null ? void 0 : comment.author) ?? ""
    });
  }, [comment, userState]);
  const findMentionSearchPosition = useCallback(
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
  const calculatePosition = useCallback(
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
  const insertMention = useCallback(
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
    },
    [state.message, state.toUsers, findMentionSearchPosition]
  );
  const handleInputChange = useCallback(
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
    },
    [state.toUsers, findMentionSearchPosition, calculatePosition, setError]
  );
  const handleKeyDown = useCallback(
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
  useEffect(() => {
    var _a;
    (_a = itemRefs.current[selectedIndex]) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }, [selectedIndex]);
  const handleSubmit = useCallback(async () => {
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
        ...getCommentBody(commentState)
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
          const updatedComments = cloneDeep(prevState.comments);
          const commentIndex = findIndex(
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
  useEffect(() => {
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
    maxMessageLength
  };
};
export {
  useCommentTextArea
};
//# sourceMappingURL=useCommentTextArea.js.map