import { ResolvedVariantPermissions } from './getResolvedVariantPermissions.cjs';
import { WorkflowStageDetails } from './getWorkflowStageDetails.cjs';
import { EntryPermissions } from './getEntryPermissions.cjs';
import '../../cslp/types/cslp.types.cjs';

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
