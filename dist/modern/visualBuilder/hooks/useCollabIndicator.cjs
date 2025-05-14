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

// src/visualBuilder/hooks/useCollabIndicator.ts
var useCollabIndicator_exports = {};
__export(useCollabIndicator_exports, {
  useCollabIndicator: () => useCollabIndicator
});
module.exports = __toCommonJS(useCollabIndicator_exports);
var import_hooks = require("preact/hooks");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_generateThread = require("../generators/generateThread.cjs");
var import_generateThread2 = require("../generators/generateThread.cjs");
var import_generateThread3 = require("../generators/generateThread.cjs");
var useCollabIndicator = ({
  newThread,
  thread
}) => {
  const buttonRef = (0, import_hooks.useRef)(null);
  const popupRef = (0, import_hooks.useRef)(null);
  const config = import_configManager.default.get();
  const [showPopup, setShowPopup] = (0, import_hooks.useState)(newThread || false);
  const [activeThread, setActiveThread] = (0, import_hooks.useState)(() => {
    if (newThread) return { _id: "new" };
    return thread || { _id: "new" };
  });
  const updatePopupPosition = () => {
    if (buttonRef.current && popupRef.current) {
      (0, import_generateThread.calculatePopupPosition)(buttonRef.current, popupRef.current);
    }
  };
  (0, import_hooks.useEffect)(() => {
    if (!showPopup) return;
    updatePopupPosition();
  }, [showPopup]);
  (0, import_hooks.useEffect)(() => {
    const handleTogglePopup = (event) => {
      const { threadUid, action } = event.detail;
      const thread2 = document.querySelector(
        `div[threaduid='${threadUid}']`
      );
      (0, import_generateThread2.handleEmptyThreads)();
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
          import_configManager.default.set("collab.isFeedbackMode", false);
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
      (0, import_generateThread3.toggleCollabPopup)({ threadUid: "", action: "close" });
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
        import_configManager.default.set("collab.isFeedbackMode", true);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCollabIndicator
});
//# sourceMappingURL=useCollabIndicator.cjs.map