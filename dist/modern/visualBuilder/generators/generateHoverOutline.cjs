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

// src/visualBuilder/generators/generateHoverOutline.tsx
var generateHoverOutline_exports = {};
__export(generateHoverOutline_exports, {
  addHoverOutline: () => addHoverOutline
});
module.exports = __toCommonJS(generateHoverOutline_exports);
var import_visualBuilder = require("../visualBuilder.style.cjs");
function addHoverOutline(targetElement, disabled, isVariant) {
  const targetElementDimension = targetElement.getBoundingClientRect();
  const hoverOutline = document.querySelector(
    ".visual-builder__hover-outline"
  );
  if (hoverOutline) {
    hoverOutline.classList.remove(
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--hidden"]
    );
    if (disabled) {
      hoverOutline.classList.add(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--disabled"]
      );
    } else {
      hoverOutline.classList.remove(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--disabled"]
      );
      if (isVariant) {
        hoverOutline.classList.add(
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--variant"]
        );
      } else {
        hoverOutline.classList.remove(
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--variant"]
        );
      }
    }
    hoverOutline.style.top = `${targetElementDimension.top + window.scrollY}px`;
    hoverOutline.style.left = `${targetElementDimension.left}px`;
    hoverOutline.style.width = `${targetElementDimension.width}px`;
    hoverOutline.style.height = `${targetElementDimension.height}px`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addHoverOutline
});
//# sourceMappingURL=generateHoverOutline.cjs.map