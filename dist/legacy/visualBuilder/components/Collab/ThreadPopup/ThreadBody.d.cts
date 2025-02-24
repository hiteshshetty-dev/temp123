import React from 'preact/compat';
import { IUserState, IMessageDTO } from '../../../types/collab.types.cjs';

/** @jsxImportSource preact */

interface IThreadBody {
    handleOnSaveRef: React.MutableRefObject<any>;
    onClose: (isResolved?: boolean) => void;
    userState: IUserState;
    isLoading: boolean;
    comments: IMessageDTO[];
    fetchingMore: boolean;
    editComment: string;
}
declare const ThreadBody: React.FC<IThreadBody>;

export { ThreadBody as default };
