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

// src/visualBuilder/generators/generateHighlightedComment.tsx
var generateHighlightedComment_exports = {};
__export(generateHighlightedComment_exports, {
  highlightCommentIconOnCanvas: () => highlightCommentIconOnCanvas,
  removeAllHighlightedCommentIcons: () => removeAllHighlightedCommentIcons,
  removeHighlightedCommentIcon: () => removeHighlightedCommentIcon,
  showAllHiddenHighlightedCommentIcons: () => showAllHiddenHighlightedCommentIcons,
  toggleHighlightedCommentIconDisplay: () => toggleHighlightedCommentIconDisplay,
  updateHighlightedCommentIconPosition: () => updateHighlightedCommentIconPosition
});
module.exports = __toCommonJS(generateHighlightedComment_exports);
var import_preact = require("preact");
var import_preact2 = require("preact");
var import_HighlightedCommentIcon = __toESM(require("../components/HighlightedCommentIcon.cjs"), 1);
var import_goober = require("goober");
var highlighCommentOffset = 25;
function highlightCommentIconOnCanvas(payload) {
  const uniquePaths = {};
  payload.forEach((data) => {
    const cslpValue = data?.fieldMetadata?.cslpValue;
    if (!cslpValue || uniquePaths[cslpValue]) {
      return;
    }
    uniquePaths[cslpValue] = true;
    const element = document.querySelector(`[data-cslp="${cslpValue}"]`);
    if (element && element instanceof HTMLElement) {
      const { top, left } = element.getBoundingClientRect();
      const iconContainer = document.createElement("div");
      iconContainer.setAttribute("field-path", cslpValue);
      iconContainer.style.position = "fixed";
      iconContainer.style.top = `${top - highlighCommentOffset}px`;
      iconContainer.style.left = `${left - highlighCommentOffset}px`;
      iconContainer.style.zIndex = "1000";
      iconContainer.style.cursor = "pointer";
      iconContainer.className = "highlighted-comment";
      (0, import_preact2.render)(
        (0, import_preact.h)(import_HighlightedCommentIcon.default, { data }),
        // Use h directly with Preact
        iconContainer
      );
      const visualBuilderContainer = document.querySelector(
        ".visual-builder__container"
      );
      if (visualBuilderContainer) {
        let highlightCommentWrapper = visualBuilderContainer.querySelector(
          ".visual-builder__highlighted-comment-wrapper"
        );
        if (!highlightCommentWrapper) {
          highlightCommentWrapper = document.createElement("div");
          highlightCommentWrapper.className = "visual-builder__highlighted-comment-wrapper";
          visualBuilderContainer.appendChild(highlightCommentWrapper);
        }
        highlightCommentWrapper.appendChild(iconContainer);
      }
    }
  });
}
function updateHighlightedCommentIconPosition() {
  const icons = document.querySelectorAll(".highlighted-comment");
  icons.forEach((icon) => {
    if (icon && icon instanceof HTMLElement) {
      const path = icon.getAttribute("field-path");
      if (path) {
        const targetElement = document.querySelector(
          `[data-cslp="${path}"]`
        );
        if (targetElement && targetElement instanceof HTMLElement) {
          const { top, left } = targetElement.getBoundingClientRect();
          icon.style.top = `${top - highlighCommentOffset}px`;
          icon.style.left = `${left - highlighCommentOffset}px`;
        }
      }
    }
  });
}
function removeHighlightedCommentIcon(pathToRemove) {
  const iconToRemove = document.querySelectorAll(
    `.highlighted-comment[field-path="${pathToRemove}"]`
  );
  iconToRemove?.forEach((icon) => icon?.remove());
}
function removeAllHighlightedCommentIcons() {
  const icons = document.querySelectorAll(".highlighted-comment");
  icons?.forEach((icon) => icon?.remove());
}
var hiddenClass = import_goober.css`
    display: none;
`;
function toggleHighlightedCommentIconDisplay(path, shouldShow) {
  const icons = document.querySelectorAll(
    `.highlighted-comment[field-path="${path}"]`
  );
  icons.forEach((icon) => {
    if (shouldShow) {
      icon.classList.remove(hiddenClass);
    } else {
      icon.classList.add(hiddenClass);
    }
  });
}
function showAllHiddenHighlightedCommentIcons() {
  const hiddenIcons = document.querySelectorAll(
    `.highlighted-comment.${hiddenClass}`
  );
  hiddenIcons.forEach((icon) => {
    icon.classList.remove(hiddenClass);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  highlightCommentIconOnCanvas,
  removeAllHighlightedCommentIcons,
  removeHighlightedCommentIcon,
  showAllHiddenHighlightedCommentIcons,
  toggleHighlightedCommentIconDisplay,
  updateHighlightedCommentIconPosition
});
//# sourceMappingURL=generateHighlightedComment.cjs.map