import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getMultilinePlaintext.ts
function getMultilinePlaintext(editableElement) {
  let newValue = "";
  let isOnFreshLine = true;
  function parseChildNodesForValueAndLines(childNodes) {
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      if (childNode.nodeName === "BR") {
        newValue += "\n";
        isOnFreshLine = true;
        continue;
      }
      if (childNode.nodeName === "DIV" && isOnFreshLine === false && i !== 0) {
        newValue += "\n";
      }
      isOnFreshLine = false;
      if (childNode.nodeType === 3 && childNode.textContent && childNode.textContent.trim() !== "") {
        newValue += childNode.textContent;
      }
      parseChildNodesForValueAndLines(childNode.childNodes);
    }
  }
  parseChildNodesForValueAndLines(editableElement.childNodes);
  return newValue;
}
export {
  getMultilinePlaintext
};
//# sourceMappingURL=getMultilinePlaintext.js.map