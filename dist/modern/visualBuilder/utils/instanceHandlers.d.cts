import { CslpData } from '../../cslp/types/cslp.types.cjs';

declare function handleDeleteInstance(fieldMetadata: CslpData): void;
declare function handleMoveInstance(fieldMetadata: CslpData, direction: "previous" | "next"): void;

export { handleDeleteInstance, handleMoveInstance };
