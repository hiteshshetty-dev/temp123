import React from 'preact/compat';

/** @jsxImportSource preact */

type AvatarProps = {
    avatar: AvatarData;
    type?: "text" | "image";
    testId?: string;
};
type AvatarData = {
    id: number;
    name: string;
    image?: string;
    email?: string;
};
declare function Avatar({ avatar, type, testId, }: AvatarProps): React.JSX.Element;

export { type AvatarData, type AvatarProps, Avatar as default };
