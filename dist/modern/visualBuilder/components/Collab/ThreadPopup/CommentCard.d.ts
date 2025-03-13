import React from 'preact/compat';
import { ICommentCard } from '../../../types/collab.types.js';

/** @jsxImportSource preact */

declare const CommentCard: ({ userState, comment, onClose, handleOnSaveRef, mode, }: ICommentCard) => React.JSX.Element;

export { CommentCard as default };
