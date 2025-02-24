import React from 'preact/compat';
import { IThreadResolveArgs, IDefaultAPIResponse, IActiveThread } from '../../../types/collab.types.js';

/** @jsxImportSource preact */

interface IThreadHeader {
    onClose: (isResolved?: boolean) => void;
    displayResolve: boolean;
    onResolve: (data: IThreadResolveArgs) => Promise<IDefaultAPIResponse>;
    commentCount: number;
    activeThread: IActiveThread;
}
declare const ThreadHeader: React.FC<IThreadHeader>;

export { ThreadHeader as default };
