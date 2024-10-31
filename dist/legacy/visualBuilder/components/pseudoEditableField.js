import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/pseudoEditableField.tsx
import classNames from "classnames";
import getCamelCaseStyles from "../utils/getCamelCaseStyles.js";
import getStyleOfAnElement from "../utils/getStyleOfAnElement.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { jsx } from "preact/jsx-runtime";
function PseudoEditableFieldComponent(props) {
  const styles = getCamelCaseStyles(
    getStyleOfAnElement(props.editableElement)
  );
  const rect = props.editableElement.getBoundingClientRect();
  styles.position = "absolute";
  styles.top = `${rect.top + window.scrollY}px`;
  styles.left = `${rect.left + window.scrollX}px`;
  styles.height = "auto";
  styles.whiteSpace = "pre-line";
  styles.textTransform = "none";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames("visual-builder__pseudo-editable-element", visualBuilderStyles()["visual-builder__pseudo-editable-element"]),
      "data-testid": "visual-builder__pseudo-editable-element",
      style: styles,
      children: props.config.textContent
    }
  );
}
var pseudoEditableField_default = PseudoEditableFieldComponent;
export {
  pseudoEditableField_default as default
};
//# sourceMappingURL=pseudoEditableField.js.map