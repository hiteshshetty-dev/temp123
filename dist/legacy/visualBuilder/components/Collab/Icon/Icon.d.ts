import React from 'preact/compat';
import { JSX } from 'preact';
import { iconComponents } from '../../icons/CollabIcons.js';

/** @jsxImportSource preact */

type IconName = keyof typeof iconComponents;
interface IconProps {
    icon: IconName;
    tooltipContent?: string;
    className?: string;
    withTooltip?: boolean;
    onClick?: JSX.MouseEventHandler<HTMLDivElement>;
    testId?: string;
    disabled?: boolean;
}
declare const Icon: ({ withTooltip, tooltipContent, testId, ...props }: IconProps) => React.JSX.Element;

export { type IconProps, Icon as default };
