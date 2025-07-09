import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/index.tsx
import { render } from "preact";
import VisualBuilderComponent from "./VisualBuilder.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { isOpenInBuilder } from "../../utils/index.js";
import { jsx } from "preact/jsx-runtime";
function initUI(props) {
  const visualBuilderDOM = document.querySelector(
    `.visual-builder__container`
  );
  const isInBuilder = isOpenInBuilder();
  if (!visualBuilderDOM && isInBuilder) {
    const visualBuilderContainer = document.createElement("div");
    visualBuilderContainer.classList.add(
      visualBuilderStyles()["visual-builder__container"],
      "visual-builder__container"
    );
    visualBuilderContainer.setAttribute(
      "data-testid",
      "visual-builder__container"
    );
    document.body.appendChild(visualBuilderContainer);
    render(
      /* @__PURE__ */ jsx(
        VisualBuilderComponent,
        {
          visualBuilderContainer,
          resizeObserver: props.resizeObserver
        }
      ),
      visualBuilderContainer
    );
  }
  return;
}
var components_default = initUI;
export {
  components_default as default
};
//# sourceMappingURL=index.js.map