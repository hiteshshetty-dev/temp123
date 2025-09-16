import { VNode } from 'preact';
import { IHighlightCommentData } from '../eventManager/useHighlightCommentIcon.cjs';
import '../../cslp/types/cslp.types.cjs';
import '../utils/types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';
import './CommentIcon.cjs';
import 'react/jsx-runtime';

declare const HighlightedCommentIcon: (props: {
    data: IHighlightCommentData;
}) => VNode;

export { HighlightedCommentIcon as default };
