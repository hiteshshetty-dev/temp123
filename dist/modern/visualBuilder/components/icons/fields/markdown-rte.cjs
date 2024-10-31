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

// src/visualBuilder/components/icons/fields/markdown-rte.tsx
var markdown_rte_exports = {};
__export(markdown_rte_exports, {
  MarkdownRteIcon: () => MarkdownRteIcon
});
module.exports = __toCommonJS(markdown_rte_exports);
var import_jsx_runtime = require("preact/jsx-runtime");
function MarkdownRteIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "#475161",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.3163 16.1134L11.3051 11.4011L8.9938 15.2831H8.17475L5.87469 11.502V16.1134H4.16928V8.25951H5.67273L8.61232 13.1401L11.507 8.25951H12.9993L13.0217 16.1134H11.3163Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M1.6875 6C1.6875 5.27513 2.27513 4.6875 3 4.6875H21C21.7249 4.6875 22.3125 5.27513 22.3125 6V18C22.3125 18.7249 21.7249 19.3125 21 19.3125H3C2.27513 19.3125 1.6875 18.7249 1.6875 18V6ZM3 5.8125C2.89645 5.8125 2.8125 5.89645 2.8125 6V18C2.8125 18.1036 2.89645 18.1875 3 18.1875H21C21.1036 18.1875 21.1875 18.1036 21.1875 18V6C21.1875 5.89645 21.1036 5.8125 21 5.8125H3Z"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M18.1818 12.408H20.1013L17.4168 16.1134L14.7323 12.408H16.6518V8.27225H18.1818V12.408Z"
          }
        )
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarkdownRteIcon
});
//# sourceMappingURL=markdown-rte.cjs.map