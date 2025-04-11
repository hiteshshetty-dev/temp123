import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/AsyncLoader/AsyncLoader.tsx
import classNames from "classnames";
import { collabStyles } from "../../../collab.style.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var AsyncLoader = ({
  className,
  color = "primary",
  testId = "collab-async-loader",
  ...otherProps
}) => {
  const combinedClassName = classNames(
    collabStyles()["collab-button--loader--animation"],
    collabStyles()["collab-button--loading--color"][color],
    "collab-button--loader--animation",
    `collab-button--loading--${color}`
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "collab-button--loader",
        collabStyles()["collab-button--loader"],
        className
      ),
      ...otherProps,
      "data-testid": testId,
      children: [
        /* @__PURE__ */ jsx("div", { className: combinedClassName }),
        /* @__PURE__ */ jsx("div", { className: combinedClassName }),
        /* @__PURE__ */ jsx("div", { className: combinedClassName })
      ]
    }
  );
};
var AsyncLoader_default = AsyncLoader;
export {
  AsyncLoader_default as default
};
//# sourceMappingURL=AsyncLoader.js.map