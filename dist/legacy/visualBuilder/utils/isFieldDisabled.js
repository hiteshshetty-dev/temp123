import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/isFieldDisabled.ts
import Config from "../../configManager/configManager.js";
import { VisualBuilder } from "../index.js";
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
      stageName: (params == null ? void 0 : params.stageName) ? params.stageName : "Unknown"
    });
  }
  if (flags.updateRestrictDueToEntryUpdateRestriction) {
    return DisableReason.EntryUpdateRestricted;
  }
  if (flags.updateRestrictDueToWorkflowStagePermission) {
    return DisableReason.WorkflowStagePermission({
      stageName: (params == null ? void 0 : params.stageName) ? params.stageName : "Unknown"
    });
  }
  return DisableReason.None;
};
var isFieldDisabled = (fieldSchemaMap, eventFieldDetails, entryPermissions, entryWorkflowStageDetails) => {
  var _a, _b, _c;
  const { editableElement, fieldMetadata } = eventFieldDetails;
  const masterLocale = Config.get().stackDetails.masterLocale || "en-us";
  const { locale: cmsLocale, variant } = VisualBuilder.VisualBuilderGlobalState.value;
  const flags = {
    updateRestrictDueToRole: Boolean(
      (_a = fieldSchemaMap == null ? void 0 : fieldSchemaMap.field_metadata) == null ? void 0 : _a.updateRestrict
    ),
    updateRestrictDueToUnlinkVariant: Boolean(
      (_b = fieldSchemaMap == null ? void 0 : fieldSchemaMap.field_metadata) == null ? void 0 : _b.isUnlinkedVariant
    ),
    updateRestrictDueToUnlocalizedVariant: Boolean(
      variant && fieldMetadata.locale !== cmsLocale
    ),
    updateRestrictDueToNonLocalizableFields: Boolean(
      (fieldSchemaMap == null ? void 0 : fieldSchemaMap.non_localizable) && masterLocale !== fieldMetadata.locale
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
  if (VisualBuilder.VisualBuilderGlobalState.value.audienceMode && !editableElement.classList.contains("visual-builder__variant-field") && !editableElement.classList.contains("visual-builder__base-field")) {
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
    stageName: (_c = entryWorkflowStageDetails == null ? void 0 : entryWorkflowStageDetails.stage) == null ? void 0 : _c.name
  });
  return { isDisabled, reason };
};
export {
  isFieldDisabled
};
//# sourceMappingURL=isFieldDisabled.js.map