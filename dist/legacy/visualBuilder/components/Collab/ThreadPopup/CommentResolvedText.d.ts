import * as preact from 'preact';
import { ICommentResolvedText } from '../../../types/collab.types.js';

declare const CommentResolvedText: ({ comment, userState }: ICommentResolvedText) => preact.JSX.Element;

export { CommentResolvedText as default };
