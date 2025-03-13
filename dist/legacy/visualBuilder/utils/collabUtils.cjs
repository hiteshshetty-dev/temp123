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
  getCommentBody: () => getCommentBody,
  getMessageWithDisplayName: () => getMessageWithDisplayName,
  getThreadTitle: () => getThreadTitle,
  getUserName: () => getUserName,
  normalizePath: () => normalizePath,
  sanitizeData: () => sanitizeData,
  validateCommentAndMentions: () => validateCommentAndMentions
});
module.exports = __toCommonJS(collabUtils_exports);
var import_constants = require("./constants.cjs");
var import_lodash_es = require("lodash-es");
var import_dompurify = __toESM(require("dompurify"), 1);
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
  var _a;
  if (!comment) return void 0;
  let tempText = comment.message;
  (_a = comment == null ? void 0 : comment.toUsers) == null ? void 0 : _a.forEach((user) => {
    const userPattern = new RegExp(`{{${user}}}`, "g");
    const userData = userState.userMap[user];
    const replacement = profile === "html" ? `<b class="collab-thread-comment--message">@${userData.display || getUserName(userData)}</b>` : `@${userData.display || getUserName(userData)}`;
    tempText = tempText.replace(userPattern, replacement);
  });
  return tempText;
};
var sanitizeData = (dirty) => {
  return import_dompurify.default.sanitize(dirty, { USE_PROFILES: { html: true } });
};
var getCommentBody = (state) => {
  var _a;
  let finalMessage = state.message.replace(/[^\S\r\n]+/g, " ").replace(/ *\n */g, "\n").trim();
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
  (_a = state.toUsers) == null ? void 0 : _a.forEach((user) => updateMentionToUID(user, comment.toUsers));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustPositionToViewport,
  filterOutInvalidMentions,
  fixSvgXPath,
  getCommentBody,
  getMessageWithDisplayName,
  getThreadTitle,
  getUserName,
  normalizePath,
  sanitizeData,
  validateCommentAndMentions
});
//# sourceMappingURL=collabUtils.cjs.map