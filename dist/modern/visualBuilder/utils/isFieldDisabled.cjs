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
var DisableReason = {
  ReadOnly: "You have only read access to this field",
  LocalizedEntry: "Editing this field is restricted in localized entries",
  UnlinkedVariant: "This field is not editable as it is not linked to the selected variant",
  AudienceMode: "Open an Experience from Audience widget to start editing",
  DisabledVariant: "This field is not editable as it doesn't match the selected variant",
  UnlocalizedVariant: "This field is not editable as it is not localized",
  None: "",
  EntryUpdateRestricted: "You do not have permission to edit this entry",
  WorkflowStagePermission: ({ stageName }) => `You do not have Edit access to this entry on the '${stageName}' workflow stage`,
  EntryUpdateRestrictedRoleAndWorkflowStage: ({
    stageName
  }) => `Editing is restricted for your role or by the rules for the '${stageName}' stage. Contact your admin for edit access.`
};
var getDisableReason = (flags, params) => {
  if (flags.updateRestrictDueToRole) return DisableReason.ReadOnly;
  if (flags.updateRestrictDueToNonLocalizableFields)
    return DisableReason.LocalizedEntry;
  if (flags.updateRestrictDueToUnlocalizedVariant)
    return DisableReason.UnlocalizedVariant;
  if (flags.updateRestrictDueToUnlinkVariant)
    return DisableReason.UnlinkedVariant;
  if (flags.updateRestrictDueToAudienceMode)
    return DisableReason.AudienceMode;
  if (flags.updateRestrictDueToDisabledVariant)
    return DisableReason.DisabledVariant;
  if (flags.updateRestrictDueToEntryUpdateRestriction && flags.updateRestrictDueToWorkflowStagePermission) {
    return DisableReason.EntryUpdateRestrictedRoleAndWorkflowStage({
      stageName: params?.stageName ? params.stageName : "Unknown"
    });
  }
  if (flags.updateRestrictDueToEntryUpdateRestriction) {
    return DisableReason.EntryUpdateRestricted;
  }
  if (flags.updateRestrictDueToWorkflowStagePermission) {
    return DisableReason.WorkflowStagePermission({
      stageName: params?.stageName ? params.stageName : "Unknown"
    });
  }
  return DisableReason.None;
};
var isFieldDisabled = (fieldSchemaMap, eventFieldDetails, entryPermissions, entryWorkflowStageDetails) => {
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
  if (entryWorkflowStageDetails && !entryWorkflowStageDetails.permissions.entry.update) {
    flags.updateRestrictDueToWorkflowStagePermission = true;
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
  const reason = getDisableReason(flags, {
    stageName: entryWorkflowStageDetails?.stage?.name
  });
  return { isDisabled, reason };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFieldDisabled
});
//# sourceMappingURL=isFieldDisabled.cjs.map