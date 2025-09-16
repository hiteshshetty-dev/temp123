/** @jsxImportSource preact */
import React from "preact/compat";
export type AvatarProps = {
    avatar: AvatarData;
    type?: "text" | "image";
    testId?: string;
};
export type AvatarData = {
    id: number;
    name: string;
    image?: string;
    email?: string;
};
declare function Avatar({ avatar, type, testId, }: AvatarProps): React.JSX.Element;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map