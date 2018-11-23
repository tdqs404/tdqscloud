/*
 * @Author: gzq
 * @Date: 2018-11-22 16:42:16
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 14:20:13
 */

import { describe, it } from 'mocha';
import 'should';
import { extendOptions } from '../src/index';

describe('测试request.ts', () => {
  describe('测试extendOptions函数', () => {
    it(`合并{ headers: { a: '1' } }, { params: { a: '1' } }`, () => {
      const r = extendOptions({ headers: { a: '1' } }, { params: { a: '1' } });
      r.should.deepEqual({ headers: { a: ['1'] }, params: { a: ['1'] } });
    });
    it(`合并{ headers: { a: '1' } }, { headers: { a: '1' } }`, () => {
      const r = extendOptions({ headers: { a: '1' } }, { headers: { a: '1' } });
      r.should.deepEqual({ headers: { a: ['1', '1'] }, params: {} });
    });
    it(`合并{ headers: { b: '1' } }, { headers: { a: '1', b: ['2', '3'] } }`, () => {
      const r = extendOptions({ headers: { b: '1' } }, { headers: { a: '1', b: ['2', '3'] } });
      r.should.deepEqual({ headers: { b: ['1', '2', '3'], a: ['1'] }, params: {} });
    });
    it(`合并{ params: { b: '1' } }, { params: { a: '1', b: ['2', '3'] } }`, () => {
      const r = extendOptions({ params: { b: '1' } }, { params: { a: '1', b: ['2', '3'] } });
      r.should.deepEqual({ headers: {}, params: { b: ['1', '2', '3'], a: ['1'] } });
    });
  });
});
