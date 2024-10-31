import "../chunk-5WRI5ZAA.js";

// src/livePreview/removeFromOnChangeSubscribers.ts
import { PublicLogger } from "../logger/logger.js";
function removeFromOnChangeSubscribers(callbackStack, callback) {
  if (typeof callback === "string") {
    if (!callbackStack[callback]) {
      PublicLogger.warn("No subscriber found with the given id.");
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
      PublicLogger.warn("No subscriber found with the given callback.");
    }
  }
}
export {
  removeFromOnChangeSubscribers
};
//# sourceMappingURL=removeFromOnChangeSubscribers.js.map