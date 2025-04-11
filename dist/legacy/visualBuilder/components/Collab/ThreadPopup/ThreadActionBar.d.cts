import React from 'preact/compat';

/** @jsxImportSource preact */

interface ThreadActionsProps {
    commentCount: number;
    displayResolve: boolean;
    handleResolve: () => void;
    isResolving: boolean;
}
declare const ThreadActionBar: React.FC<ThreadActionsProps>;

export { ThreadActionBar as default };
