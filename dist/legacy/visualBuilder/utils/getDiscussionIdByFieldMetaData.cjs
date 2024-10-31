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

// src/visualBuilder/utils/getDiscussionIdByFieldMetaData.ts
var getDiscussionIdByFieldMetaData_exports = {};
__export(getDiscussionIdByFieldMetaData_exports, {
  getDiscussionIdByFieldMetaData: () => getDiscussionIdByFieldMetaData
});
module.exports = __toCommonJS(getDiscussionIdByFieldMetaData_exports);
var import_visualBuilderPostMessage = __toESM(require("./visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("./types/postMessage.types.cjs");
var import_errorHandling = require("./errorHandling.cjs");
async function getDiscussionIdByFieldMetaData(params) {
  var _a;
  const { fieldMetadata, fieldSchema } = params;
  const discussion = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
    import_postMessage.VisualBuilderPostMessageEvents.GET_DISCUSSION_ID,
    { fieldMetadata, fieldSchema }
  )) ?? null;
  if ((0, import_errorHandling.hasPostMessageError)(discussion)) {
    return null;
  }
  return discussion;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDiscussionIdByFieldMetaData
});
//# sourceMappingURL=getDiscussionIdByFieldMetaData.cjs.map