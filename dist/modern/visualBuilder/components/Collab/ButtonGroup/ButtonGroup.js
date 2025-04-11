import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ButtonGroup/ButtonGroup.tsx
import cn from "classnames";
import { collabStyles } from "../../../collab.style.js";
import { jsx } from "preact/jsx-runtime";
var ButtonGroup = (props) => {
  const { className, children, style, testId, ...otherProps } = props;
  const classNames = cn(
    "collab-button-group",
    collabStyles()["collab-button-group"],
    className
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames,
      style,
      "data-testid": testId,
      ...otherProps,
      children
    }
  );
};
ButtonGroup.defaultProps = {
  testId: "collab-button-group"
};
var ButtonGroup_default = ButtonGroup;
export {
  ButtonGroup_default as default
};
//# sourceMappingURL=ButtonGroup.js.map