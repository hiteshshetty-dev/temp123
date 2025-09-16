import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';
import { EntryPermissions } from '../utils/getEntryPermissions.cjs';
import '../../cslp/types/cslp.types.cjs';

type FieldDetails = Pick<VisualBuilderCslpEventDetails, "editableElement" | "fieldMetadata">;
interface MultipleFieldToolbarProps {
    eventDetails: VisualBuilderCslpEventDetails;
    hideOverlay: () => void;
    isVariant?: boolean;
    entryPermissions?: EntryPermissions;
}
declare function FieldToolbarComponent(props: MultipleFieldToolbarProps): JSX.Element | null;

export { type FieldDetails, FieldToolbarComponent as default };
