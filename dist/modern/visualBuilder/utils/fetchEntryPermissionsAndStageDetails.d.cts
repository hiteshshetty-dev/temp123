import { WorkflowStageDetails } from './getWorkflowStageDetails.cjs';
import { EntryPermissions } from './getEntryPermissions.cjs';

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
