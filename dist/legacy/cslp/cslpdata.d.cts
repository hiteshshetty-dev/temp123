import { CslpData } from './types/cslp.types.cjs';

/**
 * Extracts details from a CSLP value string.
 * @param cslpValue The CSLP value string to extract details from.
 * @returns An object containing the extracted details.
 */
declare function extractDetailsFromCslp(cslpValue: string): CslpData;
/**
 * Adds an outline to the clicked element and triggers a callback function.
 * @param e - The MouseEvent object representing the click event.
 * @param callback - An optional callback function that will be called with the CSLP tag and highlighted element as arguments.
 */
declare function addCslpOutline(e: MouseEvent, callback?: (args: {
    cslpTag: string;
    highlightedElement: HTMLElement;
}) => void): void;

export { addCslpOutline, extractDetailsFromCslp };
