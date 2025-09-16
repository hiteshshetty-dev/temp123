import * as react_jsx_runtime from 'react/jsx-runtime';

interface TooltipProps {
    children: JSX.Element;
    content: JSX.Element;
    placement?: 'top-start' | 'bottom-start' | 'left-start' | 'right-start';
}
/**
 * A lightweight, reusable tooltip component for Preact powered by Floating UI.
 *
 * @param {object} props - The component props.
 * @param {preact.ComponentChildren} props.children - The single child element that triggers the tooltip.
 * @param {string | preact.VNode} props.content - The content to display inside the tooltip.
 * @param {'top'|'bottom'|'left'|'right'} [props.placement='top'] - The desired placement of the tooltip.
 */
declare const Tooltip: ({ children, content, placement }: TooltipProps) => react_jsx_runtime.JSX.Element;
declare function ToolbarTooltip({ children, data, disabled }: {
    children: JSX.Element;
    data: {
        contentTypeName: string;
        referenceFieldName: string;
    };
    disabled?: boolean;
}): JSX.Element;

export { ToolbarTooltip, Tooltip as default };
