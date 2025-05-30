import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/isFieldDisabled.ts
import Config from "../../configManager/configManager.js";
import { VisualBuilder } from "../index.js";
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
  const masterLocale = Config.get().stackDetails.masterLocale || "en-us";
  const { locale: cmsLocale, variant } = VisualBuilder.VisualBuilderGlobalState.value;
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
  const reason = getDisableReason(flags);
  return { isDisabled, reason };
};
export {
  isFieldDisabled
};
//# sourceMappingURL=isFieldDisabled.js.map