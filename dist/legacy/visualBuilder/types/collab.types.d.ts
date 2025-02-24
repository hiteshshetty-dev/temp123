interface IUserDTO {
    display?: string;
    email: string;
    uid: string;
    firstName?: string | null;
    lastName?: string | null;
}
declare interface IUserState {
    mentionsList: Array<IMentionList>;
    userMap: IUserMap;
    currentUser: IUserDTO;
}
declare type IUserMap = {
    [key: string]: IUserDTO;
};
declare interface IInviteMetadata {
    users: Array<IUserDTO>;
    currentUser: IUserDTO;
    inviteUid: string;
}
declare type IMentionItem = {
    id: string;
    display: string;
};
declare interface IMentionList {
    display: string;
    email?: string;
    uid?: string;
}
declare type IMentionedList = Array<IMentionItem>;
declare interface ICommentState {
    message: string;
    toUsers?: Array<IMentionItem>;
    images?: string[];
    createdBy: string;
    author: string;
}
declare interface IMessageDTO {
    _id: string;
    threadUid: string;
    message: string;
    author: string;
    toUsers?: string[];
    images?: string[];
    createdAt: string;
    createdBy: string;
}
declare interface IThreadContext {
    inviteMetadata: IInviteMetadata;
    commentCount: number;
    error: IErrorState;
    userState: IUserState;
    onCreateComment: (data: ICommentPayload) => Promise<ICommentResponse>;
    onEditComment: (data: IEditCommentArgs) => Promise<ICommentResponse>;
    onDeleteComment: (data: IDeleteCommentArgs) => Promise<IDefaultAPIResponse>;
    onDeleteThread: (data: IDeleteThreadArgs) => void;
    setThreadState: (state: IThreadPopupState | ((prevState: IThreadPopupState) => IThreadPopupState)) => void;
    onClose: (isResolved?: boolean) => void;
    setError: Function;
    editComment: string;
    activeThread: IActiveThread;
    setActiveThread: (thread: IActiveThread) => void;
    createNewThread: () => Promise<any>;
}
interface IThreadPopupState {
    commentCount: number;
    userState: IUserState;
    isLoading: boolean;
    comments: Array<IMessageDTO>;
    editComment: string;
}
interface IThreadRenderStatus {
    threadId: string;
    attempts: number;
    isRendered: boolean;
}
interface ICommentDTO {
    _id: string;
    threadUid: string;
    message: string;
    author: string;
    toUsers: string[];
    images: string[];
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
}
interface IDefaultAPIResponse {
    notice: string;
}
interface ICommentResponse extends IDefaultAPIResponse {
    comment: ICommentDTO;
}
interface IFetchCommentsResponse {
    comments: Array<ICommentDTO>;
    count: number;
}
interface ICommentPayload {
    threadUid: string;
    commentPayload: ICommentState;
}
interface IThreadPayload {
    elementXPath: string;
    position: {
        x: number;
        y: number;
    };
    author: string;
    pageRoute: string;
    inviteUid: string;
    createdBy: string;
}
interface IThreadDTO {
    _id: string;
    author: string;
    inviteUid: string;
    position: {
        x: number;
        y: number;
    };
    elementXPath: string;
    isElementPresent: boolean;
    pageRoute: string;
    createdBy: string;
    sequenceNumber: number;
    threadState: number;
    createdAt: string;
    updatedAt?: string;
}
interface IThreadResponseDTO extends IDefaultAPIResponse {
    thread: IThreadDTO;
}
interface IEditCommentArgs {
    threadUid: string;
    commentUid: string;
    payload: ICommentState;
}
interface IDeleteCommentArgs {
    threadUid: string;
    commentUid: string;
}
interface IDeleteThreadArgs {
    threadUid: string;
}
interface IThreadResolveArgs {
    threadUid: string;
    payload: {
        threadState: number;
    };
}
interface MissingThreadsInfo {
    payload: {
        isElementPresent: boolean;
    };
    threadUids: string[];
}
interface IErrorState {
    hasError: boolean;
    message: string;
}
interface IActiveThread extends Partial<IThreadDTO> {
    _id: string;
}
interface IFetchComments {
    threadUid: string;
    offset: number;
    limit: number;
}
interface toggleCollabPopupEvent {
    threadUid: string;
    action: string;
}

export type { IActiveThread, ICommentDTO, ICommentPayload, ICommentResponse, ICommentState, IDefaultAPIResponse, IDeleteCommentArgs, IDeleteThreadArgs, IEditCommentArgs, IErrorState, IFetchComments, IFetchCommentsResponse, IInviteMetadata, IMentionItem, IMentionList, IMentionedList, IMessageDTO, IThreadContext, IThreadDTO, IThreadPayload, IThreadPopupState, IThreadRenderStatus, IThreadResolveArgs, IThreadResponseDTO, IUserDTO, IUserMap, IUserState, MissingThreadsInfo, toggleCollabPopupEvent };
