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

// src/visualBuilder/components/pseudoEditableField.tsx
var pseudoEditableField_exports = {};
__export(pseudoEditableField_exports, {
  default: () => pseudoEditableField_default
});
module.exports = __toCommonJS(pseudoEditableField_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_getPsuedoEditableStylesElement = require("../utils/getPsuedoEditableStylesElement.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function PseudoEditableFieldComponent(props) {
  const styles = (0, import_getPsuedoEditableStylesElement.getPsuedoEditableElementStyles)(props.editableElement, true);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_classnames.default)(
        "visual-builder__pseudo-editable-element",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__pseudo-editable-element"]
      ),
      "data-testid": "visual-builder__pseudo-editable-element",
      style: styles,
      children: props.config.textContent
    }
  );
}
var pseudoEditableField_default = PseudoEditableFieldComponent;
//# sourceMappingURL=pseudoEditableField.cjs.map