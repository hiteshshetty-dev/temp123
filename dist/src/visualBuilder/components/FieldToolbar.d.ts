import { VisualBuilderCslpEventDetails } from "../types/visualBuilder.types";
import { EntryPermissions } from "../utils/getEntryPermissions";
export type FieldDetails = Pick<VisualBuilderCslpEventDetails, "editableElement" | "fieldMetadata">;
interface MultipleFieldToolbarProps {
    eventDetails: VisualBuilderCslpEventDetails;
    hideOverlay: () => void;
    isVariant?: boolean;
    entryPermissions?: EntryPermissions;
}
declare function FieldToolbarComponent(props: MultipleFieldToolbarProps): JSX.Element | null;
export default FieldToolbarComponent;
//# sourceMappingURL=FieldToolbar.d.ts.map