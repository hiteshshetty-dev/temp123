import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/isFieldDisabled.ts
import Config from "../../configManager/configManager.js";
import { VisualBuilder } from "../index.js";
var getDisableReason = (flags) => {
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
var isFieldDisabled = (fieldSchemaMap, eventFieldDetails) => {
  var _a, _b;
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