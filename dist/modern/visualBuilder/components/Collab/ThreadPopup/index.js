import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/index.tsx
import React from "preact/compat";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import ThreadHeader from "./ThreadHeader.js";
import ThreadFooter from "./ThreadFooter.js";
import ThreadBody from "./ThreadBody.js";
import { getUserName } from "../../../utils/collabUtils.js";
import { ThreadProvider } from "./ContextProvider/ThreadProvider.js";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll/useInfiniteScroll.js";
import { collabStyles } from "../../../collab.style.js";
import classNames from "classnames";
import { jsx, jsxs } from "preact/jsx-runtime";
var initialErrorState = {
  hasError: false,
  message: ""
};
var ThreadPopup = React.memo(
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
    const handleOnSaveRef = useRef(null);
    const [state, setState] = useState({
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
    const [error, setError] = useState(initialErrorState);
    const isFetchingMore = useInfiniteScroll({
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
    useEffect(() => {
      const userList = [];
      const userMap = {};
      inviteMetadata?.users?.forEach((user) => {
        if (user) {
          const userName = getUserName(user);
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
    useEffect(() => {
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
    const contextValue = useMemo(
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
    return /* @__PURE__ */ jsx(ThreadProvider.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames(
          "collab-thread--wrapper",
          collabStyles()["collab-thread--wrapper"]
        ),
        children: [
          /* @__PURE__ */ jsx(
            ThreadHeader,
            {
              onClose,
              onResolve,
              displayResolve: !!activeThread && activeThread?._id !== "new",
              commentCount: state.commentCount,
              activeThread
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              class: classNames(
                "collab-thread--container",
                collabStyles()["collab-thread--container"]
              ),
              children: [
                /* @__PURE__ */ jsx(
                  ThreadBody,
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
                /* @__PURE__ */ jsx(
                  ThreadFooter,
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
export {
  ThreadPopup_default as default
};
//# sourceMappingURL=index.js.map