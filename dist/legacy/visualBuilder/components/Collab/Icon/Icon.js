import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/Icon/Icon.tsx
import Tooltip from "../Tooltip/Tooltip.js";
import { iconComponents } from "../../icons/CollabIcons.js";
import classNames from "classnames";
import { collabStyles } from "../../../collab.style.js";
import { jsx } from "preact/jsx-runtime";
var Icon = (props) => {
  const {
    icon,
    tooltipContent,
    className,
    withTooltip,
    onClick,
    testId,
    ...otherProps
  } = props;
  const IconComponent = iconComponents[icon];
  return withTooltip && tooltipContent ? /* @__PURE__ */ jsx("div", { "data-testid": testId, children: /* @__PURE__ */ jsx(
    Tooltip,
    {
      content: tooltipContent,
      position: "bottom",
      testId: "collab-icon-tooltip",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames(
            "collab-icon-wrapper",
            collabStyles()["collab-icon-wrapper"]
          ),
          onClick,
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
      )
    }
  ) }) : /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames(
        "collab-icon-wrapper",
        collabStyles()["collab-icon-wrapper"]
      ),
      onClick,
      "data-testid": testId,
      ...otherProps,
      children: IconComponent ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        IconComponent,
        {
          className: classNames(
            "collab-icon",
            collabStyles()["collab-icon"],
            className
          )
        }
      ) }) : null
    }
  );
};
Icon.defaultProps = {
  testId: "collab-icon"
};
var Icon_default = Icon;
export {
  Icon_default as default
};
//# sourceMappingURL=Icon.js.map