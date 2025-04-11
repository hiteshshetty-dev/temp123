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

// src/visualBuilder/components/Collab/ThreadPopup/ThreadActionBar.tsx
var ThreadActionBar_exports = {};
__export(ThreadActionBar_exports, {
  default: () => ThreadActionBar_default
});
module.exports = __toCommonJS(ThreadActionBar_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_Button = __toESM(require("../Button/Button.cjs"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_collabUtils = require("../../../utils/collabUtils.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var ThreadActionBar = ({
  commentCount,
  displayResolve,
  handleResolve,
  isResolving
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)(
          "collab-thread-header--title",
          (0, import_collab.collabStyles)()["collab-thread-header--title"]
        ),
        children: (0, import_collabUtils.getThreadTitle)(commentCount)
      }
    ),
    displayResolve && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_Button.default,
      {
        buttonType: "tertiary",
        className: (0, import_classnames.default)(
          "collab-thread-header--resolve",
          (0, import_collab.collabStyles)()["collab-thread-header--resolve"]
        ),
        icon: "RightMarkActive",
        iconProps: {
          className: (0, import_classnames.default)(
            (0, import_collab.collabStyles)()["collab-thread-header--resolve--icon"],
            "collab-thread-header--resolve--icon"
          )
        },
        onClick: handleResolve,
        testId: "collab-thread-resolve-btn",
        isLoading: isResolving,
        loadingColor: "secondary",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_classnames.default)(
              "collab-thread-header--resolve--text",
              (0, import_collab.collabStyles)()["collab-thread-header--resolve--text"]
            ),
            children: "Resolve"
          }
        )
      }
    )
  ] });
};
var ThreadActionBar_default = ThreadActionBar;
//# sourceMappingURL=ThreadActionBar.cjs.map