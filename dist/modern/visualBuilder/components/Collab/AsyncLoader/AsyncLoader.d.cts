import React from 'preact/compat';

/** @jsxImportSource preact */

type AsyncLoaderProps = {
    className?: string;
    color?: "primary" | "secondary" | "tertiary" | "destructive";
    testId?: string;
};
declare const AsyncLoader: ({ className, color, testId, ...otherProps }: AsyncLoaderProps) => React.JSX.Element;

export { AsyncLoader as default };
