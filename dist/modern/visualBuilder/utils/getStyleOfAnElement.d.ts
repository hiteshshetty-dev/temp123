/**
 * Retrieves the computed style of an HTML element.
 *
 * @param element - The HTML element to retrieve the style from.
 * @returns An object representing the computed style of the element.
 */
declare function getStyleOfAnElement(element: HTMLElement): {
    [key: string]: string;
};

export { getStyleOfAnElement as default };
