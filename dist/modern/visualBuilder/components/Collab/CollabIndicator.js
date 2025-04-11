import "../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/CollabIndicator.tsx
import { collabStyles } from "../../collab.style.js";
import { useState, useEffect } from "preact/hooks";
import classNames from "classnames";
import ThreadPopup from "./ThreadPopup/index.js";
import Config from "../../../configManager/configManager.js";
import { useCollabIndicator } from "../../hooks/useCollabIndicator.js";
import { useCollabOperations } from "../../hooks/useCollabOperations.js";
import { handleEmptyThreads } from "../../generators/generateThread.js";
import { iconComponents } from "../icons/CollabIcons.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
var CollabIndicator = (props) => {
  const config = Config.get();
  const [inviteMetadata, setInviteMetadata] = useState(
    config?.collab?.inviteMetadata
  );
  useEffect(() => {
    setInviteMetadata(config?.collab?.inviteMetadata);
  }, [config?.collab?.inviteMetadata]);
  const {
    buttonRef,
    popupRef,
    showPopup,
    setShowPopup,
    activeThread,
    setActiveThread,
    togglePopup
  } = useCollabIndicator({
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
  } = useCollabOperations();
  const handleClose = (isResolved = false) => {
    if (isResolved) {
      buttonRef.current?.closest("div[field-path]")?.remove();
    }
    handleEmptyThreads();
    setShowPopup(false);
    if (config?.collab?.isFeedbackMode === false) {
      Config.set("collab.isFeedbackMode", true);
    }
  };
  const IconComponent = iconComponents["Indicator"];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        ref: buttonRef,
        "data-testid": "collab-indicator",
        className: classNames(
          "collab-indicator",
          collabStyles()["collab-indicator"]
        ),
        onClick: togglePopup,
        children: /* @__PURE__ */ jsx(IconComponent, { active: !showPopup })
      }
    ),
    showPopup && /* @__PURE__ */ jsx(
      "div",
      {
        ref: popupRef,
        className: classNames(
          "collab-popup",
          collabStyles()["collab-popup"]
        ),
        "data-testid": "collab-popup",
        children: /* @__PURE__ */ jsx(
          ThreadPopup,
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
export {
  CollabIndicator_default as default
};
//# sourceMappingURL=CollabIndicator.js.map