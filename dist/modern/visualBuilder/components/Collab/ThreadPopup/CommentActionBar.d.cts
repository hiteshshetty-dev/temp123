import React from 'preact/compat';
import { IUserDTO } from '../../../types/collab.types.cjs';

/** @jsxImportSource preact */

interface ICommentActionBar {
    mode: "edit" | "view";
    commentUser: IUserDTO;
    currentUser: IUserDTO;
    commentUID?: string | undefined;
}
declare const CommentActionBar: React.FC<ICommentActionBar>;

export { CommentActionBar as default };
