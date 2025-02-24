import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/collabUtils.ts
import { maxMessageLength, mentionLimit } from "./constants.js";
import { uniqBy } from "lodash-es";
import DOMPurify from "dompurify";
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
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
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
export {
  filterOutInvalidMentions,
  getCommentBody,
  getMessageWithDisplayName,
  getThreadTitle,
  getUserName,
  sanitizeData,
  validateCommentAndMentions
};
//# sourceMappingURL=collabUtils.js.map