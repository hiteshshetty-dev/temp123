import { CslpData } from '../../cslp/types/cslp.types.cjs';

interface VisualBuilderCslpEventDetails {
    editableElement: Element;
    cslpData: string;
    fieldMetadata: CslpData;
}

export type { VisualBuilderCslpEventDetails };
