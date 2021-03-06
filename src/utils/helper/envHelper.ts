import {getEnv} from '/@/utils/env';
import {useSetting} from '/@/hooks/core/useSetting';
// import pkg from '../../../package.json';
const {globSetting} = useSetting();

const pkg = {"version": 1.0}
// Generate cache key according to version
export const getStorageShortName = () => {
    return `${globSetting.shortName}__${getEnv()}${`__${pkg.version}`}__`.toUpperCase();
};
