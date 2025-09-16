interface PseudoEditableFieldProps {
    editableElement: HTMLElement;
    config: {
        textContent: string;
    };
}
declare function PseudoEditableFieldComponent(props: PseudoEditableFieldProps): JSX.Element;

export { PseudoEditableFieldComponent as default };
