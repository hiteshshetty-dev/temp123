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

// src/visualBuilder/components/FieldRevert/FieldRevertComponent.tsx
var FieldRevertComponent_exports = {};
__export(FieldRevertComponent_exports, {
  BASE_VARIANT_STATUS: () => BASE_VARIANT_STATUS,
  FieldRevertComponent: () => FieldRevertComponent,
  VariantRevertDropdown: () => VariantRevertDropdown,
  getFieldVariantStatus: () => getFieldVariantStatus
});
module.exports = __toCommonJS(FieldRevertComponent_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_compat = require("preact/compat");
var import_visualBuilder = require("../../visualBuilder.style.cjs");
var import_visualBuilderPostMessage = __toESM(require("../../utils/visualBuilderPostMessage.cjs"), 1);
var import_variant = require("../icons/variant.cjs");
var import_icons = require("../icons/index.cjs");
var import_useHandleOutsideClick = __toESM(require("./useHandleOutsideClick.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var BASE_VARIANT_STATUS = {
  isAddedInstances: false,
  isBaseModified: false,
  isDeletedInstances: false,
  isOrderChanged: false,
  fieldLevelCustomizations: false
};
async function getFieldVariantStatus(fieldMetadata) {
  var _a;
  try {
    const result = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      "get-field-variant-status",
      fieldMetadata
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
    (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send("send-variant-revert-action-trigger", {
      fieldDataName: fieldDataName2,
      action,
      euid: fieldMetadata.entry_uid,
      ct_uid: fieldMetadata.content_type_uid,
      locale: fieldMetadata.locale
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_classnames.default)(
        "variant-field-revert-component",
        (0, import_visualBuilder.visualBuilderStyles)()["variant-field-revert-component"]
      ),
      onClick: (e) => e.stopPropagation(),
      children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-testid": "variant-field-revert-component__dropdown-content",
          className: (0, import_classnames.default)(
            "variant-field-revert-component__dropdown-content",
            (0, import_visualBuilder.visualBuilderStyles)()["variant-field-revert-component__dropdown-content"]
          ),
          children: dropdownItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_classnames.default)(
                "variant-field-revert-component__dropdown-content__list-item",
                (0, import_visualBuilder.visualBuilderStyles)()["variant-field-revert-component__dropdown-content__list-item"]
              ),
              onClick: (e) => {
                e.preventDefault();
                handleOnClick(item);
                closeDropdown();
              },
              "data-testid": item.testId,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
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
  const dropdownRef = (0, import_compat.useRef)(null);
  (0, import_useHandleOutsideClick.default)(dropdownRef, closeDropdown);
  const hasDropdownItems = Object.values(variantStatus).some(
    (value) => value
  );
  const buttonClassNames = (0, import_classnames.default)(
    "visual-builder__button visual-builder__button--secondary",
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button"],
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__button--secondary"],
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"],
    {
      "visual-builder__tooltip--bottom": invertTooltipPosition,
      [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
    }
  );
  if (!hasDropdownItems) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        className: (0, import_classnames.default)(buttonClassNames),
        style: { padding: "6px" },
        "data-tooltip": "Variant",
        "data-testid": `visual-builder-canvas-variant-icon`,
        disabled,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_variant.VariantIcon, {})
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: dropdownRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        className: (0, import_classnames.default)(
          buttonClassNames,
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-button"]
        ),
        "data-tooltip": "Variant Revert",
        "data-testid": `visual-builder-canvas-variant-revert`,
        onClick: toggleVariantDropdown,
        disabled,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_variant.VariantIcon, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.CaretIcon, { open: props.isOpen })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRevertComponent, { ...props })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BASE_VARIANT_STATUS,
  FieldRevertComponent,
  VariantRevertDropdown,
  getFieldVariantStatus
});
//# sourceMappingURL=FieldRevertComponent.cjs.map