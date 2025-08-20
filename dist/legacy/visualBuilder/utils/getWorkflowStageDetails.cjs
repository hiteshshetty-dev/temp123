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

// src/visualBuilder/utils/getWorkflowStageDetails.ts
var getWorkflowStageDetails_exports = {};
__export(getWorkflowStageDetails_exports, {
  getWorkflowStageDetails: () => getWorkflowStageDetails
});
module.exports = __toCommonJS(getWorkflowStageDetails_exports);
var import_postMessage = require("./types/postMessage.types.cjs");
var import_visualBuilderPostMessage = __toESM(require("./visualBuilderPostMessage.cjs"), 1);
async function getWorkflowStageDetails({
  entryUid,
  contentTypeUid,
  locale,
  variantUid
}) {
  var _a;
  try {
    const result = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      import_postMessage.VisualBuilderPostMessageEvents.GET_WORKFLOW_STAGE_DETAILS,
      {
        entryUid,
        contentTypeUid,
        locale,
        variantUid
      }
    ));
    if (result) {
      return result;
    }
  } catch (e) {
    console.debug(
      "[Visual Builder] Error fetching workflow stage details",
      e
    );
  }
  return {
    stage: {
      name: "Unknown"
    },
    permissions: {
      entry: {
        update: true
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWorkflowStageDetails
});
//# sourceMappingURL=getWorkflowStageDetails.cjs.map