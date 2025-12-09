import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/fieldLabelWrapper.tsx
import classNames from "classnames";
import { useEffect, useState } from "preact/compat";
import { extractDetailsFromCslp } from "../../cslp/index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { DisableReason, isFieldDisabled } from "../utils/isFieldDisabled.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { CaretIcon, CaretRightIcon, InfoIcon } from "./icons/index.js";
import { LoadingIcon } from "./icons/loading.js";
import { FieldTypeIconsMap, getFieldIcon } from "../generators/generateCustomCursor.js";
import { uniqBy } from "lodash-es";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { CslpError } from "./CslpError.js";
import { hasPostMessageError } from "../utils/errorHandling.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { ContentTypeIcon } from "./icons/index.js";
import { ToolbarTooltip } from "./Tooltip.js";
import { fetchEntryPermissionsAndStageDetails } from "../utils/fetchEntryPermissionsAndStageDetails.js";
import { VariantIndicator } from "./VariantIndicator.js";
import { handleRevalidateFieldData } from "../eventManager/useRevalidateFieldDataPostMessageEvent.js";
import { RESULT_TYPES } from "../utils/constants.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
async function getFieldDisplayNames(fieldMetadata) {
  var _a;
  const result = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.GET_FIELD_DISPLAY_NAMES, fieldMetadata));
  return result;
}
async function getContentTypeName(contentTypeUid) {
  var _a;
  try {
    const result = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.GET_CONTENT_TYPE_NAME, {
      content_type_uid: contentTypeUid
    }));
    return result == null ? void 0 : result.contentTypeName;
  } catch (e) {
    console.warn("[getFieldLabelWrapper] Error getting content type name", e);
    return "";
  }
}
async function getReferenceParentMap() {
  var _a;
  try {
    const result = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.REFERENCE_MAP, {})) ?? {};
    return result;
  } catch (e) {
    console.warn("[getFieldLabelWrapper] Error getting reference parent map", e);
    return {};
  }
}
function FieldLabelWrapperComponent(props) {
  const { eventDetails } = props;
  const [currentField, setCurrentField] = useState({
    text: "",
    contentTypeName: "",
    icon: /* @__PURE__ */ jsx(CaretIcon, {}),
    prefixIcon: null,
    disabled: false,
    isVariant: false,
    isReference: false,
    referenceFieldName: "",
    parentContentTypeName: ""
  });
  const [displayNames, setDisplayNames] = useState(
    {}
  );
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function calculateTopOffset(index) {
    const height = -30;
    const offset = (index + 1) * height;
    return `${offset}px`;
  }
  useEffect(() => {
    const fetchData = async () => {
      var _a, _b;
      setDataLoading(true);
      const allPaths = uniqBy(
        [
          props.fieldMetadata,
          ...props.parentPaths.filter((path) => path).map((path) => {
            return extractDetailsFromCslp(path);
          })
        ],
        "cslpValue"
      );
      const [displayNames2, fieldSchema, contentTypeName, referenceParentMap] = await Promise.all([
        getFieldDisplayNames(allPaths),
        FieldSchemaMap.getFieldSchema(
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
            const domAncestorDetails = extractDetailsFromCslp(domAncestorCslp);
            const domAncestorContentTypeUid = domAncestorDetails.content_type_uid;
            const domAncestorContentParent = referenceData == null ? void 0 : referenceData.find((data) => data.contentTypeUid === domAncestorContentTypeUid);
            if (domAncestorContentParent) {
              referenceFieldName = domAncestorContentParent.referenceFieldName;
              parentContentTypeName = domAncestorContentParent.contentTypeTitle;
            }
          }
        }
      }
      if (hasPostMessageError(displayNames2) || !fieldSchema) {
        setDataLoading(false);
        setError(true);
        return;
      }
      const { acl: entryAcl, workflowStage: entryWorkflowStageDetails, resolvedVariantPermissions } = await fetchEntryPermissionsAndStageDetails({
        entryUid: props.fieldMetadata.entry_uid,
        contentTypeUid: props.fieldMetadata.content_type_uid,
        locale: props.fieldMetadata.locale,
        variantUid: props.fieldMetadata.variant,
        fieldPathWithIndex: props.fieldMetadata.fieldPathWithIndex
      });
      const { isDisabled: fieldDisabled, reason } = isFieldDisabled(
        fieldSchema,
        eventDetails,
        resolvedVariantPermissions,
        entryAcl,
        entryWorkflowStageDetails
      );
      const handleLinkVariant = async () => {
        var _a2, _b2;
        try {
          if ((_a2 = fieldSchema.field_metadata) == null ? void 0 : _a2.canLinkVariant) {
            const result = await ((_b2 = visualBuilderPostMessage) == null ? void 0 : _b2.send(
              VisualBuilderPostMessageEvents.OPEN_LINK_VARIANT_MODAL,
              {
                contentTypeUid: props.fieldMetadata.content_type_uid
              }
            ));
            if (!result || result.type === RESULT_TYPES.ERROR) {
              return;
            }
            if (result.type === RESULT_TYPES.SUCCESS) {
              await handleRevalidateFieldData();
            }
          }
        } catch (error2) {
          console.error(
            "Error in link variant modal flow:",
            error2
          );
        }
      };
      const currentFieldDisplayName = (displayNames2 == null ? void 0 : displayNames2[props.fieldMetadata.cslpValue]) ?? fieldSchema.display_name;
      const hasParentPaths = !!((_a = props == null ? void 0 : props.parentPaths) == null ? void 0 : _a.length);
      const isVariant = props.fieldMetadata.variant ? true : false;
      setCurrentField({
        text: currentFieldDisplayName,
        contentTypeName: contentTypeName ?? "",
        icon: fieldDisabled ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              visualBuilderStyles()["visual-builder__tooltip--persistent"]
            ),
            "data-tooltip": !(reason == null ? void 0 : reason.includes(DisableReason.CanLinkVariant)) ? reason : void 0,
            children: [
              reason.includes(DisableReason.CanLinkVariant) && /* @__PURE__ */ jsx(
                "div",
                {
                  className: visualBuilderStyles()["visual-builder__custom-tooltip"],
                  onClick: handleLinkVariant,
                  children: (() => {
                    const [before, after] = reason.split(
                      DisableReason.UnderlinedAndClickableWord
                    );
                    return /* @__PURE__ */ jsxs(Fragment, { children: [
                      before,
                      /* @__PURE__ */ jsx("span", { style: { textDecoration: "underline" }, children: DisableReason.UnderlinedAndClickableWord }),
                      after
                    ] });
                  })()
                }
              ),
              /* @__PURE__ */ jsx(InfoIcon, {})
            ]
          }
        ) : hasParentPaths ? /* @__PURE__ */ jsx(CaretIcon, {}) : /* @__PURE__ */ jsx(Fragment, {}),
        isReference,
        prefixIcon: getFieldIcon(fieldSchema),
        disabled: fieldDisabled,
        referenceFieldName,
        parentContentTypeName,
        isVariant
      });
      if (displayNames2) {
        setDisplayNames(displayNames2);
      }
      if (((_b = Object.keys(displayNames2 || {})) == null ? void 0 : _b.length) === allPaths.length) {
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
      return /* @__PURE__ */ jsx(LoadingIcon, {});
    } else {
      return currentField.icon;
    }
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "visual-builder__focused-toolbar__field-label-container",
        visualBuilderStyles()["visual-builder__focused-toolbar__field-label-container"]
      ),
      children: [
        currentField.isVariant ? /* @__PURE__ */ jsx(VariantIndicator, {}) : null,
        /* @__PURE__ */ jsx(ToolbarTooltip, { data: { contentTypeName: currentField.parentContentTypeName, referenceFieldName: currentField.referenceFieldName }, disabled: !currentField.isReference || isDropdownOpen, children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              "visual-builder__focused-toolbar__field-label-wrapper",
              visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper"],
              {
                "visual-builder__focused-toolbar--field-disabled": currentField.disabled
              },
              {
                [visualBuilderStyles()["visual-builder__focused-toolbar--field-disabled"]]: currentField.disabled
              },
              {
                "field-label-dropdown-open": isDropdownOpen,
                [visualBuilderStyles()["field-label-dropdown-open"]]: isDropdownOpen
              },
              {
                "visual-builder__focused-toolbar--variant": currentField.isVariant
              },
              {
                [visualBuilderStyles()["visual-builder__focused-toolbar--variant"]]: currentField.isVariant
              }
            ),
            onClick: () => setIsDropdownOpen((prev) => !prev),
            "data-testid": "visual-builder__focused-toolbar__field-label-wrapper",
            "data-hovered-cslp": props.fieldMetadata.cslpValue,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: classNames(
                    "visual-builder__focused-toolbar__field-label-wrapper__current-field visual-builder__button visual-builder__button--primary visual-builder__button-loader",
                    visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper__current-field"],
                    visualBuilderStyles()["visual-builder__button"],
                    visualBuilderStyles()["visual-builder__button--primary"],
                    visualBuilderStyles()["visual-builder__button-loader"],
                    error && visualBuilderStyles()["visual-builder__button-error"]
                  ),
                  disabled: dataLoading,
                  children: [
                    currentField.isReference && !dataLoading && !error ? /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: classNames(
                          "visual-builder__reference-icon-container",
                          visualBuilderStyles()["visual-builder__reference-icon-container"]
                        ),
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: classNames(
                                "visual-builder__field-icon",
                                visualBuilderStyles()["visual-builder__field-icon"]
                              ),
                              dangerouslySetInnerHTML: {
                                __html: FieldTypeIconsMap.reference
                              },
                              "data-testid": "visual-builder__field-icon-caret"
                            }
                          ),
                          /* @__PURE__ */ jsx(CaretRightIcon, {})
                        ]
                      }
                    ) : null,
                    currentField.contentTypeName && !dataLoading && !error ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(ContentTypeIcon, {}),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: classNames(
                            "visual-builder__focused-toolbar__text",
                            visualBuilderStyles()["visual-builder__focused-toolbar__text"]
                          ),
                          "data-testid": "visual-builder__focused-toolbar__ct-name",
                          children: currentField.contentTypeName + " : "
                        }
                      )
                    ] }) : null,
                    currentField.prefixIcon ? /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: classNames(
                          "visual-builder__field-icon",
                          visualBuilderStyles()["visual-builder__field-icon"]
                        ),
                        dangerouslySetInnerHTML: {
                          __html: currentField.prefixIcon
                        },
                        "data-testid": "visual-builder__field-icon"
                      }
                    ) : null,
                    currentField.text ? /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: classNames(
                          "visual-builder__focused-toolbar__text",
                          visualBuilderStyles()["visual-builder__focused-toolbar__text"]
                        ),
                        "data-testid": "visual-builder__focused-toolbar__text",
                        children: currentField.text
                      }
                    ) : null,
                    getCurrentFieldIcon(),
                    error ? /* @__PURE__ */ jsx(CslpError, {}) : null
                  ]
                }
              ),
              props.parentPaths.map((path, index) => /* @__PURE__ */ jsx(
                "button",
                {
                  className: classNames(
                    "visual-builder__focused-toolbar__field-label-wrapper__parent-field visual-builder__button visual-builder__button--secondary visual-builder__focused-toolbar__text",
                    visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper__parent-field"],
                    visualBuilderStyles()["visual-builder__button"],
                    visualBuilderStyles()["visual-builder__button--secondary"],
                    visualBuilderStyles()["visual-builder__focused-toolbar__text"]
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
export {
  fieldLabelWrapper_default as default
};
//# sourceMappingURL=fieldLabelWrapper.js.map