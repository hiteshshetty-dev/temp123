import React from 'preact/compat';
import { IMessageDTO, IUserState } from '../../../types/collab.types.cjs';

/** @jsxImportSource preact */

interface ICommentCard {
    comment: IMessageDTO | null;
    onClose: (isResolved?: boolean) => void;
    userState: IUserState;
    mode: "edit" | "view";
    handleOnSaveRef: React.MutableRefObject<any>;
}
declare const CommentCard: ({ userState, comment, onClose, handleOnSaveRef, mode, }: ICommentCard) => React.JSX.Element;

export { CommentCard as default };
