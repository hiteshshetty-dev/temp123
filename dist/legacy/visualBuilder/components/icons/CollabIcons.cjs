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

// src/visualBuilder/components/icons/CollabIcons.tsx
var CollabIcons_exports = {};
__export(CollabIcons_exports, {
  iconComponents: () => iconComponents
});
module.exports = __toCommonJS(CollabIcons_exports);
var import_jsx_runtime = require("preact/jsx-runtime");
var iconComponents = {
  Cancel: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ...props,
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          class: "collab-icon__svg",
          d: "M25.5303 7.53033C25.8232 7.23744 25.8232 6.76256 25.5303 6.46967C25.2374 6.17678 24.7626 6.17678 24.4697 6.46967L16 14.9393L7.53033 6.46967C7.23744 6.17678 6.76256 6.17678 6.46967 6.46967C6.17678 6.76256 6.17678 7.23744 6.46967 7.53033L14.9393 16L6.46967 24.4697C6.17678 24.7626 6.17678 25.2374 6.46967 25.5303C6.76256 25.8232 7.23744 25.8232 7.53033 25.5303L16 17.0607L24.4697 25.5303C24.7626 25.8232 25.2374 25.8232 25.5303 25.5303C25.8232 25.2374 25.8232 24.7626 25.5303 24.4697L17.0607 16L25.5303 7.53033Z",
          fill: "#475161"
        }
      )
    }
  ),
  Delete: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      ...props,
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            class: "collab-icon__svg",
            d: "M4.25 7C4.25 6.58579 4.58579 6.25 5 6.25H27C27.4142 6.25 27.75 6.58579 27.75 7C27.75 7.41421 27.4142 7.75 27 7.75H5C4.58579 7.75 4.25 7.41421 4.25 7Z",
            fill: "#475161"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            class: "collab-icon__svg",
            d: "M13 12.25C13.4142 12.25 13.75 12.5858 13.75 13V21C13.75 21.4142 13.4142 21.75 13 21.75C12.5858 21.75 12.25 21.4142 12.25 21V13C12.25 12.5858 12.5858 12.25 13 12.25Z",
            fill: "#475161"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            class: "collab-icon__svg",
            d: "M19 12.25C19.4142 12.25 19.75 12.5858 19.75 13V21C19.75 21.4142 19.4142 21.75 19 21.75C18.5858 21.75 18.25 21.4142 18.25 21V13C18.25 12.5858 18.5858 12.25 19 12.25Z",
            fill: "#475161"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            class: "collab-icon__svg",
            d: "M7 6.25C7.41421 6.25 7.75 6.58579 7.75 7V26C7.75 26.0663 7.77634 26.1299 7.82322 26.1768C7.87011 26.2237 7.93369 26.25 8 26.25H24C24.0663 26.25 24.1299 26.2237 24.1768 26.1768C24.2237 26.1299 24.25 26.0663 24.25 26V7C24.25 6.58579 24.5858 6.25 25 6.25C25.4142 6.25 25.75 6.58579 25.75 7V26C25.75 26.4641 25.5656 26.9092 25.2374 27.2374C24.9092 27.5656 24.4641 27.75 24 27.75H8C7.53587 27.75 7.09075 27.5656 6.76256 27.2374C6.43437 26.9092 6.25 26.4641 6.25 26V7C6.25 6.58579 6.58579 6.25 7 6.25Z",
            fill: "#475161"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            class: "collab-icon__svg",
            d: "M11.0555 3.05546C11.5712 2.53973 12.2707 2.25 13 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V7C21.75 7.41421 21.4142 7.75 21 7.75C20.5858 7.75 20.25 7.41421 20.25 7V5C20.25 4.66848 20.1183 4.35054 19.8839 4.11612C19.6495 3.8817 19.3315 3.75 19 3.75H13C12.6685 3.75 12.3505 3.8817 12.1161 4.11612C11.8817 4.35054 11.75 4.66848 11.75 5V7C11.75 7.41421 11.4142 7.75 11 7.75C10.5858 7.75 10.25 7.41421 10.25 7V5C10.25 4.27065 10.5397 3.57118 11.0555 3.05546Z",
            fill: "#475161"
          }
        )
      ]
    }
  ),
  Edit: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ...props,
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          class: "collab-icon__svg",
          d: "M4.7778 20.5072C4.47473 20.8102 4.29342 21.214 4.26826 21.6418L4.00309 26.1497C3.94156 27.1957 4.80682 28.0609 5.85284 27.9994L10.3606 27.7342C10.7885 27.7091 11.1922 27.5278 11.4953 27.2247L27.4899 11.2301C28.1733 10.5467 28.1733 9.43862 27.4899 8.7552L23.2473 4.51256C22.5639 3.82915 21.4558 3.82915 20.7724 4.51256L4.7778 20.5072ZM5.76567 21.7299C5.76926 21.6688 5.79516 21.6111 5.83846 21.5678L18.9336 8.4727L23.327 12.8661C23.3988 12.9379 23.4816 12.9921 23.57 13.0287L10.4347 26.164C10.3914 26.2073 10.3337 26.2332 10.2726 26.2368L5.76475 26.502C5.61532 26.5108 5.49171 26.3872 5.5005 26.2377L5.76567 21.7299ZM24.5503 12.0484L26.4293 10.1694C26.5269 10.0718 26.5269 9.9135 26.4293 9.81586L22.1866 5.57322C22.089 5.47559 21.9307 5.47559 21.8331 5.57322L19.9943 7.41204L24.3876 11.8054C24.4595 11.8772 24.5137 11.96 24.5503 12.0484Z",
          fill: "#475161"
        }
      )
    }
  ),
  RightMarkActive: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          class: "collab-icon__svg",
          d: "M17.2065 5.29354C17.3895 5.4766 17.3895 5.7734 17.2065 5.95646L8.45646 14.7065C8.2734 14.8895 7.9766 14.8895 7.79354 14.7065L3.41854 10.3315C3.23549 10.1484 3.23549 9.8516 3.41854 9.66854C3.6016 9.48549 3.8984 9.48549 4.08146 9.66854L8.125 13.7121L16.5435 5.29354C16.7266 5.11049 17.0234 5.11049 17.2065 5.29354Z",
          fill: "#6C5CE7"
        }
      )
    }
  ),
  Indicator: ({ active }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      width: active ? "25" : "24",
      height: "24",
      viewBox: `0 0 ${active ? 25 : 24} 24`,
      fill: "none",
      class: "collab-icon",
      xmlns: "http://www.w3.org/2000/svg",
      style: { marginTop: "2px" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            class: "collab-icon__svg",
            d: "M8.4375 9C8.4375 8.68934 8.68934 8.4375 9 8.4375H15C15.3107 8.4375 15.5625 8.68934 15.5625 9C15.5625 9.31066 15.3107 9.5625 15 9.5625H9C8.68934 9.5625 8.4375 9.31066 8.4375 9Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            class: "collab-icon__svg",
            d: "M8.4375 12C8.4375 11.6893 8.68934 11.4375 9 11.4375H15C15.3107 11.4375 15.5625 11.6893 15.5625 12C15.5625 12.3107 15.3107 12.5625 15 12.5625H9C8.68934 12.5625 8.4375 12.3107 8.4375 12Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            class: "collab-icon__svg",
            d: "M3 5.25C3 4.83579 3.33579 4.5 3.75 4.5H20.25C20.6642 4.5 21 4.83579 21 5.25V16.4423C21 16.8565 20.6642 17.1923 20.25 17.1923H14.9804C14.853 17.1923 14.7343 17.257 14.6652 17.3641L12.9633 20.0042C12.6651 20.4669 11.9866 20.4613 11.696 19.9938L10.1746 17.5464C10.0378 17.3262 9.79691 17.1923 9.53766 17.1923H3.75C3.33579 17.1923 3 16.8565 3 16.4423V5.25ZM4.125 16.0673V5.625H19.875V16.0673H14.9804C14.4707 16.0673 13.9958 16.3262 13.7197 16.7546L12.3387 18.8968L11.1301 16.9524C10.7879 16.402 10.1858 16.0673 9.53766 16.0673H4.125Z",
            fill: "white"
          }
        ),
        active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "circle",
            {
              cx: "20",
              cy: "5",
              r: "4",
              fill: "#EB5646",
              class: "collab-icon__svg"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "circle",
            {
              cx: "20",
              cy: "5",
              r: "4.5",
              stroke: "white",
              "stroke-opacity": "0.6",
              class: "collab-icon__svg"
            }
          )
        ] })
      ]
    }
  )
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  iconComponents
});
//# sourceMappingURL=CollabIcons.cjs.map