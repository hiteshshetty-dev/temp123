import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/Button/Button.tsx
import React from "preact/compat";
import classNames from "classnames";
import Icon from "../Icon/Icon.js";
import { collabStyles } from "../../../collab.style.js";
import { jsx } from "preact/jsx-runtime";
var Button = ({
  buttonType = "primary",
  children,
  className = "",
  testId,
  onClick,
  disabled = false,
  type = "button",
  style,
  href,
  id,
  size = "large",
  icon,
  iconProps,
  iconAlignment = "left"
}) => {
  const Element = href ? "a" : "button";
  let nestedChildren = children && React.Children.toArray([children]);
  if (icon) {
    let iconChild = /* @__PURE__ */ jsx(Icon, { icon, ...iconProps });
    switch (iconAlignment) {
      case "left":
        nestedChildren = React.Children.toArray([
          iconChild,
          nestedChildren
        ]);
        break;
      case "right":
        nestedChildren = React.Children.toArray([
          nestedChildren,
          iconChild
        ]);
        break;
      case "both":
        nestedChildren = React.Children.toArray([
          iconChild,
          nestedChildren,
          iconChild
        ]);
        break;
      default:
        break;
    }
  }
  const combinedClassName = classNames(
    collabStyles()["collab-button--basestyle"],
    collabStyles()["collab-button--type"][buttonType],
    collabStyles()["collab-button--size"][size],
    icon && collabStyles()["collab-button--icon-allignment"][iconAlignment],
    disabled && collabStyles()["collab-button--disabled"],
    className,
    `collab-button collab-button--${buttonType} collab-button--${size} ${icon ? `collab-button--icon-${iconAlignment}` : ""} ${disabled ? "collab-button--disabled" : ""}`
  );
  const validStyle = Object.fromEntries(
    Object.entries(style || {}).filter(([_, value]) => value != null)
  );
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: combinedClassName,
      id,
      onClick,
      type,
      style: validStyle,
      disabled,
      href,
      "data-testid": testId,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames(
            "flex-center",
            collabStyles()["flex-center"]
          ),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: classNames(
                "flex-v-center",
                collabStyles()["flex-v-center"],
                {
                  [`${collabStyles()["collab-button--size"]["regular"]} collab-button--regular`]: size !== "small"
                }
              ),
              children: nestedChildren
            }
          )
        }
      )
    }
  );
};
var Button_default = Button;
export {
  Button_default as default
};
//# sourceMappingURL=Button.js.map