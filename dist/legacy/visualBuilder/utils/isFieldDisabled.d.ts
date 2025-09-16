import { ISchemaFieldMap } from './types/index.types.js';
import { FieldDetails } from '../components/FieldToolbar.js';
import { EntryPermissions } from './getEntryPermissions.js';
import { WorkflowStageDetails } from './getWorkflowStageDetails.js';
import '../../cms/types/contentTypeSchema.types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

interface FieldDisableState {
    isDisabled: boolean;
    reason: string;
}
declare const isFieldDisabled: (fieldSchemaMap: ISchemaFieldMap, eventFieldDetails: FieldDetails, entryPermissions?: EntryPermissions, entryWorkflowStageDetails?: WorkflowStageDetails) => FieldDisableState;

export { isFieldDisabled };
