import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getStyleOfAnElement.ts
function getStyleOfAnElement(element) {
  const styleSheetDeclaration = window.getComputedStyle(element);
  const styleSheetArray = Array.from(styleSheetDeclaration);
  const FILTER_STYLES = [
    "position",
    "left",
    "top",
    "right",
    "bottom",
    "text-overflow",
    // allows seeing the text from CMS field as-is
    "text-transform",
    "margin",
    "margin-block-end",
    "margin-block-start",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin-bottom",
    "-webkit-user-modify",
    "cursor"
  ];
  const styles = {};
  styleSheetArray.forEach((style) => {
    if (!FILTER_STYLES.includes(style)) {
      const styleValue = styleSheetDeclaration.getPropertyValue(style);
      styles[style] = styleValue;
    }
  });
  return styles;
}
export {
  getStyleOfAnElement as default
};
//# sourceMappingURL=getStyleOfAnElement.js.map