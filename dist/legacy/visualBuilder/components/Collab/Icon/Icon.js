import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/Icon/Icon.tsx
import Tooltip from "../Tooltip/Tooltip.js";
import { iconComponents } from "../../icons/CollabIcons.js";
import classNames from "classnames";
import { collabStyles } from "../../../collab.style.js";
import { jsx } from "preact/jsx-runtime";
var IconWrapper = ({
  icon,
  className,
  onClick,
  testId,
  disabled,
  ...otherProps
}) => {
  const IconComponent = iconComponents[icon];
  const handleClick = (e) => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(e);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames(
        "collab-icon-wrapper",
        collabStyles()["collab-icon-wrapper"]
      ),
      onClick: handleClick,
      "data-testid": testId,
      ...otherProps,
      children: IconComponent ? /* @__PURE__ */ jsx(
        IconComponent,
        {
          className: classNames(
            "collab-icon",
            collabStyles()["collab-icon"],
            className
          )
        }
      ) : null
    }
  );
};
var withTooltip = (Component) => ({
  withTooltip: withTooltip2 = false,
  tooltipContent = "",
  testId = "collab-icon",
  ...props
}) => {
  return withTooltip2 && tooltipContent ? /* @__PURE__ */ jsx("div", { "data-testid": testId, children: /* @__PURE__ */ jsx(Tooltip, { content: tooltipContent, position: "bottom", testId: "collab-icon-tooltip", children: /* @__PURE__ */ jsx(Component, { ...props }) }) }) : /* @__PURE__ */ jsx(Component, { ...props, testId });
};
var Icon = withTooltip(IconWrapper);
var Icon_default = Icon;
export {
  Icon_default as default
};
//# sourceMappingURL=Icon.js.map