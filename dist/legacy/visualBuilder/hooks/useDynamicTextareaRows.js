import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/hooks/useDynamicTextareaRows.tsx
import { useEffect } from "preact/compat";
var useDynamicTextareaRows = (selector, dependency, defaultRows = 1, expandedRows = 3) => {
  useEffect(() => {
    const textAreaElement = document.querySelector(selector);
    if (textAreaElement) {
      textAreaElement.setAttribute(
        "rows",
        dependency.length > 0 ? `${expandedRows}` : `${defaultRows}`
      );
    }
    return () => {
      textAreaElement == null ? void 0 : textAreaElement.setAttribute("rows", `${defaultRows}`);
    };
  }, [dependency, selector, defaultRows, expandedRows]);
};
var useDynamicTextareaRows_default = useDynamicTextareaRows;
export {
  useDynamicTextareaRows_default as default
};
//# sourceMappingURL=useDynamicTextareaRows.js.map