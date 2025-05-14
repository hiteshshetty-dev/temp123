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

// src/visualBuilder/utils/collabUtils.ts
var collabUtils_exports = {};
__export(collabUtils_exports, {
  adjustPositionToViewport: () => adjustPositionToViewport,
  filterOutInvalidMentions: () => filterOutInvalidMentions,
  fixSvgXPath: () => fixSvgXPath,
  formatDate: () => formatDate,
  getCommentBody: () => getCommentBody,
  getMessageWithDisplayName: () => getMessageWithDisplayName,
  getThreadTitle: () => getThreadTitle,
  getUserName: () => getUserName,
  normalizePath: () => normalizePath,
  positionTooltip: () => positionTooltip,
  sanitizeData: () => sanitizeData,
  validateCommentAndMentions: () => validateCommentAndMentions
});
module.exports = __toCommonJS(collabUtils_exports);
var import_constants = require("./constants.cjs");
var import_lodash_es = require("lodash-es");
var import_dompurify = __toESM(require("dompurify"), 1);
var import_dayjs = __toESM(require("dayjs"), 1);
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
  if (comment.length > import_constants.maxMessageLength) {
    return `Limit exceeded. You can have a maximum length of ${import_constants.maxMessageLength} characters.`;
  }
  if (toUsers.length > import_constants.mentionLimit) {
    return `Limit exceeded. You can tag a maximum of ${import_constants.mentionLimit} users.`;
  }
  return "";
};
var filterOutInvalidMentions = (message, toUsers) => {
  const to_users_temp = toUsers.filter(
    (user) => message.includes(user.display)
  );
  return {
    toUsers: (0, import_lodash_es.uniqBy)(to_users_temp, "id")
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
  return import_dompurify.default.sanitize(dirty, { USE_PROFILES: { html: true } });
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
  return (0, import_dayjs.default)(dateString).format("MMM DD, YYYY, hh:mm A");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=collabUtils.cjs.map