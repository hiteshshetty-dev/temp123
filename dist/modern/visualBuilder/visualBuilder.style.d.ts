declare function visualBuilderStyles(): {
    "visual-builder__container": string;
    "visual-builder__cursor": string;
    "visual-builder__overlay__wrapper": string;
    "visual-builder__overlay--outline": string;
    "visual-builder__overlay": string;
    "visual-builder__add-button": string;
    "visual-builder__add-button-label": string;
    "visual-builder__start-editing-btn": string;
    "visual-builder__start-editing-btn__bottom-right": string;
    "visual-builder__start-editing-btn__bottom-left": string;
    "visual-builder__start-editing-btn__top-right": string;
    "visual-builder__start-editing-btn__top-left": string;
    "visual-builder__cursor-icon": string;
    "visual-builder__cursor-pointer": string;
    "visual-builder__cursor-icon--loader": string;
    "visual-builder__focused-toolbar": string;
    "visual-builder__focused-toolbar__field-label-wrapper__current-field": string;
    "visual-builder__focused-toolbar__field-label-wrapper__parent-field": string;
    "field-label-dropdown-open": string;
    "visual-builder__focused-toolbar__field-label-wrapper": string;
    "visual-builder__focused-toolbar__field-label-container": string;
    "visual-builder__button": string;
    "visual-builder__button--primary": string;
    "visual-builder__button--secondary": string;
    "visual-builder__button--edit": string;
    "visual-builder__button-loader": string;
    "visual-builder__button--comment-loader": string;
    "visual-builder__field-icon": string;
    "visual-builder__focused-toolbar__button-group": string;
    "visual-builder__focused-toolbar__text": string;
    "visual-builder__focused-toolbar__multiple-field-toolbar": string;
    "visual-builder__rotate--90": string;
    "visual-builder__focused-toolbar--field-disabled": string;
    "visual-builder__cursor-disabled": string;
    "visual-builder__tooltip": string;
    "visual-builder__tooltip--bottom": string;
    "visual-builder__tooltip--persistent": string;
    "visual-builder__empty-block": string;
    "visual-builder__empty-block-title": string;
    "visual-builder__empty-block-add-button": string;
    "visual-builder__hover-outline": string;
    "visual-builder__hover-outline--hidden": string;
    "visual-builder__hover-outline--unclickable": string;
    "visual-builder__hover-outline--disabled": string;
    "visual-builder__default-cursor--disabled": string;
    "visual-builder__draft-field": string;
    "visual-builder__variant-field": string;
    "visual-builder__pseudo-editable-element": string;
    "visual-builder__button-error": string;
    "visual-builder__focused-toolbar__error": string;
    "visual-builder__focused-toolbar__error-text": string;
    "visual-builder__focused-toolbar__error-toolip": string;
    "variant-field-revert-component": string;
    "variant-field-revert-component__dropdown-content": string;
    "variant-field-revert-component__dropdown-content__list-item": string;
    "visual-builder__no-cursor-style": string;
    "visual-builder__field-toolbar-container": string;
    "visual-builder__variant-button": string;
};
declare const VisualBuilderGlobalStyles = "\n       @import url(\"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap\");\n\n       [data-cslp] [contenteditable=\"true\"] {\n            outline: none;\n        }\n        \n        @keyframes visual-builder__spinner {\n            0% {\n                transform: rotate(0deg);\n            }\n            100% {\n                transform: rotate(360deg);\n            }\n        }\n\n";

export { VisualBuilderGlobalStyles, visualBuilderStyles };
