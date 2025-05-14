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

// src/visualBuilder/components/emptyBlock.tsx
var emptyBlock_exports = {};
__export(emptyBlock_exports, {
  EmptyBlock: () => EmptyBlock
});
module.exports = __toCommonJS(emptyBlock_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_multipleElementAddButton = require("../utils/multipleElementAddButton.cjs");
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function EmptyBlock(props) {
  const { details } = props;
  const blockParentName = details.fieldSchema.display_name;
  async function sendAddInstanceEvent() {
    await import_visualBuilderPostMessage.default?.send(
      import_postMessage.VisualBuilderPostMessageEvents.ADD_INSTANCE,
      {
        fieldMetadata: details.fieldMetadata,
        index: 0
      }
    );
    (0, import_multipleElementAddButton.observeParentAndFocusNewInstance)({
      parentCslp: details.fieldMetadata.cslpValue,
      index: 0
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "visual-builder__empty-block",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__empty-block"]
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: (0, import_classnames.default)(
              "visual-builder__empty-block-title",
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__empty-block-title"]
            ),
            children: [
              "There are no ",
              blockParentName.toLowerCase(),
              " on this page yet. Click the button below to add one."
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            className: (0, import_classnames.default)(
              "visual-builder__empty-block-add-button",
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__empty-block-add-button"]
            ),
            onClick: () => sendAddInstanceEvent(),
            type: "button",
            "data-testid": "visual-builder__empty-block-add-button",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fas fa-plus" }),
              " \xA0",
              blockParentName
            ]
          }
        )
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyBlock
});
//# sourceMappingURL=emptyBlock.cjs.map