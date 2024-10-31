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

// src/visualBuilder/eventManager/useDraftFieldsPostMessageEvent.ts
var useDraftFieldsPostMessageEvent_exports = {};
__export(useDraftFieldsPostMessageEvent_exports, {
  useDraftFieldsPostMessageEvent: () => useDraftFieldsPostMessageEvent
});
module.exports = __toCommonJS(useDraftFieldsPostMessageEvent_exports);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
function removeDraftFieldClass() {
  const draftFieldElements = document.querySelectorAll(
    `.${(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__draft-field"]}`
  );
  draftFieldElements.forEach((element) => {
    element.classList.remove(
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__draft-field"]
    );
  });
}
function addDraftFieldClass(fields) {
  fields.forEach((field) => {
    const element = document.querySelector(`[data-cslp="${field}"]`);
    if (element) {
      element.classList.add(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__draft-field"]
      );
    }
  });
}
function useDraftFieldsPostMessageEvent() {
  import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.SHOW_DRAFT_FIELDS,
    (event) => {
      removeDraftFieldClass();
      addDraftFieldClass(event.data.fields);
    }
  );
  import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.REMOVE_DRAFT_FIELDS,
    () => {
      removeDraftFieldClass();
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDraftFieldsPostMessageEvent
});
//# sourceMappingURL=useDraftFieldsPostMessageEvent.cjs.map