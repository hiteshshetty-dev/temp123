import "../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/FieldRevert/FieldRevertComponent.tsx
import classNames from "classnames";
import { useRef } from "preact/compat";
import { visualBuilderStyles } from "../../visualBuilder.style.js";
import visualBuilderPostMessage from "../../utils/visualBuilderPostMessage.js";
import { VariantIcon } from "../icons/variant.js";
import { CaretIcon } from "../icons/index.js";
import useHandleOutsideClick from "./useHandleOutsideClick.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var BASE_VARIANT_STATUS = {
  isAddedInstances: false,
  isBaseModified: false,
  isDeletedInstances: false,
  isOrderChanged: false,
  fieldLevelCustomizations: false
};
async function getFieldVariantStatus(fieldMetadata) {
  try {
    const result = await visualBuilderPostMessage?.send(
      "get-field-variant-status",
      fieldMetadata
    );
    return result;
  } catch (error) {
    console.error("Failed to get field variant status:", error);
  }
}
var FieldRevertComponent = (props) => {
  const {
    fieldDataName,
    fieldMetadata,
    variantStatus = BASE_VARIANT_STATUS,
    isOpen,
    closeDropdown
  } = props;
  const getDropdownItems = () => {
    const {
      isAddedInstances,
      isDeletedInstances,
      isBaseModified,
      isOrderChanged,
      fieldLevelCustomizations
    } = variantStatus;
    const dropdownItems2 = [];
    if (isBaseModified) {
      dropdownItems2.push({
        label: "Revert to base entry value",
        action: "revert_to_base_entry_value",
        id: `iframe-cs-variant-field-${fieldDataName}-revert`,
        testId: `iframe-cs-variant-field-${fieldDataName}-revert`,
        fieldDataName
      });
    }
    if (isAddedInstances) {
      dropdownItems2.push({
        label: "Revert added instances",
        action: "revert_added_instances",
        id: `iframe-cs-variant-field-${fieldDataName}-revert-added-instances`,
        testId: `iframe-cs-variant-field-${fieldDataName}-revert-added-instances`,
        fieldDataName
      });
    }
    if (isDeletedInstances) {
      dropdownItems2.push({
        label: "Restore deleted instances",
        action: "restore_deleted_instances",
        id: `iframe-cs-variant-field-${fieldDataName}-restore-deleted-instances`,
        testId: `iframe-cs-variant-field-${fieldDataName}-restore-deleted-instances`,
        fieldDataName
      });
    }
    if (fieldLevelCustomizations) {
      dropdownItems2.push({
        label: "Reset field-level customizations",
        action: "reset_field_level_customizations",
        id: `iframe-cs-variant-field-${fieldDataName}-reset-field-level-customizations`,
        testId: `iframe-cs-variant-field-${fieldDataName}-reset-field-level-customizations`,
        fieldDataName
      });
    }
    if (isOrderChanged) {
      dropdownItems2.push({
        label: "Restore sorted instances",
        action: "restore_sorted_instances",
        id: `iframe-cs-variant-field-${fieldDataName}-restore-sorted-instances`,
        testId: `iframe-cs-variant-field-${fieldDataName}-restore-sorted-instances`,
        fieldDataName
      });
    }
    return dropdownItems2;
  };
  const dropdownItems = getDropdownItems();
  function handleOnClick(item) {
    const { fieldDataName: fieldDataName2, action } = item;
    visualBuilderPostMessage?.send("send-variant-revert-action-trigger", {
      fieldDataName: fieldDataName2,
      action,
      euid: fieldMetadata.entry_uid,
      ct_uid: fieldMetadata.content_type_uid,
      locale: fieldMetadata.locale
    });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames(
        "variant-field-revert-component",
        visualBuilderStyles()["variant-field-revert-component"]
      ),
      onClick: (e) => e.stopPropagation(),
      children: isOpen && /* @__PURE__ */ jsx(
        "div",
        {
          "data-testid": "variant-field-revert-component__dropdown-content",
          className: classNames(
            "variant-field-revert-component__dropdown-content",
            visualBuilderStyles()["variant-field-revert-component__dropdown-content"]
          ),
          children: dropdownItems.map((item) => /* @__PURE__ */ jsx(
            "div",
            {
              className: classNames(
                "variant-field-revert-component__dropdown-content__list-item",
                visualBuilderStyles()["variant-field-revert-component__dropdown-content__list-item"]
              ),
              onClick: (e) => {
                e.preventDefault();
                handleOnClick(item);
                closeDropdown();
              },
              "data-testid": item.testId,
              children: /* @__PURE__ */ jsx("span", { children: item.label })
            },
            item.id
          ))
        }
      )
    }
  );
};
var VariantRevertDropdown = (props) => {
  const {
    closeDropdown,
    invertTooltipPosition,
    toggleVariantDropdown,
    variantStatus = BASE_VARIANT_STATUS,
    disabled
  } = props;
  const dropdownRef = useRef(null);
  useHandleOutsideClick(dropdownRef, closeDropdown);
  const hasDropdownItems = Object.values(variantStatus).some(
    (value) => value
  );
  const buttonClassNames = classNames(
    "visual-builder__button visual-builder__button--secondary",
    visualBuilderStyles()["visual-builder__button"],
    visualBuilderStyles()["visual-builder__button--secondary"],
    visualBuilderStyles()["visual-builder__tooltip"],
    {
      "visual-builder__tooltip--bottom": invertTooltipPosition,
      [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
    }
  );
  if (!hasDropdownItems) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: classNames(buttonClassNames),
        style: { padding: "6px" },
        "data-tooltip": "Variant",
        "data-testid": `visual-builder-canvas-variant-icon`,
        disabled,
        children: /* @__PURE__ */ jsx(VariantIcon, {})
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: classNames(
          buttonClassNames,
          visualBuilderStyles()["visual-builder__variant-button"]
        ),
        "data-tooltip": "Variant Revert",
        "data-testid": `visual-builder-canvas-variant-revert`,
        onClick: toggleVariantDropdown,
        disabled,
        children: [
          /* @__PURE__ */ jsx(VariantIcon, {}),
          /* @__PURE__ */ jsx(CaretIcon, { open: props.isOpen })
        ]
      }
    ),
    /* @__PURE__ */ jsx(FieldRevertComponent, { ...props })
  ] });
};
export {
  BASE_VARIANT_STATUS,
  FieldRevertComponent,
  VariantRevertDropdown,
  getFieldVariantStatus
};
//# sourceMappingURL=FieldRevertComponent.js.map