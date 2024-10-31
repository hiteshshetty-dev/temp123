import "../../chunk-5WRI5ZAA.js";

// src/timeline/compare/compare.ts
import timelinePostMessage from "../timelinePostMessage/timelinePostMessage.js";
import { timelinePostMessageEvents } from "../timelinePostMessage/timelinePostMessage.constant.js";
import { compareGlobalStyles } from "./compare.style.js";
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
  var _a, _b, _c, _d;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  compareGlobalStyles();
  registerCompareElement();
  (_a = timelinePostMessage) == null ? void 0 : _a.on(
    timelinePostMessageEvents.SEND_CURRENT_BASE_ROUTE,
    async () => {
      return { url: window.location.href.split("?")[0] };
    }
  );
  (_b = timelinePostMessage) == null ? void 0 : _b.on(
    timelinePostMessageEvents.SEND_CSLP_DATA,
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
  (_c = timelinePostMessage) == null ? void 0 : _c.on(timelinePostMessageEvents.DIFF_VALUE, async (event) => {
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
  (_d = timelinePostMessage) == null ? void 0 : _d.on(timelinePostMessageEvents.REMOVE_DIFF, async () => {
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
export {
  handleWebCompare
};
//# sourceMappingURL=compare.js.map