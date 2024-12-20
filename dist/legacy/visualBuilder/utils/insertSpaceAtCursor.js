import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/insertSpaceAtCursor.ts
import { unicodeNonBreakingSpace } from "./constants.js";
function insertSpaceAtCursor(element) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const spaceNode = document.createTextNode(unicodeNonBreakingSpace);
    range.deleteContents();
    range.insertNode(spaceNode);
    range.setStartAfter(spaceNode);
    range.setEndAfter(spaceNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
export {
  insertSpaceAtCursor
};
//# sourceMappingURL=insertSpaceAtCursor.js.map