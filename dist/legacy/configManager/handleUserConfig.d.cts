import { IInitData, IClientUrlParams } from '../types/types.cjs';

declare const handleInitData: (initData: Partial<IInitData>) => void;
declare const handleUserConfig: {
    clientUrlParams: (userConfig: Partial<IClientUrlParams>) => void;
};

export { handleInitData, handleUserConfig };
