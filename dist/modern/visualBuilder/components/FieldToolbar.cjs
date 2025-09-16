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

// src/visualBuilder/components/FieldToolbar.tsx
var FieldToolbar_exports = {};
__export(FieldToolbar_exports, {
  default: () => FieldToolbar_default
});
module.exports = __toCommonJS(FieldToolbar_exports);
var import_getChildrenDirection = __toESM(require("../utils/getChildrenDirection.cjs"), 1);
var import_constants = require("../utils/constants.cjs");
var import_getFieldType = require("../utils/getFieldType.cjs");
var import_instanceHandlers = require("../utils/instanceHandlers.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_types = require("../utils/types/index.types.cjs");
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_icons = require("./icons/index.cjs");
var import_fields = require("./icons/fields/index.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_CommentIcon = __toESM(require("./CommentIcon.cjs"), 1);
var import_compat = require("preact/compat");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_isFieldDisabled = require("../utils/isFieldDisabled.cjs");
var import_icons2 = require("./icons/index.cjs");
var import_getCsDataOfElement = require("../utils/getCsDataOfElement.cjs");
var import_variant = require("./icons/variant.cjs");
var import_FieldRevertComponent = require("./FieldRevert/FieldRevertComponent.cjs");
var import_loading = require("./icons/loading.cjs");
var import_FieldLocationAppList = require("./FieldLocationAppList.cjs");
var import_FieldLocationIcon = require("./FieldLocationIcon.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var TOOLTIP_TOP_EDGE_BUFFER = 96;
function handleReplaceAsset(fieldMetadata) {
  import_visualBuilderPostMessage.default?.send(
    import_postMessage.VisualBuilderPostMessageEvents.OPEN_ASSET_MODAL,
    {
      fieldMetadata
    }
  );
}
function handleReplaceReference(fieldMetadata) {
  const isMultipleInstance = fieldMetadata.multipleFieldMetadata.index > -1 && fieldMetadata.fieldPathWithIndex === fieldMetadata.multipleFieldMetadata.parentDetails?.parentPath;
  const entryPath = isMultipleInstance ? fieldMetadata.instance.fieldPathWithIndex : fieldMetadata.fieldPathWithIndex;
  import_visualBuilderPostMessage.default?.send(
    import_postMessage.VisualBuilderPostMessageEvents.OPEN_REFERENCE_MODAL,
    {
      entry_uid: fieldMetadata.entry_uid,
      content_type_uid: fieldMetadata.content_type_uid,
      locale: fieldMetadata.locale,
      fieldPath: fieldMetadata.fieldPath,
      fieldPathWithIndex: fieldMetadata.fieldPathWithIndex,
      entryPath
    }
  );
}
function handleEdit(fieldMetadata) {
  import_visualBuilderPostMessage.default?.send(
    import_postMessage.VisualBuilderPostMessageEvents.OPEN_FIELD_EDIT_MODAL,
    { fieldMetadata }
  );
}
function handleFormFieldFocus(eventDetails) {
  const { editableElement } = eventDetails;
  return import_visualBuilderPostMessage.default?.send(
    import_postMessage.VisualBuilderPostMessageEvents.FOCUS_FIELD,
    {
      DOMEditStack: (0, import_getCsDataOfElement.getDOMEditStack)(editableElement),
      toggleVisibility: true
    }
  );
}
function FieldToolbarComponent(props) {
  const {
    eventDetails,
    isVariant: isVariantOrParentOfVariant,
    entryPermissions,
    entryWorkflowStageDetails
  } = props;
  const { fieldMetadata, editableElement: targetElement } = eventDetails;
  const [isFormLoading, setIsFormLoading] = (0, import_compat.useState)(false);
  const [fieldLocationData, setFieldLocationData] = (0, import_compat.useState)(null);
  const [displayAllApps, setDisplayAllApps] = (0, import_compat.useState)(false);
  const moreButtonRef = (0, import_compat.useRef)(null);
  const toolbarRef = (0, import_compat.useRef)(null);
  const [appListPosition, setAppListPosition] = (0, import_compat.useState)(
    "right"
  );
  const parentPath = fieldMetadata?.multipleFieldMetadata?.parentDetails?.parentCslpValue || "";
  const isVariant = !!fieldMetadata?.variant || isVariantOrParentOfVariant;
  const direction = (0, import_getChildrenDirection.default)(targetElement, parentPath);
  const [fieldSchema, setFieldSchema] = (0, import_compat.useState)(
    null
  );
  const [fieldVariantStatus, setFieldVariantStatus] = (0, import_compat.useState)(import_FieldRevertComponent.BASE_VARIANT_STATUS);
  const [isOpenVariantRevert, setIsOpenVariantRevert] = (0, import_compat.useState)(false);
  let isModalEditable = false;
  let isReplaceAllowed = false;
  let isMultiple = false;
  let Icon = null;
  let fieldType = null;
  let isWholeMultipleField = false;
  const APP_LIST_MIN_WIDTH = 230;
  let disableFieldActions = false;
  if (fieldSchema) {
    const { isDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
      fieldSchema,
      {
        editableElement: targetElement,
        fieldMetadata
      },
      entryPermissions,
      entryWorkflowStageDetails
    );
    disableFieldActions = isDisabled;
    fieldType = (0, import_getFieldType.getFieldType)(fieldSchema);
    Icon = import_fields.fieldIcons[fieldType];
    isMultiple = fieldSchema.multiple || false;
    if (fieldType === import_types.FieldDataType.REFERENCE)
      isMultiple = fieldSchema.field_metadata.ref_multiple;
    isWholeMultipleField = isMultiple && (fieldMetadata.fieldPathWithIndex === fieldMetadata.instance.fieldPathWithIndex || fieldMetadata.multipleFieldMetadata?.index === -1);
    isModalEditable = import_constants.ALLOWED_MODAL_EDITABLE_FIELD.includes(fieldType) && !isWholeMultipleField;
    isReplaceAllowed = import_constants.ALLOWED_REPLACE_FIELDS.includes(fieldType) && !isWholeMultipleField;
  }
  const domEditStack = (0, import_getCsDataOfElement.getDOMEditStack)(eventDetails.editableElement);
  const invertTooltipPosition = targetElement.getBoundingClientRect().top <= TOOLTIP_TOP_EDGE_BUFFER;
  const handleMoreIconClick = () => {
    if (toolbarRef.current) {
      const rect = toolbarRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;
      let position = "";
      if (spaceRight < APP_LIST_MIN_WIDTH) {
        position = "left";
      } else if (spaceRight > APP_LIST_MIN_WIDTH) {
        position = "right";
      } else {
        position = spaceRight > spaceLeft ? "right" : "left";
      }
      setAppListPosition(position);
    }
    setDisplayAllApps(!displayAllApps);
  };
  const editButton = Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__edit-button",
      className: (0, import_classnames.default)(
        "visual-builder__button visual-builder__button--secondary visual-builder__button--edit",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--edit"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Edit",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEdit(fieldMetadata);
      },
      disabled: disableFieldActions,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
    }
  ) : null;
  const replaceButton = fieldType ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: (0, import_classnames.default)(
        "visual-builder__replace-button visual-builder__button visual-builder__button--secondary",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Replace",
      "data-testid": `visual-builder-replace-${fieldType}`,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (fieldType === import_types.FieldDataType.REFERENCE) {
          handleReplaceReference(fieldMetadata);
          return;
        } else if (fieldType === import_types.FieldDataType.FILE) {
          handleReplaceAsset(fieldMetadata);
          return;
        }
      },
      disabled: disableFieldActions,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.ReplaceAssetIcon, {})
    }
  ) : null;
  const formButton = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: (0, import_classnames.default)(
        "visual-builder__replace-button visual-builder__button visual-builder__button--secondary",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        },
        {
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--comment-loader"]]: isFormLoading,
          "visual-builder__button--comment-loader": isFormLoading
        }
      ),
      "data-tooltip": "Form",
      "data-testid": `visual-builder-form`,
      onClick: async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFormLoading(true);
        try {
          await handleFormFieldFocus(eventDetails);
        } finally {
          setIsFormLoading(false);
        }
      },
      disabled: isFormLoading,
      children: isFormLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_loading.LoadingIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons2.FormIcon, {})
    }
  );
  const toggleVariantDropdown = () => {
    setIsOpenVariantRevert(!isOpenVariantRevert);
  };
  const closeVariantDropdown = () => {
    setIsOpenVariantRevert(false);
  };
  const variantButton = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      className: (0, import_classnames.default)(
        "visual-builder__variant-button visual-builder__button visual-builder__button--secondary",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-button"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Variant Revert",
      "data-testid": `visual-builder-canvas-variant-revert`,
      onClick: toggleVariantDropdown,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_variant.VariantIcon, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretIcon, { open: isOpenVariantRevert })
      ]
    }
  );
  const totalElementCount = targetElement?.parentNode?.childElementCount ?? 1;
  const indexOfElement = fieldMetadata?.multipleFieldMetadata?.index;
  const disableMoveLeft = indexOfElement === 0;
  const disableMoveRight = indexOfElement === totalElementCount - 1;
  (0, import_compat.useEffect)(() => {
    async function fetchFieldSchema() {
      const fieldSchema2 = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
        fieldMetadata.content_type_uid,
        fieldMetadata.fieldPath
      );
      if (fieldSchema2) {
        setFieldSchema(fieldSchema2);
      }
      const variantStatus = await (0, import_FieldRevertComponent.getFieldVariantStatus)(fieldMetadata);
      setFieldVariantStatus(variantStatus ?? import_FieldRevertComponent.BASE_VARIANT_STATUS);
    }
    fetchFieldSchema();
  }, [fieldMetadata]);
  (0, import_compat.useEffect)(() => {
    const event = import_visualBuilderPostMessage.default?.on(
      import_postMessage.VisualBuilderPostMessageEvents.DELETE_INSTANCE,
      (args) => {
        if (args.data?.path === fieldMetadata.instance.fieldPathWithIndex) {
          props.hideOverlay();
        }
      }
    );
    return () => {
      event?.unregister();
    };
  }, []);
  (0, import_compat.useEffect)(() => {
    const fetchFieldLocationData = async () => {
      try {
        const event = await import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.FIELD_LOCATION_DATA, {
          domEditStack: (0, import_getCsDataOfElement.getDOMEditStack)(eventDetails.editableElement)
        });
        setFieldLocationData(event);
      } catch (error) {
        console.error("Error fetching field location data:", error);
      }
    };
    fetchFieldLocationData();
  }, [eventDetails.editableElement]);
  const multipleFieldToolbarButtonClasses = (0, import_classnames.default)(
    "visual-builder__button visual-builder__button--secondary",
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
    {
      "visual-builder__tooltip--bottom": invertTooltipPosition,
      [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "visual-builder__field-toolbar-container",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-toolbar-container"]
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_classnames.default)(
              "visual-builder__focused-toolbar__multiple-field-toolbar",
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__multiple-field-toolbar"]
            ),
            "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                className: (0, import_classnames.default)(
                  "visual-builder__focused-toolbar__button-group",
                  (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__button-group"]
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                  isVariant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_FieldRevertComponent.VariantRevertDropdown,
                    {
                      fieldDataName: fieldMetadata.fieldPathWithIndex,
                      fieldMetadata,
                      variantStatus: fieldVariantStatus,
                      isOpen: isOpenVariantRevert,
                      closeDropdown: closeVariantDropdown,
                      invertTooltipPosition,
                      toggleVariantDropdown,
                      disabled: disableFieldActions
                    }
                  ) : null,
                  isMultiple && !isWholeMultipleField ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__move-left-button",
                        className: multipleFieldToolbarButtonClasses,
                        "data-tooltip": direction === "vertical" ? "Move up" : "Move left",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          (0, import_instanceHandlers.handleMoveInstance)(
                            fieldMetadata,
                            "previous"
                          );
                        },
                        disabled: disableFieldActions || disableMoveLeft,
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_icons.MoveLeftIcon,
                          {
                            className: (0, import_classnames.default)({
                              "visual-builder__rotate--90": direction === "vertical",
                              [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__rotate--90"]]: direction === "vertical"
                            }),
                            disabled: disableFieldActions || disableMoveLeft
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__move-right-button",
                        className: multipleFieldToolbarButtonClasses,
                        "data-tooltip": direction === "vertical" ? "Move down" : "Move right",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          (0, import_instanceHandlers.handleMoveInstance)(
                            fieldMetadata,
                            "next"
                          );
                        },
                        disabled: disableFieldActions || disableMoveRight,
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          import_icons.MoveRightIcon,
                          {
                            className: (0, import_classnames.default)({
                              "visual-builder__rotate--90": direction === "vertical",
                              [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__rotate--90"]]: direction === "vertical"
                            }),
                            disabled: disableFieldActions || disableMoveRight
                          }
                        )
                      }
                    ),
                    isModalEditable ? editButton : null,
                    formButton,
                    isReplaceAllowed ? replaceButton : null,
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__delete-button",
                        className: multipleFieldToolbarButtonClasses,
                        "data-tooltip": "Delete",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          (0, import_instanceHandlers.handleDeleteInstance)(fieldMetadata);
                        },
                        disabled: disableFieldActions,
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.DeleteIcon, {})
                      }
                    )
                  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                    isModalEditable ? editButton : null,
                    isReplaceAllowed ? replaceButton : null,
                    formButton,
                    fieldSchema ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_CommentIcon.default,
                      {
                        fieldMetadata,
                        fieldSchema,
                        invertTooltipPosition
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_FieldLocationIcon.FieldLocationIcon,
                    {
                      fieldLocationData,
                      multipleFieldToolbarButtonClasses,
                      handleMoreIconClick,
                      moreButtonRef,
                      toolbarRef,
                      domEditStack
                    }
                  )
                ] })
              }
            )
          }
        ),
        displayAllApps && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_FieldLocationAppList.FieldLocationAppList,
          {
            toolbarRef,
            apps: fieldLocationData?.apps || [],
            position: appListPosition,
            domEditStack,
            setDisplayAllApps,
            displayAllApps
          }
        )
      ]
    }
  );
}
var FieldToolbar_default = FieldToolbarComponent;
//# sourceMappingURL=FieldToolbar.cjs.map