import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateHighlightedComment.tsx
import { h } from "preact";
import { render } from "preact";
import HighlightedCommentIcon from "../components/HighlightedCommentIcon.js";
import { css } from "goober";
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
      iconContainer.style.zIndex = "900";
      iconContainer.style.cursor = "pointer";
      iconContainer.className = "highlighted-comment collab-icon";
      render(
        h(HighlightedCommentIcon, { data }),
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
var hiddenClass = css`
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
export {
  highlightCommentIconOnCanvas,
  removeAllHighlightedCommentIcons,
  removeHighlightedCommentIcon,
  showAllHiddenHighlightedCommentIcons,
  toggleHighlightedCommentIconDisplay,
  updateHighlightedCommentIconPosition
};
//# sourceMappingURL=generateHighlightedComment.js.map