import { CslpData } from '../../cslp/types/cslp.types.js';

interface VisualBuilderCslpEventDetails {
    editableElement: Element;
    cslpData: string;
    fieldMetadata: CslpData;
}

export type { VisualBuilderCslpEventDetails };
