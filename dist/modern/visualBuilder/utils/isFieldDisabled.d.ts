import { ISchemaFieldMap } from './types/index.types.js';
import { FieldDetails } from '../components/FieldToolbar.js';
import '../../cms/types/contentTypeSchema.types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

declare enum DisableReason {
    ReadOnly = "You have only read access to this field",
    LocalizedEntry = "Editing this field is restricted in localized entries",
    UnlinkedVariant = "This field is not editable as it is not linked to the selected variant",
    AudienceMode = "Open an Experience from Audience widget to start editing",
    DisabledVariant = "This field is not editable as it doesn't match the selected variant",
    UnlocalizedVariant = "This field is not editable as it is not localized",
    None = ""
}
interface FieldDisableState {
    isDisabled: boolean;
    reason: DisableReason;
}
declare const isFieldDisabled: (fieldSchemaMap: ISchemaFieldMap, eventFieldDetails: FieldDetails) => FieldDisableState;

export { isFieldDisabled };
