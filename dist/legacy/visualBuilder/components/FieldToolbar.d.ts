import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';
import { EntryPermissions } from '../utils/getEntryPermissions.js';
import { WorkflowStageDetails } from '../utils/getWorkflowStageDetails.js';
import '../../cslp/types/cslp.types.js';

type FieldDetails = Pick<VisualBuilderCslpEventDetails, "editableElement" | "fieldMetadata">;
interface MultipleFieldToolbarProps {
    eventDetails: VisualBuilderCslpEventDetails;
    hideOverlay: () => void;
    isVariant?: boolean;
    entryPermissions?: EntryPermissions | undefined;
    entryWorkflowStageDetails?: WorkflowStageDetails | undefined;
}
declare function FieldToolbarComponent(props: MultipleFieldToolbarProps): JSX.Element | null;

export { type FieldDetails, FieldToolbarComponent as default };
