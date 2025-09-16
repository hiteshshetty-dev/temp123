import * as preact from 'preact';
import { ICommentResolvedText } from '../../../types/collab.types.cjs';

declare const CommentResolvedText: ({ comment, userState }: ICommentResolvedText) => preact.JSX.Element;

export { CommentResolvedText as default };
