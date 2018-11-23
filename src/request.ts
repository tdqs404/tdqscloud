/*
 * @Author: gzq
 * @Date: 2018-11-22 16:16:23
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 14:18:16
 * 兼容angular 7.0.4 httpclient
 */
import _ from 'lodash';

/**
 * angular options interface
 */
export interface IOptions {
  /**
   * headers
   */
  headers?: { [header: string]: string | string[] };
  /**
   * params
   */
  params?: { [param: string]: string | string[] };
}

/**
 * angular httpclient interface
 */
export interface IRequest {
  /**
   * body of method on patch post put
   */
  body?: any;
  options?: IOptions;
}

/**
 * extend options
 * @param options
 */
export function extendOptions(...options: IOptions[]): IOptions {
  const res: IOptions = { headers: {}, params: {} };
  options.map((o: IOptions) => {
    const merge = (key: string) => {
      const customizer = (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return _.isArray(srcValue) ? objValue.concat(srcValue) : objValue.concat([srcValue]);
        } else {
          return _.isArray(srcValue) ? srcValue : [srcValue];
        }
      };
      _.mergeWith(res[key], o[key], customizer);
    };
    for (const key of Object.keys(res)) {
      merge(key);
    }
  });
  return res;
}
