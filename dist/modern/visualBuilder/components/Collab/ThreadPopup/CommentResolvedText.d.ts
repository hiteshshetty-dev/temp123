import * as preact from 'preact';
import { IMessageDTO, IUserState } from '../../../types/collab.types.js';

interface ICommentResolvedText {
    comment: IMessageDTO;
    userState: IUserState;
}
declare const CommentResolvedText: ({ comment, userState }: ICommentResolvedText) => preact.JSX.Element;

export { CommentResolvedText as default };
