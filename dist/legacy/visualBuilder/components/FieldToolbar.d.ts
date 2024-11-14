import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

type FieldDetails = Pick<VisualBuilderCslpEventDetails, "editableElement" | "fieldMetadata">;
interface MultipleFieldToolbarProps {
    eventDetails: VisualBuilderCslpEventDetails;
    hideOverlay: () => void;
}
declare function FieldToolbarComponent(props: MultipleFieldToolbarProps): JSX.Element | null;

export { type FieldDetails, FieldToolbarComponent as default };
