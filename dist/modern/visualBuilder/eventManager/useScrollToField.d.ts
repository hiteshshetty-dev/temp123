interface IScrollToFieldEventData {
    cslpData: {
        content_type_uid: string;
        entry_uid: string;
        locale: string;
        path: string;
    };
}
interface IScrollToFieldEvent {
    data: IScrollToFieldEventData;
}
declare const useScrollToField: () => void;

export { type IScrollToFieldEvent, type IScrollToFieldEventData, useScrollToField };
