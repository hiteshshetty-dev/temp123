import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateThread.tsx
import { render } from "preact";
import { css } from "goober";
import CollabIndicator from "../components/Collab/CollabIndicator.js";
import Config from "../../configManager/configManager.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { adjustPositionToViewport } from "../utils/collabUtils.js";
import { jsx } from "preact/jsx-runtime";
var popupTopOffset = 43;
var popupLeftOffset = 9;
var hiddenClass = css`
    display: none;
`;
function createPopupContainer(resolvedXPath, relativeX, relativeY, top, left, updateConfig, hidden, payload) {
  const popupContainer = document.createElement("div");
  popupContainer.setAttribute("field-path", resolvedXPath);
  popupContainer.setAttribute("relative", `x: ${relativeX}, y: ${relativeY}`);
  popupContainer.style.position = "absolute";
  popupContainer.style.top = `${top - popupTopOffset}px`;
  popupContainer.style.left = `${left - popupLeftOffset}px`;
  popupContainer.style.zIndex = updateConfig ? "1000" : "999";
  popupContainer.style.cursor = "pointer";
  popupContainer.className = "collab-thread";
  if (hidden) popupContainer.classList.add(hiddenClass);
  if (payload == null ? void 0 : payload._id) popupContainer.setAttribute("threaduid", payload._id);
  return popupContainer;
}
function appendPopupContainer(popupContainer) {
  const visualBuilderContainer = document.querySelector(
    ".visual-builder__container"
  );
  if (visualBuilderContainer) {
    let highlightCommentWrapper = visualBuilderContainer.querySelector(
      ".visual-builder__collab-wrapper"
    );
    if (!highlightCommentWrapper) {
      highlightCommentWrapper = document.createElement("div");
      highlightCommentWrapper.className = "visual-builder__collab-wrapper";
      visualBuilderContainer.appendChild(highlightCommentWrapper);
    }
    highlightCommentWrapper.appendChild(popupContainer);
  } else {
    document.body.appendChild(popupContainer);
  }
}
function generateThread(payload, options = {}) {
  var _a, _b, _c;
  const {
    isNewThread = false,
    updateConfig = false,
    hidden = false
  } = options;
  const config = (_b = (_a = Config).get) == null ? void 0 : _b.call(_a);
  let relativeX, relativeY, resolvedXPath;
  if (isNewThread) {
    ({ relativeX, relativeY, xpath: resolvedXPath } = payload);
  } else {
    const { position, elementXPath } = payload;
    ({ x: relativeX, y: relativeY } = position);
    resolvedXPath = elementXPath;
  }
  if (payload == null ? void 0 : payload._id) {
    const existingThread = document.querySelector(
      `div[threaduid='${payload._id}']`
    );
    if (existingThread) {
      return void 0;
    }
  }
  const element = getElementByXpath(resolvedXPath);
  if (!element) {
    return payload._id;
  }
  const rect = element.getBoundingClientRect();
  let top = rect.top + window.scrollY + relativeY * rect.height;
  let left = rect.left + window.scrollX + relativeX * rect.width;
  const adjustedPosition = adjustPositionToViewport({ top, left });
  top = adjustedPosition.top;
  left = adjustedPosition.left;
  const popupContainer = createPopupContainer(
    resolvedXPath,
    relativeX,
    relativeY,
    top,
    left,
    updateConfig,
    hidden,
    payload
  );
  if (updateConfig && ((_c = config == null ? void 0 : config.collab) == null ? void 0 : _c.enable)) {
    if (config == null ? void 0 : config.collab.isFeedbackMode) {
      Config.set("collab.isFeedbackMode", false);
    }
  }
  render(
    /* @__PURE__ */ jsx(
      CollabIndicator,
      {
        activeThread: !isNewThread ? payload : void 0,
        newThread: isNewThread
      }
    ),
    popupContainer
  );
  appendPopupContainer(popupContainer);
  return void 0;
}
function updateCollabIconPosition() {
  var _a, _b, _c;
  const icons = document.querySelectorAll(
    ".visual-builder__collab-wrapper .collab-thread"
  );
  const config = (_b = (_a = Config).get) == null ? void 0 : _b.call(_a);
  if ((_c = config == null ? void 0 : config.collab) == null ? void 0 : _c.pauseFeedback) return;
  icons.forEach((icon) => {
    if (!(icon instanceof HTMLElement)) return;
    const path = icon.getAttribute("field-path");
    const relative = icon.getAttribute("relative");
    if (!path || !relative) {
      console.error("Missing field-path or relative attribute.");
      return;
    }
    const match = relative.match(/x: ([\d.]+), y: ([\d.]+)/);
    if (!match) {
      console.error("Invalid relative attribute format.");
      return;
    }
    const relativeX = parseFloat(match[1]);
    const relativeY = parseFloat(match[2]);
    const targetElement = getElementByXpath(path);
    if (!targetElement) {
      icon.classList.add(hiddenClass);
      return;
    }
    const rect = targetElement.getBoundingClientRect();
    let left = rect.left + rect.width * relativeX + window.scrollX;
    let top = rect.top + rect.height * relativeY + window.scrollY;
    const adjustedPosition = adjustPositionToViewport({ top, left });
    top = adjustedPosition.top;
    left = adjustedPosition.left;
    icon.style.top = `${top - popupTopOffset}px`;
    icon.style.left = `${left - popupLeftOffset}px`;
    icon.classList.remove(hiddenClass);
  });
}
function updatePopupPositions() {
  var _a, _b, _c;
  const popups = document.querySelectorAll(
    ".visual-builder__collab-wrapper .collab-thread .collab-popup"
  );
  const config = (_b = (_a = Config).get) == null ? void 0 : _b.call(_a);
  if ((_c = config == null ? void 0 : config.collab) == null ? void 0 : _c.pauseFeedback) return;
  popups.forEach((popup) => {
    if (popup && popup instanceof HTMLElement) {
      const parent = popup.closest(
        ".visual-builder__collab-wrapper .collab-thread"
      );
      if (!parent) {
        console.error(
          "Parent element with class 'collab-thread' not found."
        );
        return;
      }
      const button = parent.querySelector(
        ".visual-builder__collab-wrapper .collab-thread .collab-indicator"
      );
      if (!button || !(button instanceof HTMLElement)) {
        console.error(
          "Button with class 'collab-indicator' not found."
        );
        return;
      }
      calculatePopupPosition(button, popup);
    }
  });
}
function updateSuggestionListPosition() {
  const suggestionLists = document.querySelectorAll(
    ".collab-thread-body--input--textarea--suggestionsList"
  );
  if (!suggestionLists.length) return;
  suggestionLists.forEach((list) => {
    if (!(list instanceof HTMLElement)) return;
    const textarea = document.querySelector(
      ".collab-thread-body--input--textarea"
    );
    if (!textarea) return;
    const positionData = list.getAttribute("data-position");
    const parsedData = positionData ? JSON.parse(positionData) : null;
    const showAbove = window.getComputedStyle(list).bottom !== "auto";
    const textareaRect = textarea.getBoundingClientRect();
    if (showAbove) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
      const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
      const cursorLineY = (parsedData == null ? void 0 : parsedData.cursorLineY) || paddingTop + lineHeight;
      list.style.position = "fixed";
      list.style.bottom = `${window.innerHeight - textareaRect.top - cursorLineY + lineHeight}px`;
      list.style.top = "auto";
    } else {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
      const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
      const cursorLineY = (parsedData == null ? void 0 : parsedData.cursorLineY) || paddingTop + lineHeight;
      list.style.position = "fixed";
      list.style.top = `${textareaRect.top + cursorLineY}px`;
      list.style.bottom = "auto";
    }
    if (!positionData && textareaRect) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
      const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
      const positionInfo = {
        showAbove,
        cursorLineY: paddingTop + lineHeight
      };
      list.setAttribute("data-position", JSON.stringify(positionInfo));
    }
    const listRect = list.getBoundingClientRect();
    if (!showAbove && listRect.bottom > window.innerHeight) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
      const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
      const cursorLineY = (parsedData == null ? void 0 : parsedData.cursorLineY) || paddingTop + lineHeight;
      list.style.bottom = `${window.innerHeight - textareaRect.top - cursorLineY + lineHeight}px`;
      list.style.top = "auto";
      if (positionData) {
        const updatedData = JSON.parse(positionData);
        updatedData.showAbove = true;
        list.setAttribute("data-position", JSON.stringify(updatedData));
      }
    } else if (showAbove && listRect.top < 0) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
      const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop) || 8;
      const cursorLineY = (parsedData == null ? void 0 : parsedData.cursorLineY) || paddingTop + lineHeight;
      list.style.top = `${textareaRect.top + cursorLineY}px`;
      list.style.bottom = "auto";
      if (positionData) {
        const updatedData = JSON.parse(positionData);
        updatedData.showAbove = false;
        list.setAttribute("data-position", JSON.stringify(updatedData));
      }
    }
  });
}
function calculatePopupPosition(button, popup) {
  const buttonRect = button.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  let popupHeight = popup.offsetHeight || 198;
  let popupWidth = popup.offsetWidth || 334;
  const spaceAbove = buttonRect.top;
  const spaceBelow = viewportHeight - buttonRect.bottom;
  let top, left;
  if (spaceAbove >= popupHeight) {
    top = buttonRect.top - popupHeight - 8;
  } else if (spaceBelow >= popupHeight) {
    top = buttonRect.bottom + 8;
  } else {
    top = spaceBelow > spaceAbove ? buttonRect.bottom + 8 : Math.max(buttonRect.top - popupHeight - 8, 0);
  }
  left = buttonRect.left + buttonRect.width / 2 - popupWidth / 2;
  top = Math.max(top, 0);
  left = Math.max(left, 0);
  left = Math.min(left, viewportWidth - popupWidth);
  popup.style.top = `${top}px`;
  popup.style.left = `${left}px`;
  requestAnimationFrame(() => {
    const newPopupHeight = popup.offsetHeight;
    if (newPopupHeight !== popupHeight) {
      calculatePopupPosition(button, popup);
    }
  });
}
function removeAllCollabIcons() {
  const icons = document.querySelectorAll(
    ".visual-builder__collab-wrapper .collab-thread"
  );
  icons == null ? void 0 : icons.forEach((icon) => icon == null ? void 0 : icon.remove());
}
function hideAllCollabIcons() {
  const icons = document.querySelectorAll(
    ".visual-builder__collab-wrapper .collab-thread"
  );
  icons == null ? void 0 : icons.forEach((icon) => icon == null ? void 0 : icon.classList.add(hiddenClass));
}
function showAllCollabIcons() {
  const icons = document.querySelectorAll(
    ".visual-builder__collab-wrapper .collab-thread"
  );
  icons == null ? void 0 : icons.forEach((icon) => icon == null ? void 0 : icon.classList.remove(hiddenClass));
}
function removeCollabIcon(threadUid) {
  const thread = document.querySelector(`div[threaduid='${threadUid}']`);
  thread == null ? void 0 : thread.remove();
}
function toggleCollabPopup({
  threadUid = "",
  action
}) {
  document.dispatchEvent(
    new CustomEvent("toggleCollabPopup", {
      detail: { threadUid, action }
    })
  );
}
function HighlightThread(threadUid) {
  toggleCollabPopup({ threadUid, action: "open" });
}
function isCollabThread(target) {
  return Array.from(target.classList).some(
    (className) => className.startsWith("collab")
  );
}
function handleMissingThreads(payload) {
  var _a;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
    VisualBuilderPostMessageEvents.COLLAB_MISSING_THREADS,
    payload
  );
}
function handleEmptyThreads() {
  const icons = document.querySelectorAll(
    ".visual-builder__collab-wrapper .collab-thread"
  );
  icons == null ? void 0 : icons.forEach((icon) => {
    if (!icon.hasAttribute("threaduid")) {
      icon.remove();
    }
  });
}
var retryConfig = {
  maxRetries: 5,
  retryDelay: 1e3
};
var isProcessingThreads = false;
var threadRenderStatus = /* @__PURE__ */ new Map();
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getRenderStatus(threadId) {
  if (!threadRenderStatus.has(threadId)) {
    threadRenderStatus.set(threadId, {
      threadId,
      attempts: 0,
      isRendered: false
    });
  }
  return threadRenderStatus.get(threadId);
}
function updateRenderStatus(threadId, isRendered) {
  const status = getRenderStatus(threadId);
  status.isRendered = isRendered;
  threadRenderStatus.set(threadId, status);
}
function clearThreadStatus(threadId) {
  threadRenderStatus.delete(threadId);
}
function clearAllThreadStatus() {
  threadRenderStatus.clear();
  isProcessingThreads = false;
}
async function processThread(thread) {
  let status = getRenderStatus(thread._id);
  while (status.attempts < retryConfig.maxRetries) {
    try {
      const result = generateThread(thread);
      if (result === void 0) {
        updateRenderStatus(thread._id, true);
        return void 0;
      }
      status.attempts++;
      updateRenderStatus(thread._id, false);
      if (status.attempts < retryConfig.maxRetries) {
        await delay(retryConfig.retryDelay);
      }
    } catch (error) {
      console.error(`Error rendering thread ${thread._id}:`, error);
      status.attempts++;
      if (status.attempts >= retryConfig.maxRetries) {
        break;
      }
      await delay(retryConfig.retryDelay);
    }
  }
  return thread._id;
}
async function processThreadsBatch(threads) {
  if (isProcessingThreads) return [];
  try {
    isProcessingThreads = true;
    const unrenderedThreads = filterUnrenderedThreads(threads);
    if (unrenderedThreads.length === 0) return [];
    const missingThreadIds = (await Promise.all(
      unrenderedThreads.map((thread) => processThread(thread))
    )).filter(Boolean);
    missingThreadIds.forEach(clearThreadStatus);
    return missingThreadIds;
  } finally {
    isProcessingThreads = false;
  }
}
function filterUnrenderedThreads(threads) {
  return threads.filter((thread) => {
    const existingThread = document.querySelector(
      `[threaduid="${thread._id}"]`
    );
    if (existingThread) {
      updateRenderStatus(thread._id, true);
      return false;
    }
    return true;
  });
}
function getElementByXpath(xpath) {
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
}
export {
  HighlightThread,
  calculatePopupPosition,
  clearAllThreadStatus,
  clearThreadStatus,
  filterUnrenderedThreads,
  generateThread,
  handleEmptyThreads,
  handleMissingThreads,
  hideAllCollabIcons,
  isCollabThread,
  processThreadsBatch,
  removeAllCollabIcons,
  removeCollabIcon,
  showAllCollabIcons,
  threadRenderStatus,
  toggleCollabPopup,
  updateCollabIconPosition,
  updatePopupPositions,
  updateSuggestionListPosition
};
//# sourceMappingURL=generateThread.js.map