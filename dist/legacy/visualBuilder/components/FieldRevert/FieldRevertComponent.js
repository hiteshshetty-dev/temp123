import "../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/FieldRevert/FieldRevertComponent.tsx
import classNames from "classnames";
import { useRef, useEffect } from "preact/compat";
import { visualBuilderStyles } from "../../visualBuilder.style.js";
import visualBuilderPostMessage from "../../utils/visualBuilderPostMessage.js";
import { jsx } from "preact/jsx-runtime";
var BASE_VARIANT_STATUS = {
  isAddedInstances: false,
  isBaseModified: false,
  isDeletedInstances: false,
  isOrderChanged: false,
  fieldLevelCustomizations: false
};
async function getFieldVariantStatus(fieldPathWithIndex) {
  var _a;
  try {
    const result = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      "get-field-variant-status",
      fieldPathWithIndex
    ));
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
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
    var _a;
    const { fieldDataName: fieldDataName2, action } = item;
    (_a = visualBuilderPostMessage) == null ? void 0 : _a.send("send-variant-revert-action-trigger", {
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
      ref: dropdownRef,
      onClick: (e) => e.stopPropagation(),
      children: isOpen && /* @__PURE__ */ jsx(
        "div",
        {
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
export {
  BASE_VARIANT_STATUS,
  FieldRevertComponent,
  getFieldVariantStatus
};
//# sourceMappingURL=FieldRevertComponent.js.map