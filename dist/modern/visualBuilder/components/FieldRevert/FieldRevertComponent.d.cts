import * as react_jsx_runtime from 'react/jsx-runtime';
import { CslpData } from '../../../cslp/types/cslp.types.cjs';

interface IVariantStatus {
    fieldLevelCustomizations: boolean;
    isBaseModified: boolean;
    isAddedInstances: boolean;
    isDeletedInstances: boolean;
    isOrderChanged: boolean;
}
type TFieldRevertActionCallback = "revert_to_base_entry_value" | "revert_added_instances" | "restore_deleted_instances" | "reset_field_level_customizations" | "restore_sorted_instances";
interface FieldRevertComponentProps {
    fieldDataName: string;
    fieldMetadata: CslpData;
    isOpen: boolean;
    closeDropdown: () => void;
    variantStatus?: IVariantStatus;
}
declare const BASE_VARIANT_STATUS: IVariantStatus;
declare function getFieldVariantStatus(fieldMetadata: CslpData): Promise<IVariantStatus | undefined>;
declare const FieldRevertComponent: (props: FieldRevertComponentProps) => react_jsx_runtime.JSX.Element;

export { BASE_VARIANT_STATUS, FieldRevertComponent, type IVariantStatus, type TFieldRevertActionCallback, getFieldVariantStatus };
