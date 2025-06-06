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

// src/visualBuilder/eventManager/useHideFocusOverlayPostMessageEvent.ts
var useHideFocusOverlayPostMessageEvent_exports = {};
__export(useHideFocusOverlayPostMessageEvent_exports, {
  useHideFocusOverlayPostMessageEvent: () => useHideFocusOverlayPostMessageEvent
});
module.exports = __toCommonJS(useHideFocusOverlayPostMessageEvent_exports);
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
function useHideFocusOverlayPostMessageEvent({
  visualBuilderContainer,
  overlayWrapper,
  focusedToolbar,
  resizeObserver
}) {
  var _a;
  (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.on(
    import_postMessage.VisualBuilderPostMessageEvents.HIDE_FOCUS_OVERLAY,
    (args) => {
      var _a2, _b;
      if (Boolean((_a2 = args == null ? void 0 : args.data) == null ? void 0 : _a2.fromCollab)) {
        import_configManager.default.set("collab.enable", true);
        import_configManager.default.set("collab.pauseFeedback", true);
      }
      (0, import_generateOverlay.hideOverlay)({
        visualBuilderOverlayWrapper: overlayWrapper,
        visualBuilderContainer,
        focusedToolbar,
        resizeObserver,
        noTrigger: Boolean((_b = args == null ? void 0 : args.data) == null ? void 0 : _b.noTrigger)
      });
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useHideFocusOverlayPostMessageEvent
});
//# sourceMappingURL=useHideFocusOverlayPostMessageEvent.cjs.map