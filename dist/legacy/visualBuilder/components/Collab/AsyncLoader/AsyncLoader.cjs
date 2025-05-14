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

// src/visualBuilder/components/Collab/AsyncLoader/AsyncLoader.tsx
var AsyncLoader_exports = {};
__export(AsyncLoader_exports, {
  default: () => AsyncLoader_default
});
module.exports = __toCommonJS(AsyncLoader_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var AsyncLoader = ({
  className,
  color = "primary",
  testId = "collab-async-loader",
  ...otherProps
}) => {
  const combinedClassName = (0, import_classnames.default)(
    (0, import_collab.collabStyles)()["collab-button--loader--animation"],
    (0, import_collab.collabStyles)()["collab-button--loading--color"][color],
    "collab-button--loader--animation",
    `collab-button--loading--${color}`
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-button--loader",
        (0, import_collab.collabStyles)()["collab-button--loader"],
        className
      ),
      ...otherProps,
      "data-testid": testId,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: combinedClassName }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: combinedClassName }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: combinedClassName })
      ]
    }
  );
};
var AsyncLoader_default = AsyncLoader;
//# sourceMappingURL=AsyncLoader.cjs.map