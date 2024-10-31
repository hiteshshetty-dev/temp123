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

// src/visualBuilder/generators/generatePseudoEditableField.tsx
var generatePseudoEditableField_exports = {};
__export(generatePseudoEditableField_exports, {
  generatePseudoEditableElement: () => generatePseudoEditableElement,
  isEllipsisActive: () => isEllipsisActive
});
module.exports = __toCommonJS(generatePseudoEditableField_exports);
var import_preact = require("preact");
var import_pseudoEditableField = __toESM(require("../components/pseudoEditableField.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
function isEllipsisActive(element) {
  return element.offsetWidth < element.scrollWidth;
}
function generatePseudoEditableElement(elements, config) {
  const { editableElement } = elements;
  const visualBuilderContainer = document.querySelector(
    ".visual-builder__container"
  );
  const wrapper = document.createDocumentFragment();
  (0, import_preact.render)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_pseudoEditableField.default,
      {
        editableElement,
        config
      }
    ),
    wrapper
  );
  visualBuilderContainer == null ? void 0 : visualBuilderContainer.appendChild(wrapper);
  const pseudoEditableElement = document.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  return pseudoEditableElement;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generatePseudoEditableElement,
  isEllipsisActive
});
//# sourceMappingURL=generatePseudoEditableField.cjs.map