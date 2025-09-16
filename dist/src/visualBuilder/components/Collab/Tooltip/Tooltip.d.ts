/** @jsxImportSource preact */
import React from "preact/compat";
interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    testId?: string;
}
declare const Tooltip: {
    (props: TooltipProps): JSX.Element;
    defaultProps: Partial<TooltipProps>;
};
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map