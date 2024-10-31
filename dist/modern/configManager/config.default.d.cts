import { IInitData, IConfig } from '../types/types.cjs';

declare function getUserInitData(): IInitData;
declare function getDefaultConfig(): IConfig;

export { getDefaultConfig, getUserInitData };
