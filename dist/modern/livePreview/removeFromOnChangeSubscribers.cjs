"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/livePreview/removeFromOnChangeSubscribers.ts
var removeFromOnChangeSubscribers_exports = {};
__export(removeFromOnChangeSubscribers_exports, {
  removeFromOnChangeSubscribers: () => removeFromOnChangeSubscribers
});
module.exports = __toCommonJS(removeFromOnChangeSubscribers_exports);
var import_logger = require("../logger/logger.cjs");
function removeFromOnChangeSubscribers(callbackStack, callback) {
  if (typeof callback === "string") {
    if (!callbackStack[callback]) {
      import_logger.PublicLogger.warn("No subscriber found with the given id.");
    }
    delete callbackStack[callback];
  } else if (typeof callback === "function") {
    const isCallbackDeleted = Object.entries(
      callbackStack
    ).some(([uid, func]) => {
      if (func === callback) {
        delete callbackStack[uid];
        return true;
      }
      return false;
    });
    if (!isCallbackDeleted) {
      import_logger.PublicLogger.warn("No subscriber found with the given callback.");
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeFromOnChangeSubscribers
});
//# sourceMappingURL=removeFromOnChangeSubscribers.cjs.map