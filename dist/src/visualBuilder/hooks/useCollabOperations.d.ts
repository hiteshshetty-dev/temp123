/** @jsxImportSource preact */
import React from "preact/compat";
import { ICommentResponse, IThreadResponseDTO, IDefaultAPIResponse, IFetchCommentsResponse, ICommentPayload, IEditCommentArgs, IDeleteCommentArgs, IThreadResolveArgs, IFetchComments, IInviteMetadata, IDeleteThreadArgs } from "../types/collab.types";
export declare const useCollabOperations: () => {
    createComment: (payload: ICommentPayload) => Promise<ICommentResponse>;
    editComment: (payload: IEditCommentArgs) => Promise<ICommentResponse>;
    deleteComment: (payload: IDeleteCommentArgs) => Promise<IDefaultAPIResponse>;
    resolveThread: (payload: IThreadResolveArgs) => Promise<IThreadResponseDTO>;
    fetchComments: (payload: IFetchComments) => Promise<IFetchCommentsResponse>;
    createNewThread: (buttonRef: React.RefObject<HTMLButtonElement>, inviteMetadata: IInviteMetadata) => Promise<IThreadResponseDTO>;
    deleteThread: (payload: IDeleteThreadArgs) => Promise<IDefaultAPIResponse>;
};
//# sourceMappingURL=useCollabOperations.d.ts.map