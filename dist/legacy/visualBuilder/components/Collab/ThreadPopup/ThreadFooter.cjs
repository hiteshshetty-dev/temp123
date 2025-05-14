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

// src/visualBuilder/components/Collab/ThreadPopup/ThreadFooter.tsx
var ThreadFooter_exports = {};
__export(ThreadFooter_exports, {
  default: () => ThreadFooter_default
});
module.exports = __toCommonJS(ThreadFooter_exports);
var import_hooks = require("preact/hooks");
var import_Button = __toESM(require("../Button/Button.cjs"), 1);
var import_ButtonGroup = __toESM(require("../ButtonGroup/ButtonGroup.cjs"), 1);
var import_classnames = __toESM(require("classnames"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var ThreadFooter = ({
  onClose,
  handleOnSaveRef,
  isDisabled,
  editComment
}) => {
  const [loading, setLoading] = (0, import_hooks.useState)(false);
  const onSubmit = async (event) => {
    var _a;
    setLoading(true);
    event.preventDefault();
    await ((_a = handleOnSaveRef.current) == null ? void 0 : _a.call(handleOnSaveRef));
    setLoading(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-thread-footer--wrapper",
        "flex-v-center",
        (0, import_collab.collabStyles)()["collab-thread-footer--wrapper"],
        import_collab.flexAlignCenter
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ButtonGroup.default, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Button.default,
          {
            type: "button",
            buttonType: "tertiary",
            testId: "thread-cancel-btn",
            onClick: () => onClose(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Button.default,
          {
            type: "button",
            buttonType: "primary",
            onClick: onSubmit,
            testId: "thread-save-btn",
            disabled: isDisabled || loading,
            isLoading: loading,
            children: editComment === "" ? "Post" : "Update"
          }
        )
      ] })
    }
  );
};
var ThreadFooter_default = ThreadFooter;
//# sourceMappingURL=ThreadFooter.cjs.map