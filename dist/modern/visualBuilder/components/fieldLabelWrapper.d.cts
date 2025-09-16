import { CslpData } from '../../cslp/types/cslp.types.cjs';
import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';

interface FieldLabelWrapperProps {
    fieldMetadata: CslpData;
    eventDetails: VisualBuilderCslpEventDetails;
    parentPaths: string[];
    getParentEditableElement: (cslp: string) => HTMLElement | null;
}
declare function FieldLabelWrapperComponent(props: FieldLabelWrapperProps): JSX.Element;

export { FieldLabelWrapperComponent as default };
