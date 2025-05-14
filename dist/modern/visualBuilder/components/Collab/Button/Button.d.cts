import React from 'preact/compat';
import { JSX } from 'preact';
import { IconProps } from '../Icon/Icon.cjs';
import { iconComponents } from '../../icons/CollabIcons.cjs';

/** @jsxImportSource preact */

type IconName = keyof typeof iconComponents;
interface ButtonProps {
    buttonType?: "primary" | "secondary" | "tertiary" | "destructive";
    children?: React.ReactNode;
    className?: string;
    testId?: string;
    onClick?: JSX.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    isLoading?: boolean;
    loadingColor?: "primary" | "secondary" | "tertiary" | "destructive";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    style?: React.CSSProperties;
    href?: string;
    id?: string;
    size?: "large" | "small";
    icon?: IconName;
    iconProps?: Partial<IconProps>;
    iconAlignment?: "left" | "right" | "both";
}
declare const Button: React.FC<ButtonProps>;

export { Button as default };
