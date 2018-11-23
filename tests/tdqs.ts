/*
 * @Author: gzq
 * @Date: 2018-11-23 10:07:13
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 11:03:32
 */
import 'should';
import { describe, it } from 'mocha';
import { init, setHeader } from '../src/tdqs';

describe('测试tdqs.ts', () => {
  describe('测试setHeader函数', () => {
    it(`{ appId: '123', appKey: 'abcdefg' }`, () => {
      init({ appId: '123', appKey: 'abcdefg' });
      const r = setHeader();
      r.should.deepEqual({ appId: '123', appKey: 'abcdefg' });
    });
  });
});
