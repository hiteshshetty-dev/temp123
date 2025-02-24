import React from 'preact/compat';
import { ICommentPayload, ICommentResponse, IEditCommentArgs, IDeleteCommentArgs, IDefaultAPIResponse, IDeleteThreadArgs, IThreadResolveArgs, IThreadResponseDTO, IInviteMetadata, IFetchComments, IFetchCommentsResponse, IActiveThread } from '../../../types/collab.types.js';

/** @jsxImportSource preact */

interface IThreadPopup {
    onCreateComment: (data: ICommentPayload) => Promise<ICommentResponse>;
    onEditComment: (data: IEditCommentArgs) => Promise<ICommentResponse>;
    onDeleteComment: (data: IDeleteCommentArgs) => Promise<IDefaultAPIResponse>;
    onDeleteThread: (data: IDeleteThreadArgs) => void;
    onClose: (isResolved?: boolean) => void;
    onResolve: (data: IThreadResolveArgs) => Promise<IThreadResponseDTO>;
    inviteMetadata: IInviteMetadata;
    loadMoreMessages: (data: IFetchComments) => Promise<IFetchCommentsResponse>;
    activeThread: IActiveThread;
    setActiveThread: (thread: IActiveThread) => void;
    createNewThread: () => Promise<IThreadResponseDTO>;
}
declare const ThreadPopup: React.FC<IThreadPopup>;

export { ThreadPopup as default };
