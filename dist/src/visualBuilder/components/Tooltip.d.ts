import { h } from 'preact';
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
declare const Tooltip: ({ children, content, placement }: TooltipProps) => h.JSX.Element;
export declare function ToolbarTooltip({ children, data, disabled }: {
    children: JSX.Element;
    data: {
        contentTypeName: string;
        referenceFieldName: string;
    };
    disabled?: boolean;
}): any;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map