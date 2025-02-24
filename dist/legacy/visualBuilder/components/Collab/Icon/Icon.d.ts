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
}
declare const Icon: {
    (props: IconProps): React.JSX.Element;
    defaultProps: Partial<IconProps>;
};

export { type IconProps, Icon as default };
