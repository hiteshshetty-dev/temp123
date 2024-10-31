import { VNode } from 'preact';
import { IHighlightCommentData } from '../eventManager/useHighlightCommentIcon.js';
import '../../cslp/types/cslp.types.js';
import '../utils/types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';
import './CommentIcon.js';
import 'react/jsx-runtime';

declare const HighlightedCommentIcon: (props: {
    data: IHighlightCommentData;
}) => VNode;

export { HighlightedCommentIcon as default };
