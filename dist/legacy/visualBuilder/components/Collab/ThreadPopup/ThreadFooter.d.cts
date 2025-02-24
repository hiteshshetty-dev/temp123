import React from 'preact/compat';

/** @jsxImportSource preact */

interface IThreadFooter {
    onClose: (isResolved?: boolean) => void;
    handleOnSaveRef: React.MutableRefObject<any>;
    isDisabled: boolean;
    editComment: string;
}
declare const ThreadFooter: ({ onClose, handleOnSaveRef, isDisabled, editComment, }: IThreadFooter) => React.JSX.Element;

export { ThreadFooter as default };
