import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/FieldLocationIcon.tsx
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { EmptyAppIcon } from "./icons/EmptyAppIcon.js";
import { MoreIcon } from "./icons/index.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var FieldLocationIcon = ({
  fieldLocationData,
  multipleFieldToolbarButtonClasses,
  handleMoreIconClick,
  moreButtonRef,
  toolbarRef,
  domEditStack
}) => {
  var _a;
  if (!(fieldLocationData == null ? void 0 : fieldLocationData.apps) || ((_a = fieldLocationData == null ? void 0 : fieldLocationData.apps) == null ? void 0 : _a.length) === 0) {
    return null;
  }
  const handleAppClick = (app) => {
    var _a2, _b;
    if (!toolbarRef.current) return;
    (_b = visualBuilderPostMessage) == null ? void 0 : _b.send(VisualBuilderPostMessageEvents.FIELD_LOCATION_SELECTED_APP, {
      app,
      position: (_a2 = toolbarRef.current) == null ? void 0 : _a2.getBoundingClientRect(),
      DomEditStack: domEditStack
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: toolbarRef,
      className: classNames(
        visualBuilderStyles()["visual-builder__field-location-icons-container"]
      ),
      children: [
        /* @__PURE__ */ jsx(
          "hr",
          {
            className: visualBuilderStyles()["visual-builder__field-location-icons-container__divider"]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            title: fieldLocationData.apps[0].title,
            className: multipleFieldToolbarButtonClasses,
            "data-tooltip": fieldLocationData.apps[0].title,
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAppClick(fieldLocationData.apps[0]);
            },
            "data-testid": "field-location-icon",
            children: fieldLocationData.apps[0].icon ? /* @__PURE__ */ jsx(
              "img",
              {
                src: fieldLocationData.apps[0].icon,
                alt: fieldLocationData.apps[0].title,
                className: visualBuilderStyles()["visual-builder__field-location-icons-container__app-icon"]
              }
            ) : /* @__PURE__ */ jsx(
              EmptyAppIcon,
              {
                id: fieldLocationData.apps[0].app_installation_uid
              }
            )
          },
          `${fieldLocationData.apps[0].uid}`
        ),
        fieldLocationData.apps.length > 1 && /* @__PURE__ */ jsx(
          "button",
          {
            ref: moreButtonRef,
            className: multipleFieldToolbarButtonClasses,
            "data-tooltip": "More",
            onClick: handleMoreIconClick,
            "data-testid": "field-location-more-button",
            children: /* @__PURE__ */ jsx(MoreIcon, {})
          }
        )
      ]
    }
  );
};
export {
  FieldLocationIcon
};
//# sourceMappingURL=FieldLocationIcon.js.map