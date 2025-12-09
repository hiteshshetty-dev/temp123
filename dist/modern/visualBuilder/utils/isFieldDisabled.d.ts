import { ISchemaFieldMap } from './types/index.types.js';
import { FieldDetails } from '../components/FieldToolbar.js';
import { EntryPermissions } from './getEntryPermissions.js';
import { WorkflowStageDetails } from './getWorkflowStageDetails.js';
import { ResolvedVariantPermissions } from './getResolvedVariantPermissions.js';
import '../../cms/types/contentTypeSchema.types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

declare const DisableReason: {
    readonly ReadOnly: "You have only read access to this field";
    readonly LocalizedEntry: "Editing this field is restricted in localized entries";
    readonly ResolvedVariantPermissions: "This field does not exist in the selected variant";
    readonly UnlinkedVariant: "This field is not editable as it is not linked to the selected variant.";
    readonly CanLinkVariant: "Click here to link a variant";
    readonly UnderlinedAndClickableWord: "here";
    readonly CannotLinkVariant: "Contact your stack admin or owner to link it.";
    readonly AudienceMode: "To edit an experience, open the Audience widget and click the Edit icon.";
    readonly DisabledVariant: "This field is not editable as it doesn't match the selected variant";
    readonly UnlocalizedVariant: "This field is not editable as it is not localized";
    readonly None: "";
    readonly EntryUpdateRestricted: "You do not have permission to edit this entry";
    readonly WorkflowStagePermission: ({ stageName }: {
        stageName: string;
    }) => string;
    readonly EntryUpdateRestrictedRoleAndWorkflowStage: ({ stageName, }: {
        stageName: string;
    }) => string;
};
interface FieldDisableState {
    isDisabled: boolean;
    reason: string;
}
declare const isFieldDisabled: (fieldSchemaMap: ISchemaFieldMap, eventFieldDetails: FieldDetails, resolvedVariantPermissions?: ResolvedVariantPermissions, entryPermissions?: EntryPermissions, entryWorkflowStageDetails?: WorkflowStageDetails) => FieldDisableState;

export { DisableReason, isFieldDisabled };
