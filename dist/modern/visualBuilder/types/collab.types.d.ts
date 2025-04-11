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
    updatedAt?: string;
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
interface ICommentActionBar {
    mode: "edit" | "view";
    commentUser: IUserDTO;
    currentUser: IUserDTO;
    commentUID?: string | undefined;
}
interface ICommentCard {
    comment: IMessageDTO | null;
    onClose: (isResolved?: boolean) => void;
    userState: IUserState;
    mode: "edit" | "view";
    handleOnSaveRef: React.MutableRefObject<any>;
}
interface ICommentResolvedText {
    comment: IMessageDTO;
    userState: IUserState;
}
interface ICommentTextAreaProps {
    userState: IUserState;
    onClose: (isResolved?: boolean) => void;
    handleOnSaveRef: React.MutableRefObject<any>;
    comment?: IMessageDTO | null;
}
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
interface IThreadBody {
    handleOnSaveRef: React.MutableRefObject<any>;
    onClose: (isResolved?: boolean) => void;
    userState: IUserState;
    isLoading: boolean;
    comments: IMessageDTO[];
    fetchingMore: boolean;
    editComment: string;
}
interface IThreadFooter {
    onClose: (isResolved?: boolean) => void;
    handleOnSaveRef: React.MutableRefObject<any>;
    isDisabled: boolean;
    editComment: string;
}
interface IThreadHeader {
    onClose: (isResolved?: boolean) => void;
    displayResolve: boolean;
    onResolve: (data: IThreadResolveArgs) => Promise<IDefaultAPIResponse>;
    commentCount: number;
    activeThread: IActiveThread;
}
interface ICollabConfig {
    collab: {
        fromShare: boolean;
        pauseFeedback: boolean;
        enable: boolean;
        isFeedbackMode: boolean;
        inviteMetadata: IInviteMetadata;
        payload: IThreadDTO[];
    };
}
interface IThreadIdentifier {
    threadUid: string;
}
interface IThreadRemove {
    threadUids: string[];
    updateConfig?: boolean;
}
interface IThreadReopen {
    thread: IThreadDTO;
}

export type { IActiveThread, ICollabConfig, ICommentActionBar, ICommentCard, ICommentDTO, ICommentPayload, ICommentResolvedText, ICommentResponse, ICommentState, ICommentTextAreaProps, IDefaultAPIResponse, IDeleteCommentArgs, IDeleteThreadArgs, IEditCommentArgs, IErrorState, IFetchComments, IFetchCommentsResponse, IInviteMetadata, IMentionItem, IMentionList, IMentionedList, IMessageDTO, IThreadBody, IThreadContext, IThreadDTO, IThreadFooter, IThreadHeader, IThreadIdentifier, IThreadPayload, IThreadPopup, IThreadPopupState, IThreadRemove, IThreadRenderStatus, IThreadReopen, IThreadResolveArgs, IThreadResponseDTO, IUserDTO, IUserMap, IUserState, MissingThreadsInfo, toggleCollabPopupEvent };
