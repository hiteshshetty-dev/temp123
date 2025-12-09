import { ResolvedVariantPermissions } from './getResolvedVariantPermissions.js';
import { WorkflowStageDetails } from './getWorkflowStageDetails.js';
import { EntryPermissions } from './getEntryPermissions.js';
import '../../cslp/types/cslp.types.js';

declare function fetchEntryPermissionsAndStageDetails({ entryUid, contentTypeUid, locale, variantUid, fieldPathWithIndex, }: {
    entryUid: string;
    contentTypeUid: string;
    locale: string;
    fieldPathWithIndex: string;
    variantUid?: string | undefined;
}): Promise<{
    acl: EntryPermissions | undefined;
    workflowStage: WorkflowStageDetails | undefined;
    resolvedVariantPermissions: ResolvedVariantPermissions | undefined;
}>;

export { fetchEntryPermissionsAndStageDetails };
