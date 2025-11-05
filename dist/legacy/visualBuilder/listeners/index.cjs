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

// src/visualBuilder/listeners/index.ts
var listeners_exports = {};
__export(listeners_exports, {
  addEventListeners: () => addEventListeners,
  removeEventListeners: () => removeEventListeners
});
module.exports = __toCommonJS(listeners_exports);
var import__ = require("../index.cjs");
var import_generateToolbar = require("../generators/generateToolbar.cjs");
var import_mouseClick = __toESM(require("./mouseClick.cjs"), 1);
var import_mouseHover = __toESM(require("./mouseHover.cjs"), 1);
var eventHandlers = {
  click: (params) => (event) => {
    (0, import_mouseClick.default)({
      event,
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      previousSelectedEditableDOM: import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
      focusedToolbar: params.focusedToolbar,
      resizeObserver: params.resizeObserver
    });
  },
  mousemove: (params) => (event) => {
    (0, import_mouseHover.default)({
      event,
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      customCursor: params.customCursor,
      resizeObserver: params.resizeObserver,
      focusedToolbar: params.focusedToolbar
    });
  },
  mouseleave: (params) => () => {
    var _a, _b, _c;
    (0, import_mouseHover.cancelPendingMouseHover)();
    (0, import_mouseHover.cancelPendingHoverToolbar)();
    (0, import_mouseHover.cancelPendingAddOutline)();
    (0, import_mouseHover.hideCustomCursor)(params.customCursor);
    (0, import_mouseHover.hideHoverOutline)(params.visualBuilderContainer);
    if (!((_c = (_b = (_a = import__.VisualBuilder) == null ? void 0 : _a.VisualBuilderGlobalState) == null ? void 0 : _b.value) == null ? void 0 : _c.isFocussed) && (params == null ? void 0 : params.focusedToolbar)) {
      (0, import_generateToolbar.removeFieldToolbar)(params.focusedToolbar);
    }
  },
  mouseenter: (params) => () => {
    (0, import_mouseHover.showCustomCursor)(params.customCursor);
  }
};
var eventListenersMap = /* @__PURE__ */ new Map();
function addEventListeners(params) {
  const clickHandler = eventHandlers.click(params);
  const mousemoveHandler = eventHandlers.mousemove(params);
  const mouseleaveHandler = eventHandlers.mouseleave(params);
  const mouseenterHandler = eventHandlers.mouseenter(params);
  eventListenersMap.set("click", clickHandler);
  eventListenersMap.set("mousemove", mousemoveHandler);
  eventListenersMap.set("mouseleave", mouseleaveHandler);
  eventListenersMap.set("mouseenter", mouseenterHandler);
  window.addEventListener("click", clickHandler, { capture: true });
  window.addEventListener("mousemove", mousemoveHandler);
  document.documentElement.addEventListener("mouseleave", mouseleaveHandler);
  document.documentElement.addEventListener("mouseenter", mouseenterHandler);
}
function removeEventListeners(params) {
  const clickHandler = eventListenersMap.get("click");
  const mousemoveHandler = eventListenersMap.get("mousemove");
  const mouseleaveHandler = eventListenersMap.get("mouseleave");
  const mouseenterHandler = eventListenersMap.get("mouseenter");
  if (clickHandler) {
    window.removeEventListener("click", clickHandler, { capture: true });
  }
  if (mousemoveHandler) {
    window.removeEventListener("mousemove", mousemoveHandler);
  }
  if (mouseleaveHandler) {
    document.documentElement.removeEventListener(
      "mouseleave",
      mouseleaveHandler
    );
  }
  if (mouseenterHandler) {
    document.documentElement.removeEventListener(
      "mouseenter",
      mouseenterHandler
    );
  }
  eventListenersMap.clear();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addEventListeners,
  removeEventListeners
});
//# sourceMappingURL=index.cjs.map