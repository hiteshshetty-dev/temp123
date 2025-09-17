import { WorkflowStageDetails } from './getWorkflowStageDetails.js';
import { EntryPermissions } from './getEntryPermissions.js';

declare function fetchEntryPermissionsAndStageDetails({ entryUid, contentTypeUid, locale, variantUid, }: {
    entryUid: string;
    contentTypeUid: string;
    locale: string;
    variantUid?: string | undefined;
}): Promise<{
    acl: EntryPermissions | undefined;
    workflowStage: WorkflowStageDetails | undefined;
}>;

export { fetchEntryPermissionsAndStageDetails };
