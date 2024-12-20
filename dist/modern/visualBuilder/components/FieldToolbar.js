import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/FieldToolbar.tsx
import getChildrenDirection from "../utils/getChildrenDirection.js";
import {
  ALLOWED_MODAL_EDITABLE_FIELD,
  ALLOWED_REPLACE_FIELDS,
  DEFAULT_MULTIPLE_FIELDS
} from "../utils/constants.js";
import { getFieldType } from "../utils/getFieldType.js";
import {
  handleDeleteInstance,
  handleMoveInstance
} from "../utils/instanceHandlers.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { FieldDataType } from "../utils/types/index.types.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import {
  CaretIcon,
  DeleteIcon,
  MoveLeftIcon,
  MoveRightIcon,
  ReplaceAssetIcon
} from "./icons/index.js";
import { fieldIcons } from "./icons/fields/index.js";
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import CommentIcon from "./CommentIcon.js";
import { useEffect, useState } from "preact/compat";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { isFieldDisabled } from "../utils/isFieldDisabled.js";
import { FormIcon } from "./icons/index.js";
import { getDOMEditStack } from "../utils/getCsDataOfElement.js";
import { VariantIcon } from "./icons/variant.js";
import {
  BASE_VARIANT_STATUS,
  FieldRevertComponent,
  getFieldVariantStatus
} from "./FieldRevert/FieldRevertComponent.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
var TOOLTIP_TOP_EDGE_BUFFER = 96;
function handleReplaceAsset(fieldMetadata) {
  visualBuilderPostMessage?.send(
    VisualBuilderPostMessageEvents.OPEN_ASSET_MODAL,
    {
      fieldMetadata
    }
  );
}
function handleReplaceReference(fieldMetadata) {
  const isMultipleInstance = fieldMetadata.multipleFieldMetadata.index > -1 && fieldMetadata.fieldPathWithIndex === fieldMetadata.multipleFieldMetadata.parentDetails?.parentPath;
  const entryPath = isMultipleInstance ? fieldMetadata.instance.fieldPathWithIndex : fieldMetadata.fieldPathWithIndex;
  visualBuilderPostMessage?.send(
    VisualBuilderPostMessageEvents.OPEN_REFERENCE_MODAL,
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
  visualBuilderPostMessage?.send(
    VisualBuilderPostMessageEvents.OPEN_FIELD_EDIT_MODAL,
    { fieldMetadata }
  );
}
function handleFormFieldFocus(eventDetails) {
  const { editableElement, fieldMetadata, cslpData } = eventDetails;
  visualBuilderPostMessage?.send(VisualBuilderPostMessageEvents.TOGGLE_FORM, {
    fieldMetadata,
    cslpData
  }).then(() => {
    visualBuilderPostMessage?.send(
      VisualBuilderPostMessageEvents.FOCUS_FIELD,
      {
        DOMEditStack: getDOMEditStack(editableElement)
      }
    );
  });
}
function FieldToolbarComponent(props) {
  const { eventDetails } = props;
  const { fieldMetadata, editableElement: targetElement } = eventDetails;
  const parentPath = fieldMetadata?.multipleFieldMetadata?.parentDetails?.parentCslpValue || "";
  const direction = getChildrenDirection(targetElement, parentPath);
  const isVariant = !!fieldMetadata?.variant;
  const [fieldSchema, setFieldSchema] = useState(
    null
  );
  const [fieldVariantStatus, setFieldVariantStatus] = useState(BASE_VARIANT_STATUS);
  const [isOpenVariantRevert, setIsOpenVariantRevert] = useState(false);
  let isModalEditable = false;
  let isReplaceAllowed = false;
  let isMultiple = false;
  let Icon = null;
  let fieldType = null;
  let isWholeMultipleField = false;
  if (fieldSchema) {
    const { isDisabled } = isFieldDisabled(fieldSchema, {
      editableElement: targetElement,
      fieldMetadata
    });
    if (isDisabled) {
      return null;
    }
    fieldType = getFieldType(fieldSchema);
    isModalEditable = ALLOWED_MODAL_EDITABLE_FIELD.includes(fieldType);
    isReplaceAllowed = ALLOWED_REPLACE_FIELDS.includes(fieldType);
    Icon = fieldIcons[fieldType];
    isMultiple = fieldSchema.multiple || false;
    if (fieldType === FieldDataType.REFERENCE)
      isMultiple = fieldSchema.field_metadata.ref_multiple;
    isWholeMultipleField = isMultiple && (fieldMetadata.fieldPathWithIndex === fieldMetadata.instance.fieldPathWithIndex || fieldMetadata.multipleFieldMetadata?.index === -1);
    if (DEFAULT_MULTIPLE_FIELDS.includes(fieldType) && isWholeMultipleField) {
      return null;
    }
  }
  const invertTooltipPosition = targetElement.getBoundingClientRect().top <= TOOLTIP_TOP_EDGE_BUFFER;
  const editButton = Icon ? /* @__PURE__ */ jsx(
    "button",
    {
      "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__edit-button",
      className: classNames(
        "visual-builder__button visual-builder__button--secondary visual-builder__button--edit",
        visualBuilderStyles()["visual-builder__button"],
        visualBuilderStyles()["visual-builder__button--secondary"],
        visualBuilderStyles()["visual-builder__button--edit"],
        visualBuilderStyles()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Edit",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEdit(fieldMetadata);
      },
      children: /* @__PURE__ */ jsx(Icon, {})
    }
  ) : null;
  const replaceButton = fieldType ? /* @__PURE__ */ jsx(
    "button",
    {
      className: classNames(
        "visual-builder__replace-button visual-builder__button visual-builder__button--secondary",
        visualBuilderStyles()["visual-builder__button"],
        visualBuilderStyles()["visual-builder__button--secondary"],
        visualBuilderStyles()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Replace",
      "data-testid": `visual-builder-replace-${fieldType}`,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (fieldType === FieldDataType.REFERENCE) {
          handleReplaceReference(fieldMetadata);
          return;
        } else if (fieldType === FieldDataType.FILE) {
          handleReplaceAsset(fieldMetadata);
          return;
        }
      },
      children: /* @__PURE__ */ jsx(ReplaceAssetIcon, {})
    }
  ) : null;
  const formButton = /* @__PURE__ */ jsx(
    "button",
    {
      className: classNames(
        "visual-builder__replace-button visual-builder__button visual-builder__button--secondary",
        visualBuilderStyles()["visual-builder__button"],
        visualBuilderStyles()["visual-builder__button--secondary"],
        visualBuilderStyles()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Form",
      "data-testid": `visual-builder-form`,
      onClick: (e) => {
        handleFormFieldFocus(eventDetails);
      },
      children: /* @__PURE__ */ jsx(FormIcon, {})
    }
  );
  const toggleVariantDropdown = () => {
    setIsOpenVariantRevert(!isOpenVariantRevert);
  };
  const closeVariantDropdown = () => {
    setIsOpenVariantRevert(false);
  };
  const variantButton = /* @__PURE__ */ jsxs(
    "button",
    {
      className: classNames(
        "visual-builder__variant-button visual-builder__button visual-builder__button--secondary",
        visualBuilderStyles()["visual-builder__button"],
        visualBuilderStyles()["visual-builder__button--secondary"],
        visualBuilderStyles()["visual-builder__tooltip"],
        visualBuilderStyles()["visual-builder__variant-button"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Variant Revert",
      "data-testid": `visual-builder-canvas-variant-revert`,
      onClick: toggleVariantDropdown,
      children: [
        /* @__PURE__ */ jsx(VariantIcon, {}),
        /* @__PURE__ */ jsx(CaretIcon, { open: isOpenVariantRevert })
      ]
    }
  );
  const totalElementCount = targetElement?.parentNode?.childElementCount ?? 1;
  const indexOfElement = fieldMetadata?.multipleFieldMetadata?.index;
  const disableMoveLeft = indexOfElement === 0;
  const disableMoveRight = indexOfElement === totalElementCount - 1;
  useEffect(() => {
    async function fetchFieldSchema() {
      const fieldSchema2 = await FieldSchemaMap.getFieldSchema(
        fieldMetadata.content_type_uid,
        fieldMetadata.fieldPath
      );
      if (fieldSchema2) {
        setFieldSchema(fieldSchema2);
      }
      const variantStatus = await getFieldVariantStatus(fieldMetadata);
      setFieldVariantStatus(variantStatus ?? BASE_VARIANT_STATUS);
    }
    fetchFieldSchema();
  }, [fieldMetadata]);
  useEffect(() => {
    const event = visualBuilderPostMessage?.on(
      VisualBuilderPostMessageEvents.DELETE_INSTANCE,
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
  const multipleFieldToolbarButtonClasses = classNames(
    "visual-builder__button visual-builder__button--secondary",
    visualBuilderStyles()["visual-builder__button"],
    visualBuilderStyles()["visual-builder__button--secondary"],
    visualBuilderStyles()["visual-builder__tooltip"],
    {
      "visual-builder__tooltip--bottom": invertTooltipPosition,
      [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
    }
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "visual-builder__field-toolbar-container",
        visualBuilderStyles()["visual-builder__field-toolbar-container"]
      ),
      children: [
        isVariant && /* @__PURE__ */ jsx(
          FieldRevertComponent,
          {
            fieldDataName: fieldMetadata.fieldPathWithIndex,
            fieldMetadata,
            variantStatus: fieldVariantStatus,
            isOpen: isOpenVariantRevert,
            closeDropdown: closeVariantDropdown
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: classNames(
              "visual-builder__focused-toolbar__multiple-field-toolbar",
              visualBuilderStyles()["visual-builder__focused-toolbar__multiple-field-toolbar"]
            ),
            "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar",
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: classNames(
                  "visual-builder__focused-toolbar__button-group",
                  visualBuilderStyles()["visual-builder__focused-toolbar__button-group"]
                ),
                children: /* @__PURE__ */ jsxs(Fragment, { children: [
                  isVariant ? variantButton : null,
                  isMultiple && !isWholeMultipleField ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__move-left-button",
                        className: multipleFieldToolbarButtonClasses,
                        "data-tooltip": direction === "vertical" ? "Move up" : "Move left",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleMoveInstance(
                            fieldMetadata,
                            "previous"
                          );
                        },
                        disabled: disableMoveLeft,
                        children: /* @__PURE__ */ jsx(
                          MoveLeftIcon,
                          {
                            className: classNames({
                              "visual-builder__rotate--90": direction === "vertical",
                              [visualBuilderStyles()["visual-builder__rotate--90"]]: direction === "vertical"
                            }),
                            disabled: disableMoveLeft
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__move-right-button",
                        className: multipleFieldToolbarButtonClasses,
                        "data-tooltip": direction === "vertical" ? "Move down" : "Move right",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleMoveInstance(
                            fieldMetadata,
                            "next"
                          );
                        },
                        disabled: disableMoveRight,
                        children: /* @__PURE__ */ jsx(
                          MoveRightIcon,
                          {
                            className: classNames({
                              "visual-builder__rotate--90": direction === "vertical",
                              [visualBuilderStyles()["visual-builder__rotate--90"]]: direction === "vertical"
                            }),
                            disabled: disableMoveRight
                          }
                        )
                      }
                    ),
                    isModalEditable ? editButton : null,
                    formButton,
                    isReplaceAllowed ? replaceButton : null,
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__delete-button",
                        className: multipleFieldToolbarButtonClasses,
                        "data-tooltip": "Delete",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteInstance(fieldMetadata);
                        },
                        children: /* @__PURE__ */ jsx(DeleteIcon, {})
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    isModalEditable ? editButton : null,
                    isReplaceAllowed ? replaceButton : null,
                    formButton,
                    fieldSchema ? /* @__PURE__ */ jsx(
                      CommentIcon,
                      {
                        fieldMetadata,
                        fieldSchema,
                        invertTooltipPosition
                      }
                    ) : null
                  ] })
                ] })
              }
            )
          }
        )
      ]
    }
  );
}
var FieldToolbar_default = FieldToolbarComponent;
export {
  FieldToolbar_default as default
};
//# sourceMappingURL=FieldToolbar.js.map