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

// src/visualBuilder/components/icons/loading.tsx
var loading_exports = {};
__export(loading_exports, {
  LoadingIcon: () => LoadingIcon
});
module.exports = __toCommonJS(loading_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../../visualBuilder.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function LoadingIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: (0, import_classnames.default)(
        "visual-builder__cursor-icon--loader loader",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__cursor-icon--loader"]
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.5023 18.3501C13.5466 19.6388 11.2007 20.2002 8.87354 19.9364C6.54637 19.6725 4.38563 18.6002 2.76808 16.9065C1.15053 15.2127 0.178807 13.0049 0.0223406 10.6681C-0.134126 8.33122 0.534595 6.0136 1.9119 4.1193C3.2892 2.22501 5.2877 0.874235 7.55893 0.302518C9.83015 -0.2692 12.23 -0.0255895 14.34 0.990871C16.45 2.00733 18.1363 3.73215 19.1048 5.86457C20.0734 7.997 20.2627 10.4017 19.6399 12.6595L17.7119 12.1276C18.2102 10.3214 18.0587 8.3976 17.2839 6.69166C16.509 4.98572 15.16 3.60586 13.472 2.7927C11.784 1.97953 9.86412 1.78464 8.04714 2.24201C6.23016 2.69939 4.63136 3.78001 3.52952 5.29544C2.42768 6.81088 1.8927 8.66498 2.01787 10.5345C2.14305 12.4039 2.92043 14.1702 4.21446 15.5252C5.5085 16.8802 7.23709 17.738 9.09883 17.9491C10.9606 18.1601 12.8373 17.711 14.4018 16.6801L15.5023 18.3501Z" })
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoadingIcon
});
//# sourceMappingURL=loading.cjs.map