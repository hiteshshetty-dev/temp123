import { ISchemaFieldMap } from './types/index.types.cjs';
import { FieldDetails } from '../components/FieldToolbar.cjs';
import { EntryPermissions } from './getEntryPermissions.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

declare enum DisableReason {
    ReadOnly = "You have only read access to this field",
    LocalizedEntry = "Editing this field is restricted in localized entries",
    UnlinkedVariant = "This field is not editable as it is not linked to the selected variant",
    AudienceMode = "Open an Experience from Audience widget to start editing",
    DisabledVariant = "This field is not editable as it doesn't match the selected variant",
    UnlocalizedVariant = "This field is not editable as it is not localized",
    None = "",
    EntryUpdateRestricted = "You do not have permission to edit this entry"
}
interface FieldDisableState {
    isDisabled: boolean;
    reason: DisableReason;
}
declare const isFieldDisabled: (fieldSchemaMap: ISchemaFieldMap, eventFieldDetails: FieldDetails, entryPermissions?: EntryPermissions) => FieldDisableState;

export { isFieldDisabled };
