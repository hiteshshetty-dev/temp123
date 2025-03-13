import React from 'preact/compat';

/** @jsxImportSource preact */

declare const iconComponents: {
    Cancel: (props: any) => React.JSX.Element;
    Delete: (props: any) => React.JSX.Element;
    Edit: (props: any) => React.JSX.Element;
    RightMarkActive: (props: any) => React.JSX.Element;
    Indicator: ({ active }: {
        active?: boolean;
        className?: string;
    }) => React.JSX.Element;
};

export { iconComponents };
