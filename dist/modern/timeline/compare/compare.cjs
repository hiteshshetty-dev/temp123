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

// src/timeline/compare/compare.ts
var compare_exports = {};
__export(compare_exports, {
  handleWebCompare: () => handleWebCompare
});
module.exports = __toCommonJS(compare_exports);
var import_timelinePostMessage = __toESM(require("../timelinePostMessage/timelinePostMessage.cjs"), 1);
var import_timelinePostMessage2 = require("../timelinePostMessage/timelinePostMessage.constant.cjs");
var import_compare = require("./compare.style.cjs");
var voidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var LEAF_CSLP_SELECTOR = "[data-cslp]:not(:has([data-cslp]))";
var DIFF_WRAPPER = "cs-compare";
function registerCompareElement() {
  class Compare extends HTMLSpanElement {
    constructor() {
      super();
    }
  }
  if (!customElements.get(DIFF_WRAPPER)) {
    customElements.define(DIFF_WRAPPER, Compare, {
      extends: "span"
    });
  }
}
function handleWebCompare() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  (0, import_compare.compareGlobalStyles)();
  registerCompareElement();
  import_timelinePostMessage.default?.on(
    import_timelinePostMessage2.timelinePostMessageEvents.SEND_CURRENT_BASE_ROUTE,
    async () => {
      return { url: window.location.href.split("?")[0] };
    }
  );
  import_timelinePostMessage.default?.on(
    import_timelinePostMessage2.timelinePostMessageEvents.SEND_CSLP_DATA,
    async () => {
      const elements = Array.from(
        document.querySelectorAll(LEAF_CSLP_SELECTOR)
      );
      const map = {};
      for (const element of elements) {
        const cslp = element.getAttribute("data-cslp");
        if (element.hasAttributes() && voidElements.has(element.tagName.toLowerCase())) {
          let attributes = "";
          for (const attr of element.attributes) {
            attributes += `${attr.name} -> ${attr.value}
`;
          }
          map[cslp] = attributes;
        } else {
          map[cslp] = element.innerHTML;
        }
      }
      return map;
    }
  );
  const mergeColors = (className = ".cs-compare--added") => {
    const elements = Array.from(document.querySelectorAll(className));
    for (let i = 1; i < elements.length; i++) {
      const prev = elements[i - 1];
      const next = elements[i];
      if (prev.nextElementSibling === next)
        prev.appendChild(prev.nextSibling);
    }
  };
  import_timelinePostMessage.default?.on(import_timelinePostMessage2.timelinePostMessageEvents.DIFF_VALUE, async (event) => {
    const { diff, type } = event.data;
    const operation = type === "base" ? "removed" : "added";
    const elements = Array.from(
      document.querySelectorAll(LEAF_CSLP_SELECTOR)
    );
    for (const element of elements) {
      const path = element.getAttribute("data-cslp");
      if (!diff[path]) continue;
      if (voidElements.has(element.tagName.toLowerCase())) {
        element.classList.add(`cs-compare__void--${operation}`);
      } else {
        element.innerHTML = diff[path];
      }
    }
    ;
    mergeColors(`.cs-compare--${operation}`);
  });
  import_timelinePostMessage.default?.on(import_timelinePostMessage2.timelinePostMessageEvents.REMOVE_DIFF, async () => {
    const elements = Array.from(document.querySelectorAll("cs-compare"));
    for (const element of elements) {
      const parent = element.parentElement;
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);
    }
    const voidElements2 = Array.from(
      document.querySelectorAll(
        ".cs-compare__void--added, .cs-compare__void--removed"
      )
    );
    for (const element of voidElements2) {
      element.classList.remove("cs-compare__void--added");
      element.classList.remove("cs-compare__void--removed");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleWebCompare
});
//# sourceMappingURL=compare.cjs.map