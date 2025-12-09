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
var import_icons2 = require("./icons/index.cjs");
var import_Tooltip = require("./Tooltip.cjs");
var import_fetchEntryPermissionsAndStageDetails = require("../utils/fetchEntryPermissionsAndStageDetails.cjs");
var import_VariantIndicator = require("./VariantIndicator.cjs");
var import_useRevalidateFieldDataPostMessageEvent = require("../eventManager/useRevalidateFieldDataPostMessageEvent.cjs");
var import_constants = require("../utils/constants.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
async function getFieldDisplayNames(fieldMetadata) {
  const result = await import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.GET_FIELD_DISPLAY_NAMES, fieldMetadata);
  return result;
}
async function getContentTypeName(contentTypeUid) {
  try {
    const result = await import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.GET_CONTENT_TYPE_NAME, {
      content_type_uid: contentTypeUid
    });
    return result?.contentTypeName;
  } catch (e) {
    console.warn("[getFieldLabelWrapper] Error getting content type name", e);
    return "";
  }
}
async function getReferenceParentMap() {
  try {
    const result = await import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.REFERENCE_MAP, {}) ?? {};
    return result;
  } catch (e) {
    console.warn("[getFieldLabelWrapper] Error getting reference parent map", e);
    return {};
  }
}
function FieldLabelWrapperComponent(props) {
  const { eventDetails } = props;
  const [currentField, setCurrentField] = (0, import_compat.useState)({
    text: "",
    contentTypeName: "",
    icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretIcon, {}),
    prefixIcon: null,
    disabled: false,
    isVariant: false,
    isReference: false,
    referenceFieldName: "",
    parentContentTypeName: ""
  });
  const [displayNames, setDisplayNames] = (0, import_compat.useState)(
    {}
  );
  const [dataLoading, setDataLoading] = (0, import_compat.useState)(true);
  const [error, setError] = (0, import_compat.useState)(false);
  const [isDropdownOpen, setIsDropdownOpen] = (0, import_compat.useState)(false);
  function calculateTopOffset(index) {
    const height = -30;
    const offset = (index + 1) * height;
    return `${offset}px`;
  }
  (0, import_compat.useEffect)(() => {
    const fetchData = async () => {
      setDataLoading(true);
      const allPaths = (0, import_lodash_es.uniqBy)(
        [
          props.fieldMetadata,
          ...props.parentPaths.filter((path) => path).map((path) => {
            return (0, import_cslp.extractDetailsFromCslp)(path);
          })
        ],
        "cslpValue"
      );
      const [displayNames2, fieldSchema, contentTypeName, referenceParentMap] = await Promise.all([
        getFieldDisplayNames(allPaths),
        import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
          props.fieldMetadata.content_type_uid,
          props.fieldMetadata.fieldPath
        ),
        getContentTypeName(
          props.fieldMetadata.content_type_uid
        ),
        getReferenceParentMap()
      ]);
      const entryUid = props.fieldMetadata.entry_uid;
      const referenceData = referenceParentMap[entryUid];
      const isReference = !!referenceData;
      let referenceFieldName = referenceData ? referenceData[0].referenceFieldName : "";
      let parentContentTypeName = referenceData ? referenceData[0].contentTypeTitle : "";
      if (isReference) {
        const domAncestor = eventDetails.editableElement.closest(`[data-cslp]:not([data-cslp^="${props.fieldMetadata.content_type_uid}"])`);
        if (domAncestor) {
          const domAncestorCslp = domAncestor.getAttribute("data-cslp");
          if (domAncestorCslp) {
            const domAncestorDetails = (0, import_cslp.extractDetailsFromCslp)(domAncestorCslp);
            const domAncestorContentTypeUid = domAncestorDetails.content_type_uid;
            const domAncestorContentParent = referenceData?.find((data) => data.contentTypeUid === domAncestorContentTypeUid);
            if (domAncestorContentParent) {
              referenceFieldName = domAncestorContentParent.referenceFieldName;
              parentContentTypeName = domAncestorContentParent.contentTypeTitle;
            }
          }
        }
      }
      if ((0, import_errorHandling.hasPostMessageError)(displayNames2) || !fieldSchema) {
        setDataLoading(false);
        setError(true);
        return;
      }
      const { acl: entryAcl, workflowStage: entryWorkflowStageDetails, resolvedVariantPermissions } = await (0, import_fetchEntryPermissionsAndStageDetails.fetchEntryPermissionsAndStageDetails)({
        entryUid: props.fieldMetadata.entry_uid,
        contentTypeUid: props.fieldMetadata.content_type_uid,
        locale: props.fieldMetadata.locale,
        variantUid: props.fieldMetadata.variant,
        fieldPathWithIndex: props.fieldMetadata.fieldPathWithIndex
      });
      const { isDisabled: fieldDisabled, reason } = (0, import_isFieldDisabled.isFieldDisabled)(
        fieldSchema,
        eventDetails,
        resolvedVariantPermissions,
        entryAcl,
        entryWorkflowStageDetails
      );
      const handleLinkVariant = async () => {
        try {
          if (fieldSchema.field_metadata?.canLinkVariant) {
            const result = await import_visualBuilderPostMessage.default?.send(
              import_postMessage.VisualBuilderPostMessageEvents.OPEN_LINK_VARIANT_MODAL,
              {
                contentTypeUid: props.fieldMetadata.content_type_uid
              }
            );
            if (!result || result.type === import_constants.RESULT_TYPES.ERROR) {
              return;
            }
            if (result.type === import_constants.RESULT_TYPES.SUCCESS) {
              await (0, import_useRevalidateFieldDataPostMessageEvent.handleRevalidateFieldData)();
            }
          }
        } catch (error2) {
          console.error(
            "Error in link variant modal flow:",
            error2
          );
        }
      };
      const currentFieldDisplayName = displayNames2?.[props.fieldMetadata.cslpValue] ?? fieldSchema.display_name;
      const hasParentPaths = !!props?.parentPaths?.length;
      const isVariant = props.fieldMetadata.variant ? true : false;
      setCurrentField({
        text: currentFieldDisplayName,
        contentTypeName: contentTypeName ?? "",
        icon: fieldDisabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: (0, import_classnames.default)(
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--persistent"]
            ),
            "data-tooltip": !reason?.includes(import_isFieldDisabled.DisableReason.CanLinkVariant) ? reason : void 0,
            children: [
              reason.includes(import_isFieldDisabled.DisableReason.CanLinkVariant) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__custom-tooltip"],
                  onClick: handleLinkVariant,
                  children: (() => {
                    const [before, after] = reason.split(
                      import_isFieldDisabled.DisableReason.UnderlinedAndClickableWord
                    );
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                      before,
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { textDecoration: "underline" }, children: import_isFieldDisabled.DisableReason.UnderlinedAndClickableWord }),
                      after
                    ] });
                  })()
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.InfoIcon, {})
            ]
          }
        ) : hasParentPaths ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}),
        isReference,
        prefixIcon: (0, import_generateCustomCursor.getFieldIcon)(fieldSchema),
        disabled: fieldDisabled,
        referenceFieldName,
        parentContentTypeName,
        isVariant
      });
      if (displayNames2) {
        setDisplayNames(displayNames2);
      }
      if (Object.keys(displayNames2 || {})?.length === allPaths.length) {
        setDataLoading(false);
      }
    };
    try {
      fetchData();
    } catch (e) {
      console.warn("[getFieldLabelWrapper] Error fetching field label data", e);
    }
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
    } else if (dataLoading) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_loading.LoadingIcon, {});
    } else {
      return currentField.icon;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "visual-builder__focused-toolbar__field-label-container",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__field-label-container"]
      ),
      children: [
        currentField.isVariant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_VariantIndicator.VariantIndicator, {}) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Tooltip.ToolbarTooltip, { data: { contentTypeName: currentField.parentContentTypeName, referenceFieldName: currentField.referenceFieldName }, disabled: !currentField.isReference || isDropdownOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
              },
              {
                "visual-builder__focused-toolbar--variant": currentField.isVariant
              },
              {
                [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar--variant"]]: currentField.isVariant
              }
            ),
            onClick: () => setIsDropdownOpen((prev) => !prev),
            "data-testid": "visual-builder__focused-toolbar__field-label-wrapper",
            "data-hovered-cslp": props.fieldMetadata.cslpValue,
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
                  disabled: dataLoading,
                  children: [
                    currentField.isReference && !dataLoading && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        className: (0, import_classnames.default)(
                          "visual-builder__reference-icon-container",
                          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__reference-icon-container"]
                        ),
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "div",
                            {
                              className: (0, import_classnames.default)(
                                "visual-builder__field-icon",
                                (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-icon"]
                              ),
                              dangerouslySetInnerHTML: {
                                __html: import_generateCustomCursor.FieldTypeIconsMap.reference
                              },
                              "data-testid": "visual-builder__field-icon-caret"
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretRightIcon, {})
                        ]
                      }
                    ) : null,
                    currentField.contentTypeName && !dataLoading && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons2.ContentTypeIcon, {}),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "div",
                        {
                          className: (0, import_classnames.default)(
                            "visual-builder__focused-toolbar__text",
                            (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__text"]
                          ),
                          "data-testid": "visual-builder__focused-toolbar__ct-name",
                          children: currentField.contentTypeName + " : "
                        }
                      )
                    ] }) : null,
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
        ) })
      ]
    }
  );
}
var fieldLabelWrapper_default = FieldLabelWrapperComponent;
//# sourceMappingURL=fieldLabelWrapper.cjs.map