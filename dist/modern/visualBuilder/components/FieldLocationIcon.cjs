"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/components/FieldLocationIcon.tsx
var FieldLocationIcon_exports = {};
__export(FieldLocationIcon_exports, {
  FieldLocationIcon: () => FieldLocationIcon
});
module.exports = __toCommonJS(FieldLocationIcon_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_EmptyAppIcon = require("./icons/EmptyAppIcon.cjs");
var import_icons = require("./icons/index.cjs");
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var FieldLocationIcon = ({
  fieldLocationData,
  multipleFieldToolbarButtonClasses,
  handleMoreIconClick,
  moreButtonRef,
  toolbarRef,
  domEditStack
}) => {
  if (!fieldLocationData?.apps || fieldLocationData?.apps?.length === 0) {
    return null;
  }
  const handleAppClick = (app) => {
    if (!toolbarRef.current) return;
    import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.FIELD_LOCATION_SELECTED_APP, {
      app,
      position: toolbarRef.current?.getBoundingClientRect(),
      DomEditStack: domEditStack
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: toolbarRef,
      className: (0, import_classnames.default)(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-icons-container"]
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "hr",
          {
            className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-icons-container__divider"]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            children: fieldLocationData.apps[0].icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "img",
              {
                src: fieldLocationData.apps[0].icon,
                alt: fieldLocationData.apps[0].title,
                className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-icons-container__app-icon"]
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_EmptyAppIcon.EmptyAppIcon,
              {
                id: fieldLocationData.apps[0].app_installation_uid
              }
            )
          },
          `${fieldLocationData.apps[0].uid}`
        ),
        fieldLocationData.apps.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            ref: moreButtonRef,
            className: multipleFieldToolbarButtonClasses,
            "data-tooltip": "More",
            onClick: handleMoreIconClick,
            "data-testid": "field-location-more-button",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.MoreIcon, {})
          }
        )
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldLocationIcon
});
//# sourceMappingURL=FieldLocationIcon.cjs.map