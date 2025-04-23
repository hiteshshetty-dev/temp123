import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/collabUtils.ts
import { maxMessageLength, mentionLimit } from "./constants.js";
import { uniqBy } from "lodash-es";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
var escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var getThreadTitle = (commentCount) => {
  if (commentCount === 0) return "Add New Comment";
  return commentCount === 1 ? "1 Comment" : `${commentCount} Comments`;
};
var getUserName = (user) => {
  return user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.lastName || user.email;
};
var validateCommentAndMentions = (comment, toUsers) => {
  if (comment.length > maxMessageLength) {
    return `Limit exceeded. You can have a maximum length of ${maxMessageLength} characters.`;
  }
  if (toUsers.length > mentionLimit) {
    return `Limit exceeded. You can tag a maximum of ${mentionLimit} users.`;
  }
  return "";
};
var filterOutInvalidMentions = (message, toUsers) => {
  const to_users_temp = toUsers.filter(
    (user) => message.includes(user.display)
  );
  return {
    toUsers: uniqBy(to_users_temp, "id")
  };
};
var getMessageWithDisplayName = (comment, userState, profile) => {
  if (!comment) return void 0;
  let tempText = sanitizeData(comment.message).replace(/<[^>]*>/g, "");
  comment.toUsers?.forEach((user) => {
    const userPattern = new RegExp(`{{${user}}}`, "g");
    const userData = userState.userMap[user];
    const displayName = userData ? userData.display || getUserName(userData) : `unknown user`;
    const replacement = profile === "html" ? `<b class="collab-thread-comment--message">@${displayName}</b>` : `@${displayName}`;
    tempText = tempText.replace(userPattern, replacement);
  });
  return tempText;
};
var sanitizeData = (dirty) => {
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
};
var getCommentBody = (state) => {
  let finalMessage = sanitizeData(state.message).replace(/[^\S\r\n]+/g, " ").replace(/ *\n */g, "\n").replace(/<[^>]*>/g, "").trim();
  const comment = {
    message: finalMessage,
    toUsers: [],
    images: [],
    createdBy: state.createdBy,
    author: state.author
  };
  const updateMentionToUID = (entity, result) => {
    const displayName = entity.display;
    const escapedDisplayName = escapeRegExp(`@${displayName}`);
    const regexUser = new RegExp(escapedDisplayName, "g");
    finalMessage = finalMessage.replace(regexUser, `{{${entity.id}}}`);
    result.push(entity.id);
  };
  state.toUsers?.forEach((user) => updateMentionToUID(user, comment.toUsers));
  comment.message = finalMessage;
  return comment;
};
function normalizePath(path) {
  if (path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}
function fixSvgXPath(xpath) {
  if (!xpath) return "";
  return xpath.replace(/\/svg/g, "/*[name()='svg']");
}
function adjustPositionToViewport(position, options = {}) {
  const { top, left } = position;
  const viewportWidth = window.innerWidth;
  const safeMargin = options.safeMargin ?? 16;
  const topSafeMargin = options.topSafeMargin ?? 42;
  const threadWidth = options.threadWidth ?? 16;
  let adjustedLeft = left;
  let adjustedTop = top;
  if (adjustedLeft + threadWidth > viewportWidth - safeMargin) {
    adjustedLeft = viewportWidth - safeMargin - threadWidth;
  }
  if (adjustedTop - window.scrollY < topSafeMargin) {
    adjustedTop = window.scrollY + topSafeMargin;
  }
  return { top: adjustedTop, left: adjustedLeft };
}
function formatDate(dateString) {
  if (!dateString) return "";
  return dayjs(dateString).format("MMM DD, YYYY, hh:mm A");
}
var positionTooltip = (tooltipRef, targetRef, position, setActualPosition) => {
  if (!tooltipRef.current || !targetRef.current) return;
  const targetRect = targetRef.current.getBoundingClientRect();
  const tooltipRect = tooltipRef.current.getBoundingClientRect();
  const margin = 8;
  const positions = {
    bottom: {
      top: targetRect.bottom + margin,
      left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
    },
    top: {
      top: targetRect.top - tooltipRect.height - margin,
      left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
    },
    left: {
      top: targetRect.top + (targetRect.height - tooltipRect.height) / 2,
      left: targetRect.left - tooltipRect.width - margin
    },
    right: {
      top: targetRect.top + (targetRect.height - tooltipRect.height) / 2,
      left: targetRect.right + margin
    }
  };
  let bestPosition = position;
  let coords = positions[position];
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const wouldBeOutsideViewport = {
    bottom: coords.top + tooltipRect.height > viewportHeight,
    top: coords.top < 0,
    left: coords.left < 0,
    right: coords.left + tooltipRect.width > viewportWidth
  };
  const horizontalOutOfBounds = coords.left < 0 || coords.left + tooltipRect.width > viewportWidth;
  if (wouldBeOutsideViewport[position] || horizontalOutOfBounds) {
    const positionPriority = ["bottom", "top", "right", "left"];
    positionPriority.splice(positionPriority.indexOf(position), 1);
    positionPriority.push(position);
    for (const pos of positionPriority) {
      const testCoords = positions[pos];
      const isVisible = testCoords.top >= 0 && testCoords.top + tooltipRect.height <= viewportHeight && testCoords.left >= 0 && testCoords.left + tooltipRect.width <= viewportWidth;
      if (isVisible) {
        bestPosition = pos;
        coords = testCoords;
        break;
      }
    }
  }
  if (coords.left < 0) {
    coords.left = margin;
  } else if (coords.left + tooltipRect.width > viewportWidth) {
    coords.left = viewportWidth - tooltipRect.width - margin;
  }
  if (coords.top < 0) {
    coords.top = margin;
  } else if (coords.top + tooltipRect.height > viewportHeight) {
    coords.top = viewportHeight - tooltipRect.height - margin;
  }
  setActualPosition(bestPosition);
  Object.assign(tooltipRef.current.style, {
    top: `${coords.top}px`,
    left: `${coords.left}px`
  });
};
export {
  adjustPositionToViewport,
  filterOutInvalidMentions,
  fixSvgXPath,
  formatDate,
  getCommentBody,
  getMessageWithDisplayName,
  getThreadTitle,
  getUserName,
  normalizePath,
  positionTooltip,
  sanitizeData,
  validateCommentAndMentions
};
//# sourceMappingURL=collabUtils.js.map