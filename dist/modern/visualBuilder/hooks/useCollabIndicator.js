import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/hooks/useCollabIndicator.ts
import { useState, useRef, useEffect } from "preact/hooks";
import Config from "../../configManager/configManager.js";
import { calculatePopupPosition } from "../generators/generateThread.js";
import { handleEmptyThreads } from "../generators/generateThread.js";
import { toggleCollabPopup } from "../generators/generateThread.js";
var useCollabIndicator = ({
  newThread,
  thread
}) => {
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const config = Config.get();
  const [showPopup, setShowPopup] = useState(newThread || false);
  const [activeThread, setActiveThread] = useState(() => {
    if (newThread) return { _id: "new" };
    return thread || { _id: "new" };
  });
  const updatePopupPosition = () => {
    if (buttonRef.current && popupRef.current) {
      calculatePopupPosition(buttonRef.current, popupRef.current);
    }
  };
  useEffect(() => {
    if (!showPopup) return;
    updatePopupPosition();
  }, [showPopup]);
  useEffect(() => {
    const handleTogglePopup = (event) => {
      const { threadUid, action } = event.detail;
      const thread2 = document.querySelector(
        `div[threaduid='${threadUid}']`
      );
      handleEmptyThreads();
      const closestDiv = buttonRef.current?.closest("div[field-path]");
      if (closestDiv) {
        closestDiv.style.zIndex = "999";
      }
      setShowPopup(false);
      if (action === "open" && thread2 && thread2.contains(buttonRef.current)) {
        setShowPopup(true);
        const closestDiv2 = buttonRef.current?.closest("div[field-path]");
        thread2.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        if (closestDiv2) {
          closestDiv2.style.zIndex = "1000";
        }
        if (config?.collab?.isFeedbackMode === true) {
          Config.set("collab.isFeedbackMode", false);
        }
      }
    };
    document.addEventListener("toggleCollabPopup", handleTogglePopup);
    return () => {
      document.removeEventListener(
        "toggleCollabPopup",
        handleTogglePopup
      );
    };
  }, []);
  const togglePopup = () => {
    if (!showPopup) {
      toggleCollabPopup({ threadUid: "", action: "close" });
      setShowPopup(true);
      const closestDiv = buttonRef.current?.closest("div[field-path]");
      if (closestDiv) {
        closestDiv.style.zIndex = "1000";
      }
    } else {
      setShowPopup(false);
      const closestDiv = buttonRef.current?.closest("div[field-path]");
      if (!closestDiv?.hasAttribute("threaduid")) closestDiv?.remove();
      if (config?.collab?.isFeedbackMode === false) {
        Config.set("collab.isFeedbackMode", true);
      }
    }
  };
  return {
    buttonRef,
    popupRef,
    showPopup,
    setShowPopup,
    activeThread,
    setActiveThread,
    togglePopup
  };
};
export {
  useCollabIndicator
};
//# sourceMappingURL=useCollabIndicator.js.map