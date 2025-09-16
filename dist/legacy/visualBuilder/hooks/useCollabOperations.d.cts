import React from 'preact/compat';
import { ICommentPayload, ICommentResponse, IEditCommentArgs, IDeleteCommentArgs, IDefaultAPIResponse, IThreadResolveArgs, IThreadResponseDTO, IFetchComments, IFetchCommentsResponse, IInviteMetadata, IDeleteThreadArgs } from '../types/collab.types.cjs';

/** @jsxImportSource preact */

declare const useCollabOperations: () => {
    createComment: (payload: ICommentPayload) => Promise<ICommentResponse>;
    editComment: (payload: IEditCommentArgs) => Promise<ICommentResponse>;
    deleteComment: (payload: IDeleteCommentArgs) => Promise<IDefaultAPIResponse>;
    resolveThread: (payload: IThreadResolveArgs) => Promise<IThreadResponseDTO>;
    fetchComments: (payload: IFetchComments) => Promise<IFetchCommentsResponse>;
    createNewThread: (buttonRef: React.RefObject<HTMLButtonElement>, inviteMetadata: IInviteMetadata) => Promise<IThreadResponseDTO>;
    deleteThread: (payload: IDeleteThreadArgs) => Promise<IDefaultAPIResponse>;
};

export { useCollabOperations };
