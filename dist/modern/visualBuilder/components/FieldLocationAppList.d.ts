import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'preact/compat';
import { CslpData } from '../../utils/cslpdata.js';

interface App {
    app_installation_uid: string;
    app_uid: string;
    contentTypeUid: string;
    entryUid: string;
    fieldDataType: string;
    fieldDisplayName: string;
    fieldPath: string;
    icon?: string;
    locale: string;
    manifest: {
        uid: string;
        name: string;
        description: string;
        icon: string;
        visibility: string;
    };
    title: string;
    uid: string;
}
interface FieldLocationAppListProps {
    apps: App[];
    position: "left" | "right";
    toolbarRef: React.RefObject<HTMLDivElement>;
    domEditStack: CslpData[];
    setDisplayAllApps: (displayAllApps: boolean) => void;
    displayAllApps: boolean;
}
declare const FieldLocationAppList: ({ apps, position, toolbarRef, domEditStack, setDisplayAllApps, }: FieldLocationAppListProps) => react_jsx_runtime.JSX.Element;

export { FieldLocationAppList };
