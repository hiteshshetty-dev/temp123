import React from "preact/compat";
import { CslpData } from "../../../cslp/types/cslp.types";
export interface IVariantStatus {
    fieldLevelCustomizations: boolean;
    isBaseModified: boolean;
    isAddedInstances: boolean;
    isDeletedInstances: boolean;
    isOrderChanged: boolean;
}
export type TFieldRevertActionCallback = "revert_to_base_entry_value" | "revert_added_instances" | "restore_deleted_instances" | "reset_field_level_customizations" | "restore_sorted_instances";
interface FieldRevertComponentProps {
    fieldDataName: string;
    fieldMetadata: CslpData;
    isOpen: boolean;
    closeDropdown: () => void;
    variantStatus?: IVariantStatus;
}
export declare const BASE_VARIANT_STATUS: IVariantStatus;
export declare function getFieldVariantStatus(fieldMetadata: CslpData): Promise<IVariantStatus | undefined>;
export declare const FieldRevertComponent: (props: FieldRevertComponentProps) => React.JSX.Element;
export declare const VariantRevertDropdown: (props: any) => React.JSX.Element;
export {};
//# sourceMappingURL=FieldRevertComponent.d.ts.map