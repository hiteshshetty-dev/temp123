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

// src/visualBuilder/utils/isFieldDisabled.ts
var isFieldDisabled_exports = {};
__export(isFieldDisabled_exports, {
  isFieldDisabled: () => isFieldDisabled
});
module.exports = __toCommonJS(isFieldDisabled_exports);
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import__ = require("../index.cjs");
var getDisableReason = (flags) => {
  if (flags.updateRestrictDueToEntryUpdateRestriction) {
    return "You do not have permission to edit this entry" /* EntryUpdateRestricted */;
  }
  if (flags.updateRestrictDueToRole) return "You have only read access to this field" /* ReadOnly */;
  if (flags.updateRestrictDueToNonLocalizableFields)
    return "Editing this field is restricted in localized entries" /* LocalizedEntry */;
  if (flags.updateRestrictDueToUnlocalizedVariant)
    return "This field is not editable as it is not localized" /* UnlocalizedVariant */;
  if (flags.updateRestrictDueToUnlinkVariant)
    return "This field is not editable as it is not linked to the selected variant" /* UnlinkedVariant */;
  if (flags.updateRestrictDueToAudienceMode)
    return "Open an Experience from Audience widget to start editing" /* AudienceMode */;
  if (flags.updateRestrictDueToDisabledVariant)
    return "This field is not editable as it doesn't match the selected variant" /* DisabledVariant */;
  return "" /* None */;
};
var isFieldDisabled = (fieldSchemaMap, eventFieldDetails, entryPermissions) => {
  const { editableElement, fieldMetadata } = eventFieldDetails;
  const masterLocale = import_configManager.default.get().stackDetails.masterLocale || "en-us";
  const { locale: cmsLocale, variant } = import__.VisualBuilder.VisualBuilderGlobalState.value;
  const flags = {
    updateRestrictDueToRole: Boolean(
      fieldSchemaMap?.field_metadata?.updateRestrict
    ),
    updateRestrictDueToUnlinkVariant: Boolean(
      fieldSchemaMap?.field_metadata?.isUnlinkedVariant
    ),
    updateRestrictDueToUnlocalizedVariant: Boolean(
      variant && fieldMetadata.locale !== cmsLocale
    ),
    updateRestrictDueToNonLocalizableFields: Boolean(
      fieldSchemaMap?.non_localizable && masterLocale !== fieldMetadata.locale
    ),
    updateRestrictDueToAudienceMode: false,
    updateRestrictDueToDisabledVariant: false
  };
  if (entryPermissions && !entryPermissions.update) {
    flags.updateRestrictDueToEntryUpdateRestriction = true;
  }
  if (import__.VisualBuilder.VisualBuilderGlobalState.value.audienceMode && !editableElement.classList.contains("visual-builder__variant-field") && !editableElement.classList.contains("visual-builder__base-field")) {
    if (editableElement.classList.contains(
      "visual-builder__disabled-variant-field"
    )) {
      flags.updateRestrictDueToDisabledVariant = true;
    } else {
      flags.updateRestrictDueToAudienceMode = true;
    }
  }
  const isDisabled = Object.values(flags).some(Boolean);
  const reason = getDisableReason(flags);
  return { isDisabled, reason };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFieldDisabled
});
//# sourceMappingURL=isFieldDisabled.cjs.map