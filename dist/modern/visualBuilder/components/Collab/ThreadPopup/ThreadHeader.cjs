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

// src/visualBuilder/components/Collab/ThreadPopup/ThreadHeader.tsx
var ThreadHeader_exports = {};
__export(ThreadHeader_exports, {
  default: () => ThreadHeader_default
});
module.exports = __toCommonJS(ThreadHeader_exports);
var import_compat = __toESM(require("preact/compat"), 1);
var import_hooks = require("preact/hooks");
var import_classnames = __toESM(require("classnames"), 1);
var import_ThreadActionBar = __toESM(require("./ThreadActionBar.cjs"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var ThreadHeader = import_compat.default.memo(
  ({ onClose, displayResolve, onResolve, commentCount, activeThread }) => {
    const [isResolving, setIsResolving] = (0, import_hooks.useState)(false);
    const handleResolve = (0, import_hooks.useCallback)(async () => {
      if (isResolving) return;
      try {
        setIsResolving(true);
        const payload = {
          threadUid: activeThread._id,
          payload: { threadState: 2 }
        };
        await onResolve(payload);
      } finally {
        onClose(true);
        setIsResolving(false);
      }
    }, [activeThread, isResolving, onResolve, onClose]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)(
          "collab-thread-header--wrapper",
          "flex-v-center",
          (0, import_collab.collabStyles)()["collab-thread-header--wrapper"],
          import_collab.flexAlignCenter
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_classnames.default)(
              "collab-thread-header--container",
              "flex-v-center",
              (0, import_collab.collabStyles)()["collab-thread-header--container"],
              import_collab.flexAlignCenter
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_ThreadActionBar.default,
              {
                commentCount,
                displayResolve,
                handleResolve,
                isResolving
              }
            )
          }
        )
      }
    );
  }
);
var ThreadHeader_default = ThreadHeader;
//# sourceMappingURL=ThreadHeader.cjs.map