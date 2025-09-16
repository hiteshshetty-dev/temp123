/** @jsxImportSource preact */
import React from "preact/compat";
export type ButtonGroupProps = {
    /**
     * Provides the class names to be appended to this prop.
     */
    className?: string;
    /**
     * Add child elements defined within a component.
     */
    children?: React.ReactNode;
    /**
     * Pass the CSS properties for the button group.
     */
    style?: React.CSSProperties;
    /**
     * Pass an ID that you can use for testing purposes. It is applied as a data attribute (data-testid).
     */
    testId?: string;
};
declare const ButtonGroup: {
    (props: ButtonGroupProps): React.JSX.Element;
    defaultProps: Partial<ButtonGroupProps>;
};
export default ButtonGroup;
//# sourceMappingURL=ButtonGroup.d.ts.map