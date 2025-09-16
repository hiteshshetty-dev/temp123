/**
 * Gets the first and second child elements of the parent element.
 * @param parentElement The parent element that contains the child elements.
 * @param parentCslpValue The cslp value of the parent element.
 * @returns The first and second child elements and a function to remove the clone.
 */
declare function getChildElements(parentElement: Element, parentCslpValue: string): [Element, Element, () => void] | [null, null, () => void];

export { getChildElements as default };
