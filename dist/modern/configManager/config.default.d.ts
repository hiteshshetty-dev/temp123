import { IInitData, IConfig } from '../types/types.js';

declare function getUserInitData(): IInitData;
declare function getDefaultConfig(): IConfig;

export { getDefaultConfig, getUserInitData };
