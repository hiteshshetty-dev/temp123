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

// src/livePreview/editButton/editButton.style.ts
var editButton_style_exports = {};
__export(editButton_style_exports, {
  cslpTagStyles: () => cslpTagStyles
});
module.exports = __toCommonJS(editButton_style_exports);
var import_goober = require("goober");
function cslpTagStyles() {
  return {
    "cslp-edit-mode": import_goober.css`
            outline: 1px dashed #6c5ce7 !important;
            position: relative !important;
        `,
    "cslp-tooltip": import_goober.css`
            padding: 0;
            display: flex;
            outline: none;
            border: none;
            z-index: 200 !important;
            position: fixed;
            margin: 0;
            height: 35px;
            width: 72px;
            background: white;
            font-weight: 400 !important;
            color: #718096 !important;
            transition: background 0.2s;
            text-align: center !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0px 8px 20px 0px #2222221a;
            box-sizing: border-box;
            top: -100%;
            & div {
                display: flex;
                justify-content: space-around;
                border-radius: 6px !important;
                cursor: pointer;
            }

            & div.cslp-tooltip-child:hover {
                background: #edf2f7;
            }

            & div.cslp-tooltip-child:active:hover {
                background: #c7d0e1;
            }

            & > div {
                display: flex;
                justify-content: space-evenly;
                white-space: nowrap;
                width: 70px;
            }

            & .cslp-tooltip-child.singular {
                padding: 9px 1px;
            }
        `,
    multiple: import_goober.css`
            & div.cslp-tooltip-child {
                padding: 9px;
            }

            & div.cslp-tooltip-child:before {
                opacity: 0;
                font-size: 12px;
                font-weight: 400;
                pointer-events: none;
                content: attr(data-title);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                position: absolute;
                background: #4a5568;
                top: -30px;
                transition: 0.2s all ease-in-out;
            }

            & div.cslp-tooltip-child:hover:before {
                opacity: 1;
            }
        `
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cslpTagStyles
});
//# sourceMappingURL=editButton.style.cjs.map