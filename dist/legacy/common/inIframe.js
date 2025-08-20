import "../chunk-5WRI5ZAA.js";

// src/common/inIframe.ts
import { hasWindow } from "../utils/index.js";
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
function isOpeningInNewTab() {
  try {
    if (hasWindow()) {
      return !!window.opener;
    }
    return false;
  } catch (e) {
    return false;
  }
}
export {
  inIframe,
  isOpeningInNewTab
};
//# sourceMappingURL=inIframe.js.map