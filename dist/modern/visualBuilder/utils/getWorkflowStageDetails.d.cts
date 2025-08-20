declare function getWorkflowStageDetails({ entryUid, contentTypeUid, locale, variantUid, }: {
    entryUid: string;
    contentTypeUid: string;
    locale: string;
    variantUid?: string | undefined;
}): Promise<WorkflowStageDetails>;
interface WorkflowStageDetails {
    stage: {
        name: string;
    } | undefined;
    permissions: {
        entry: {
            update: boolean;
        };
    };
}

export { type WorkflowStageDetails, getWorkflowStageDetails };
