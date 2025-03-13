import React from 'preact/compat';

/** @jsxImportSource preact */

type SkeletonTileProps = {
    numberOfTiles: number;
    tileHeight: number;
    tileWidth: number | string;
    tileBottomSpace: number;
    tileTopSpace: number;
    tileleftSpace: number;
    tileRadius?: number;
    testId?: string;
};
declare const SkeletonTile: React.FC<SkeletonTileProps>;

export { type SkeletonTileProps, SkeletonTile as default };
