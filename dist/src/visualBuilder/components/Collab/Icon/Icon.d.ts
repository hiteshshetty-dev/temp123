/** @jsxImportSource preact */
import React from "preact/compat";
import { JSX } from "preact";
import { iconComponents } from "../../icons/CollabIcons";
type IconName = keyof typeof iconComponents;
export interface IconProps {
    icon: IconName;
    tooltipContent?: string;
    className?: string;
    withTooltip?: boolean;
    onClick?: JSX.MouseEventHandler<HTMLDivElement>;
    testId?: string;
    disabled?: boolean;
}
declare const Icon: ({ withTooltip, tooltipContent, testId, ...props }: IconProps) => React.JSX.Element;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map