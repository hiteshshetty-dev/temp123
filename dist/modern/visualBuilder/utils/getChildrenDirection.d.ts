declare const validPositions: readonly ["vertical", "horizontal", "none"];
type ValidPositions = typeof validPositions[number];
declare function getChildrenDirection(editableElement: Element, parentCslpValue: string): ValidPositions;

export { getChildrenDirection as default };
