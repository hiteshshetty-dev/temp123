import { CslpData } from "../../cslp/types/cslp.types";
import { VisualBuilderCslpEventDetails } from "../types/visualBuilder.types";
interface FieldLabelWrapperProps {
    fieldMetadata: CslpData;
    eventDetails: VisualBuilderCslpEventDetails;
    parentPaths: string[];
    getParentEditableElement: (cslp: string) => HTMLElement | null;
}
declare function FieldLabelWrapperComponent(props: FieldLabelWrapperProps): JSX.Element;
export default FieldLabelWrapperComponent;
//# sourceMappingURL=fieldLabelWrapper.d.ts.map