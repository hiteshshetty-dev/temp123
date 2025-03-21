import "../chunk-5WRI5ZAA.js";

// src/utils/compare.ts
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
export {
  registerCompareElement
};
//# sourceMappingURL=compare.js.map