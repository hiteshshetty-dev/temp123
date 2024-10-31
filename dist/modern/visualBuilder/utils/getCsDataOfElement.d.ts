import { CslpData } from '../../cslp/types/cslp.types.js';
import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';

/**
 * Returns the CSLP data of the closest ancestor element with a `data-cslp` attribute
 * to the target element of a mouse event.
 * @param event - The mouse event.
 * @returns The CSLP data of the closest ancestor element with a `data-cslp` attribute,
 * along with metadata and schema information for the corresponding field.
 */
declare function getCsDataOfElement(event: MouseEvent): VisualBuilderCslpEventDetails | undefined;
declare function getDOMEditStack(ele: Element): CslpData[];

export { getCsDataOfElement, getDOMEditStack };
