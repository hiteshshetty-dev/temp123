import React from 'preact/compat';
import { IUserState, IMessageDTO } from '../../../types/collab.types.js';

/** @jsxImportSource preact */

interface ICommentTextArea {
    userState: IUserState;
    onClose: (isResolved?: boolean) => void;
    handleOnSaveRef: React.MutableRefObject<any>;
    comment?: IMessageDTO | null;
}
declare const CommentTextArea: React.FC<ICommentTextArea>;

export { CommentTextArea as default };
