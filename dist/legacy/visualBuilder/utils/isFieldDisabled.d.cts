import { ISchemaFieldMap } from './types/index.types.cjs';
import { FieldDetails } from '../components/FieldToolbar.cjs';
import { EntryPermissions } from './getEntryPermissions.cjs';
import { WorkflowStageDetails } from './getWorkflowStageDetails.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

interface FieldDisableState {
    isDisabled: boolean;
    reason: string;
}
declare const isFieldDisabled: (fieldSchemaMap: ISchemaFieldMap, eventFieldDetails: FieldDetails, entryPermissions?: EntryPermissions, entryWorkflowStageDetails?: WorkflowStageDetails) => FieldDisableState;

export { isFieldDisabled };
