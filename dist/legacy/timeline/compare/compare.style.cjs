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

// src/timeline/compare/compare.style.ts
var compare_style_exports = {};
__export(compare_style_exports, {
  compareGlobalStyles: () => compareGlobalStyles
});
module.exports = __toCommonJS(compare_style_exports);
var import_goober = require("goober");
var compareGlobalStyles = () => {
  const css = import_goober.glob;
  css`
        cs-compare {
            &.cs-compare--added {
                background: rgba(0, 122, 82, 0.2);
                border-bottom: 2px solid rgba(0, 122, 82);
            }

            &.cs-compare--removed {
                background: rgba(214, 36, 0, 0.2);
                text-decoration: line-through 2px solid rgba(214, 36, 0, 1);
            }
        }
        .cs-compare__void--added {
            background: rgba(0, 122, 82, 0.2);
            outline: 2px solid rgba(0, 122, 82);
        }

        .cs-compare__void--removed {
            background: rgba(214, 36, 0, 0.2);
            outline: 2px solid rgba(214, 36, 0, 1);
        }
    `;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compareGlobalStyles
});
//# sourceMappingURL=compare.style.cjs.map