/*
 * @Author: gzq
 * @Date: 2018-11-23 15:47:26
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 16:06:43
 */

import { describe, it } from 'mocha';
import 'should';
import { Cond, EOp } from '../src/index';

describe('测试where.ts', () => {
  describe('测试Cond类', () => {
    it(`add('f_id', EOp.eq, 1)`, () => {
      const r = new Cond().add('f_id', EOp.eq, 1).toObject();
      r.should.deepEqual({ $and: [{ f_id: { $eq: 1 } }] });
    });
    it(`{ f_name: 'gzq' } add('f_id', EOp.gt, 1)`, () => {
      const r = new Cond({ f_name: 'gzq' }).add('f_id', EOp.gt, 1).toObject();
      r.should.deepEqual({ $and: [{ f_name: 'gzq' }, { f_id: { $gt: 1 } }] });
    });
    it(`{ f_name: 'gzq' } or add('f_id', EOp.in, [1, 3, 5])`, () => {
      const r = Cond.or(new Cond({ f_name: 'gzq' }), new Cond().add('f_id', EOp.in, [1, 3, 5])).toObject();
      r.should.deepEqual({
        $and: [{ $or: [{ $and: [{ f_name: 'gzq' }] }, { $and: [{ f_id: { $in: [1, 3, 5] } }] }] }]
      });
    });
  });
});
