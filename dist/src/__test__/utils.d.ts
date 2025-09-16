import { EventManager } from "@contentstack/advanced-post-message";
import { render } from "@testing-library/preact";
import { ComponentChild } from "preact";
export declare function convertObjectToMinifiedString(obj: {
    [key: string]: any;
} | string): any;
export declare class DOMRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    static fromRect(other?: DOMRectInit): DOMRect;
    toJSON(): string;
}
export declare function sleep(waitTimeInMs?: number): Promise<void>;
export declare const waitForHoverOutline: () => Promise<void>;
export declare const waitForBuilderSDKToBeInitialized: (visualBuilderPostMessage: EventManager | undefined) => Promise<void>;
interface WaitForClickActionOptions {
    skipWaitForFieldType?: boolean;
}
export declare const triggerAndWaitForClickAction: (visualBuilderPostMessage: EventManager | undefined, element: HTMLElement, { skipWaitForFieldType }?: WaitForClickActionOptions) => Promise<void>;
export declare const waitForToolbaxToBeVisible: () => Promise<void>;
export declare const mockGetBoundingClientRect: (element: HTMLElement, rect?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
}) => void;
export declare const getElementBytestId: (testId: string) => Element | null;
export declare const asyncRender: (componentChild: ComponentChild) => ReturnType<typeof render>;
export {};
//# sourceMappingURL=utils.d.ts.map