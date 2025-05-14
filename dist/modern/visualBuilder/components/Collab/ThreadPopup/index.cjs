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

// src/visualBuilder/components/Collab/ThreadPopup/index.tsx
var ThreadPopup_exports = {};
__export(ThreadPopup_exports, {
  default: () => ThreadPopup_default
});
module.exports = __toCommonJS(ThreadPopup_exports);
var import_compat = __toESM(require("preact/compat"), 1);
var import_hooks = require("preact/hooks");
var import_ThreadHeader = __toESM(require("./ThreadHeader.cjs"), 1);
var import_ThreadFooter = __toESM(require("./ThreadFooter.cjs"), 1);
var import_ThreadBody = __toESM(require("./ThreadBody.cjs"), 1);
var import_collabUtils = require("../../../utils/collabUtils.cjs");
var import_ThreadProvider = require("./ContextProvider/ThreadProvider.cjs");
var import_useInfiniteScroll = __toESM(require("../../../hooks/use-infinite-scroll/useInfiniteScroll.cjs"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var initialErrorState = {
  hasError: false,
  message: ""
};
var ThreadPopup = import_compat.default.memo(
  ({
    onCreateComment,
    onEditComment,
    onDeleteComment,
    onDeleteThread,
    onClose,
    onResolve,
    inviteMetadata,
    loadMoreMessages,
    activeThread,
    setActiveThread,
    createNewThread
  }) => {
    const handleOnSaveRef = (0, import_hooks.useRef)(null);
    const [state, setState] = (0, import_hooks.useState)({
      isLoading: false,
      commentCount: 0,
      comments: [],
      editComment: "",
      userState: {
        mentionsList: [],
        currentUser: inviteMetadata?.currentUser,
        userMap: {}
      }
    });
    const [error, setError] = (0, import_hooks.useState)(initialErrorState);
    const isFetchingMore = (0, import_useInfiniteScroll.default)({
      containerId: "collab-thread-comment--list",
      isFetching: false,
      canFetchMore: state.commentCount > state.comments.length,
      loadMore: async (offset, limit) => {
        try {
          let payload = {
            offset,
            limit,
            threadUid: activeThread?._id
          };
          const res = await loadMoreMessages(payload);
          setState((prevState) => ({
            ...prevState,
            commentCount: res.count,
            comments: [...prevState.comments, ...res.comments]
          }));
        } catch (error2) {
          console.error(error2);
        }
      },
      offset: state.comments.length,
      limit: 10
    });
    (0, import_hooks.useEffect)(() => {
      const userList = [];
      const userMap = {};
      inviteMetadata?.users?.forEach((user) => {
        if (user) {
          const userName = (0, import_collabUtils.getUserName)(user);
          userList.push({
            display: userName,
            email: user.email,
            uid: user.uid
          });
          userMap[user.uid] = { ...user, display: userName };
        }
      });
      setState((prevState) => ({
        ...prevState,
        userState: {
          mentionsList: userList,
          userMap,
          currentUser: inviteMetadata?.currentUser
        }
      }));
    }, [inviteMetadata]);
    (0, import_hooks.useEffect)(() => {
      if (!activeThread) {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        return;
      }
      if (activeThread?._id == "new") {
        return;
      }
      const fetchInitialMessages = async () => {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        try {
          let payload = {
            offset: 0,
            limit: 10,
            threadUid: activeThread?._id
          };
          const res = await loadMoreMessages(payload);
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            commentCount: res.count,
            comments: res.comments
          }));
        } catch (error2) {
          setState((prevState) => ({
            ...prevState,
            isLoading: false
          }));
          console.error(error2);
        }
      };
      fetchInitialMessages();
    }, []);
    const contextValue = (0, import_hooks.useMemo)(
      () => ({
        inviteMetadata,
        userState: state.userState,
        commentCount: state.commentCount,
        setThreadState: setState,
        error,
        setError,
        onCreateComment,
        onEditComment,
        onDeleteComment,
        onDeleteThread,
        onClose,
        editComment: state.editComment,
        activeThread,
        setActiveThread,
        createNewThread
      }),
      [
        inviteMetadata,
        state.userState,
        state.commentCount,
        error,
        state.editComment,
        activeThread
      ]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ThreadProvider.ThreadProvider.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_classnames.default)(
          "collab-thread--wrapper",
          (0, import_collab.collabStyles)()["collab-thread--wrapper"]
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_ThreadHeader.default,
            {
              onClose,
              onResolve,
              displayResolve: !!activeThread && activeThread?._id !== "new",
              commentCount: state.commentCount,
              activeThread
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              class: (0, import_classnames.default)(
                "collab-thread--container",
                (0, import_collab.collabStyles)()["collab-thread--container"]
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_ThreadBody.default,
                  {
                    handleOnSaveRef,
                    onClose,
                    userState: state.userState,
                    isLoading: state.isLoading,
                    comments: state.comments,
                    fetchingMore: isFetchingMore,
                    editComment: state.editComment
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_ThreadFooter.default,
                  {
                    onClose,
                    handleOnSaveRef,
                    isDisabled: error.hasError,
                    editComment: state.editComment
                  }
                )
              ]
            }
          )
        ]
      }
    ) });
  }
);
var ThreadPopup_default = ThreadPopup;
//# sourceMappingURL=index.cjs.map