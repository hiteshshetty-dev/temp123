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
      var _a, _b, _c;
      const { threadUid, action } = event.detail;
      const thread2 = document.querySelector(
        `div[threaduid='${threadUid}']`
      );
      handleEmptyThreads();
      const closestDiv = (_a = buttonRef.current) == null ? void 0 : _a.closest("div[field-path]");
      if (closestDiv) {
        closestDiv.style.zIndex = "999";
      }
      setShowPopup(false);
      if (action === "open" && thread2 && thread2.contains(buttonRef.current)) {
        setShowPopup(true);
        const closestDiv2 = (_b = buttonRef.current) == null ? void 0 : _b.closest("div[field-path]");
        thread2.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        if (closestDiv2) {
          closestDiv2.style.zIndex = "1000";
        }
        if (((_c = config == null ? void 0 : config.collab) == null ? void 0 : _c.isFeedbackMode) === true) {
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
    var _a, _b, _c;
    if (!showPopup) {
      toggleCollabPopup({ threadUid: "", action: "close" });
      setShowPopup(true);
      const closestDiv = (_a = buttonRef.current) == null ? void 0 : _a.closest("div[field-path]");
      if (closestDiv) {
        closestDiv.style.zIndex = "1000";
      }
    } else {
      setShowPopup(false);
      const closestDiv = (_b = buttonRef.current) == null ? void 0 : _b.closest("div[field-path]");
      if (!(closestDiv == null ? void 0 : closestDiv.hasAttribute("threaduid"))) closestDiv == null ? void 0 : closestDiv.remove();
      if (((_c = config == null ? void 0 : config.collab) == null ? void 0 : _c.isFeedbackMode) === false) {
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