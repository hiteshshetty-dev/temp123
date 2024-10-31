/**
 * Checks if the content of an element is truncated with ellipsis.
 *
 * @param element The HTML element to check.
 * @returns A boolean indicating whether the content is truncated with ellipsis.
 */
declare function isEllipsisActive(element: HTMLElement): boolean;
/**
 * Generates a pseudo editable element based on the provided parameters.
 * The pseudo editable element is created as a <div> element with the provided text content,
 * positioned absolutely at the same location as the editable element.
 * The original editable element is hidden while the pseudo editable element is displayed.
 * It is used to edit the text content if the original editable element is not completely
 * visible.
 *
 * @param elements - An object containing the editable element.
 * @param elements.editableElement - The HTML element to be replaced with the pseudo editable element.
 * @param config - An object containing the configuration for the pseudo editable element.
 * @param config.textContent - The text content to be displayed in the pseudo editable element.
 *
 * @returns The generated pseudo editable element as an HTMLDivElement.
 */
declare function generatePseudoEditableElement(elements: {
    editableElement: HTMLElement;
}, config: {
    textContent: string;
}): HTMLDivElement;

export { generatePseudoEditableElement, isEllipsisActive };
