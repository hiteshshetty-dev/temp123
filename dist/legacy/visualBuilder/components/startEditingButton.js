import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/startEditingButton.tsx
import classNames from "classnames";
import getVisualBuilderRedirectionUrl from "../utils/getVisualBuilderRedirectionUrl.js";
import { EditIcon } from "./icons/index.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { jsx, jsxs } from "preact/jsx-runtime";
function StartEditingButtonComponent() {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: getVisualBuilderRedirectionUrl().toString(),
      className: classNames(
        "visual-builder__start-editing-btn",
        visualBuilderStyles()["visual-builder__start-editing-btn"]
      ),
      "data-testid": "vcms-start-editing-btn",
      onClick: (e) => {
        const targetElement = e.target;
        targetElement.setAttribute(
          "href",
          getVisualBuilderRedirectionUrl().toString()
        );
      },
      children: [
        /* @__PURE__ */ jsx(EditIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "Start Editing" })
      ]
    }
  );
}
var startEditingButton_default = StartEditingButtonComponent;
export {
  startEditingButton_default as default
};
//# sourceMappingURL=startEditingButton.js.map