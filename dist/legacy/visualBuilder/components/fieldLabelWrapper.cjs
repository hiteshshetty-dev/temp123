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

// src/visualBuilder/components/fieldLabelWrapper.tsx
var fieldLabelWrapper_exports = {};
__export(fieldLabelWrapper_exports, {
  default: () => fieldLabelWrapper_default
});
module.exports = __toCommonJS(fieldLabelWrapper_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_compat = require("preact/compat");
var import_cslp = require("../../cslp/index.cjs");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_isFieldDisabled = require("../utils/isFieldDisabled.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_icons = require("./icons/index.cjs");
var import_loading = require("./icons/loading.cjs");
var import_generateCustomCursor = require("../generators/generateCustomCursor.cjs");
var import_lodash_es = require("lodash-es");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_CslpError = require("./CslpError.cjs");
var import_errorHandling = require("../utils/errorHandling.cjs");
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_getEntryPermissionsCached = require("../utils/getEntryPermissionsCached.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
async function getFieldDisplayNames(fieldMetadata) {
  var _a;
  const result = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(import_postMessage.VisualBuilderPostMessageEvents.GET_FIELD_DISPLAY_NAMES, fieldMetadata));
  return result;
}
function FieldLabelWrapperComponent(props) {
  const { eventDetails } = props;
  const [currentField, setCurrentField] = (0, import_compat.useState)({
    text: "",
    icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretIcon, {}),
    prefixIcon: null,
    disabled: false,
    isVariant: false
  });
  const [displayNames, setDisplayNames] = (0, import_compat.useState)(
    {}
  );
  const [displayNamesLoading, setDisplayNamesLoading] = (0, import_compat.useState)(true);
  const [error, setError] = (0, import_compat.useState)(false);
  const [isDropdownOpen, setIsDropdownOpen] = (0, import_compat.useState)(false);
  function calculateTopOffset(index) {
    const height = -30;
    const offset = (index + 1) * height;
    return `${offset}px`;
  }
  (0, import_compat.useEffect)(() => {
    const fetchData = async () => {
      var _a, _b;
      setDisplayNamesLoading(true);
      const allPaths = (0, import_lodash_es.uniqBy)(
        [
          props.fieldMetadata,
          ...props.parentPaths.map((path) => {
            return (0, import_cslp.extractDetailsFromCslp)(path);
          })
        ],
        "cslpValue"
      );
      const displayNames2 = await getFieldDisplayNames(allPaths);
      const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
        props.fieldMetadata.content_type_uid,
        props.fieldMetadata.fieldPath
      );
      if ((0, import_errorHandling.hasPostMessageError)(displayNames2) || !fieldSchema) {
        setDisplayNamesLoading(false);
        setError(true);
        return;
      }
      const entryPermissions = await (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
        entryUid: props.fieldMetadata.entry_uid,
        contentTypeUid: props.fieldMetadata.content_type_uid,
        locale: props.fieldMetadata.locale
      });
      const { isDisabled: fieldDisabled, reason } = (0, import_isFieldDisabled.isFieldDisabled)(
        fieldSchema,
        eventDetails,
        entryPermissions
      );
      const currentFieldDisplayName = (displayNames2 == null ? void 0 : displayNames2[props.fieldMetadata.cslpValue]) ?? fieldSchema.display_name;
      const hasParentPaths = !!((_a = props == null ? void 0 : props.parentPaths) == null ? void 0 : _a.length);
      const isVariant = props.fieldMetadata.variant ? true : false;
      setCurrentField({
        text: currentFieldDisplayName,
        icon: fieldDisabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_classnames.default)(
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--persistent"]
            ),
            "data-tooltip": reason,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.InfoIcon, {})
          }
        ) : hasParentPaths ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}),
        prefixIcon: (0, import_generateCustomCursor.getFieldIcon)(fieldSchema),
        disabled: fieldDisabled,
        isVariant
      });
      if (displayNames2) {
        setDisplayNames(displayNames2);
      }
      if (((_b = Object.keys(displayNames2 || {})) == null ? void 0 : _b.length) === allPaths.length) {
        setDisplayNamesLoading(false);
      }
    };
    fetchData();
  }, [props]);
  const onParentPathClick = (cslp) => {
    const parentElement = props.getParentEditableElement(cslp);
    if (parentElement) {
      parentElement.click();
    }
  };
  function getCurrentFieldIcon() {
    if (error) {
      return null;
    } else if (displayNamesLoading) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_loading.LoadingIcon, {});
    } else {
      return currentField.icon;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_classnames.default)(
        "visual-builder__focused-toolbar__field-label-container",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__field-label-container"]
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: (0, import_classnames.default)(
            "visual-builder__focused-toolbar__field-label-wrapper",
            (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__field-label-wrapper"],
            {
              "visual-builder__focused-toolbar--field-disabled": currentField.disabled
            },
            {
              [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar--field-disabled"]]: currentField.disabled
            },
            {
              "field-label-dropdown-open": isDropdownOpen,
              [(0, import_visualBuilder.visualBuilderStyles)()["field-label-dropdown-open"]]: isDropdownOpen
            }
          ),
          onClick: () => setIsDropdownOpen((prev) => !prev),
          "data-testid": "visual-builder__focused-toolbar__field-label-wrapper",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                className: (0, import_classnames.default)(
                  "visual-builder__focused-toolbar__field-label-wrapper__current-field visual-builder__button visual-builder__button--primary visual-builder__button-loader",
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__field-label-wrapper__current-field"],
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--primary"],
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button-loader"],
                  error && (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button-error"]
                ),
                disabled: displayNamesLoading,
                children: [
                  currentField.prefixIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      className: (0, import_classnames.default)(
                        "visual-builder__field-icon",
                        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-icon"]
                      ),
                      dangerouslySetInnerHTML: {
                        __html: currentField.prefixIcon
                      },
                      "data-testid": "visual-builder__field-icon"
                    }
                  ) : null,
                  currentField.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      className: (0, import_classnames.default)(
                        "visual-builder__focused-toolbar__text",
                        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__text"]
                      ),
                      "data-testid": "visual-builder__focused-toolbar__text",
                      children: currentField.text
                    }
                  ) : null,
                  getCurrentFieldIcon(),
                  error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_CslpError.CslpError, {}) : null
                ]
              }
            ),
            props.parentPaths.map((path, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                className: (0, import_classnames.default)(
                  "visual-builder__focused-toolbar__field-label-wrapper__parent-field visual-builder__button visual-builder__button--secondary visual-builder__focused-toolbar__text",
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__field-label-wrapper__parent-field"],
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__text"]
                ),
                "data-target-cslp": path,
                style: { top: calculateTopOffset(index) },
                onClick: () => onParentPathClick(path),
                children: displayNames[path]
              },
              path
            ))
          ]
        }
      )
    }
  );
}
var fieldLabelWrapper_default = FieldLabelWrapperComponent;
//# sourceMappingURL=fieldLabelWrapper.cjs.map