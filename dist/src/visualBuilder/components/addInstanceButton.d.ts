import { ISchemaFieldMap } from "../utils/types/index.types";
import { CslpData } from "../../cslp/types/cslp.types";
import { Signal } from "@preact/signals";
interface AddInstanceButtonProps {
    value: any;
    onClick: (event: MouseEvent) => void;
    label?: string | undefined;
    fieldSchema: ISchemaFieldMap | undefined;
    fieldMetadata: CslpData;
    index: number;
    loading: Signal<boolean>;
}
declare function AddInstanceButtonComponent(props: AddInstanceButtonProps): JSX.Element;
export default AddInstanceButtonComponent;
//# sourceMappingURL=addInstanceButton.d.ts.map