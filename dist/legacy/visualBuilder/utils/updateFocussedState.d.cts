/**
 * This function can be used to re-draw/update the focussed state of an element.
 * The focussed state includes the overlay, psuedo-editable, toolbar, and multiple
 * instance add buttons. It is similar to handleBuilderInteraction but it does not
 * create new elements, it just updates the existing ones whenever possible.
 * NOTE: breakdown this function into multiple functions when the need arises
 */
declare function updateFocussedState({ editableElement, visualBuilderContainer, overlayWrapper, focusedToolbar, resizeObserver, }: {
    editableElement: HTMLElement | null;
    visualBuilderContainer: HTMLDivElement | null;
    overlayWrapper: HTMLDivElement | null;
    focusedToolbar: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
}): void;
/**
 * This function is used to resize/reposition focus overlay and toolbar due to a
 * mutation in the DOM or due to changes in a different field (other than the focussed field).
 */
declare function updateFocussedStateOnMutation(focusOverlayWrapper: HTMLDivElement | null, focusedToolbar: HTMLDivElement | null, visualBuilderContainer: HTMLDivElement | null): void;

export { updateFocussedState, updateFocussedStateOnMutation };
