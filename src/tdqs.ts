/*
 * @Author: gzq
 * @Date: 2018-11-23 09:56:57
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 11:02:42
 */

export interface IConfig {
  appId: string;
  appKey: string;
}
let _config: IConfig;
/** todo 加密 */

export function init(config) {
  _config = config;
}

export function setHeader() {
  return {
    appId: _config.appId,
    appKey: _config.appKey
  };
}
