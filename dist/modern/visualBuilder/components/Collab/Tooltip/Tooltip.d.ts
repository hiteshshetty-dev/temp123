import React from 'preact/compat';

/** @jsxImportSource preact */

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

export { Tooltip as default };
