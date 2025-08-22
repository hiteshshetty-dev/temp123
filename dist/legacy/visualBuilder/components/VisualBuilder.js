import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/VisualBuilder.tsx
import classNames from "classnames";
import { hideOverlay } from "../generators/generateOverlay.js";
import {
  visualBuilderStyles,
  VisualBuilderGlobalStyles
} from "../visualBuilder.style.js";
import { isOpenInBuilder, isOpenInPreviewShare } from "../../utils/index.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
function VisualBuilderComponent(props) {
  const isInBuilder = isOpenInBuilder();
  const isInPreviewShare = isOpenInPreviewShare();
  if (!isInBuilder && !isInPreviewShare) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: VisualBuilderGlobalStyles
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames(
          visualBuilderStyles()["visual-builder__cursor"],
          "visual-builder__cursor"
        ),
        "data-testid": "visual-builder__cursor"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames(
          visualBuilderStyles()["visual-builder__overlay__wrapper"],
          "visual-builder__overlay__wrapper"
        ),
        "data-testid": "visual-builder__overlay__wrapper",
        onClick: (event) => {
          const targetElement = event.currentTarget;
          const focusedToolbar = document.querySelector(
            ".visual-builder__focused-toolbar"
          );
          hideOverlay({
            visualBuilderContainer: props.visualBuilderContainer,
            visualBuilderOverlayWrapper: targetElement,
            focusedToolbar,
            resizeObserver: props.resizeObserver
          });
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: classNames(
                "visual-builder__overlay visual-builder__overlay--top",
                visualBuilderStyles()["visual-builder__overlay"]
              ),
              "data-testid": "visual-builder__overlay--top"
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-testid": "visual-builder__overlay--left",
              className: classNames(
                "visual-builder__overlay visual-builder__overlay--left",
                visualBuilderStyles()["visual-builder__overlay"]
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-testid": "visual-builder__overlay--right",
              className: classNames(
                "visual-builder__overlay visual-builder__overlay--right",
                visualBuilderStyles()["visual-builder__overlay"]
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-testid": "visual-builder__overlay--bottom",
              className: classNames(
                "visual-builder__overlay visual-builder__overlay--bottom",
                visualBuilderStyles()["visual-builder__overlay"]
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-testid": "visual-builder__overlay--outline",
              className: classNames(
                "visual-builder__overlay--outline",
                visualBuilderStyles()["visual-builder__overlay--outline"]
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames(
          "visual-builder__hover-outline visual-builder__hover-outline--unclickable",
          visualBuilderStyles()["visual-builder__hover-outline"],
          visualBuilderStyles()["visual-builder__hover-outline--unclickable"]
        ),
        "data-testid": "visual-builder__hover-outline"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames(
          "visual-builder__focused-toolbar",
          visualBuilderStyles()["visual-builder__focused-toolbar"]
        ),
        "data-testid": "visual-builder__focused-toolbar"
      }
    )
  ] });
}
var VisualBuilder_default = VisualBuilderComponent;
export {
  VisualBuilder_default as default
};
//# sourceMappingURL=VisualBuilder.js.map