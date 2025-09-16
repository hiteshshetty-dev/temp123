export interface IScrollToFieldEventData {
    cslpData: {
        content_type_uid: string;
        entry_uid: string;
        locale: string;
        path: string;
    };
}
export interface IScrollToFieldEvent {
    data: IScrollToFieldEventData;
}
export declare const useScrollToField: () => void;
//# sourceMappingURL=useScrollToField.d.ts.map