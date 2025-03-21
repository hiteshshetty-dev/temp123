import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/startEditingButton.tsx
import classNames from "classnames";
import getVisualBuilderRedirectionUrl from "../utils/getVisualBuilderRedirectionUrl.js";
import { EditIcon } from "./icons/index.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import Config from "../../configManager/configManager.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var positionStyles = {
  "bottom-right": visualBuilderStyles()["visual-builder__start-editing-btn__bottom-right"],
  "bottom-left": visualBuilderStyles()["visual-builder__start-editing-btn__bottom-left"],
  "top-left": visualBuilderStyles()["visual-builder__start-editing-btn__top-left"],
  "top-right": visualBuilderStyles()["visual-builder__start-editing-btn__top-right"]
};
function getEditButtonPosition(position) {
  const validPositions = ["bottom-left", "bottom-right", "top-left", "top-right"];
  if (validPositions.includes(position)) {
    return position;
  } else {
    return "bottom-right";
  }
}
function StartEditingButtonComponent() {
  const config = Config.get();
  const enable = config.editInVisualBuilderButton.enable;
  const position = config.editInVisualBuilderButton.position || "bottom-right";
  function updateTargetUrl(e) {
    const targetElement = e.target;
    targetElement.setAttribute(
      "href",
      getVisualBuilderRedirectionUrl().toString()
    );
  }
  return enable ? /* @__PURE__ */ jsxs(
    "a",
    {
      href: getVisualBuilderRedirectionUrl().toString(),
      className: classNames(
        "visual-builder__start-editing-btn",
        visualBuilderStyles()["visual-builder__start-editing-btn"],
        positionStyles[getEditButtonPosition(position)]
      ),
      "data-testid": "vcms-start-editing-btn",
      onMouseEnter: (e) => updateTargetUrl(e),
      onFocus: (e) => updateTargetUrl(e),
      onClick: (e) => updateTargetUrl(e),
      children: [
        /* @__PURE__ */ jsx(EditIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "Start Editing" })
      ]
    }
  ) : null;
}
var startEditingButton_default = StartEditingButtonComponent;
export {
  startEditingButton_default as default,
  getEditButtonPosition
};
//# sourceMappingURL=startEditingButton.js.map