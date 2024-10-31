import "../chunk-5WRI5ZAA.js";

// src/common/inIframe.ts
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
export {
  inIframe
};
//# sourceMappingURL=inIframe.js.map