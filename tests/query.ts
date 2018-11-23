/*
 * @Author: gzq
 * @Date: 2018-11-23 16:14:38
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 16:44:02
 */

import { describe, it } from 'mocha';
import 'should';
import { Cond, EFieldMode, EOp, init, Query } from '../src/index';

describe('测试query.ts', () => {
  describe('测试Query类', () => {
    init({ appId: '123', appKey: 'abc' });
    it(`test field`, () => {
      // const r = new Cond().add('f_id', EOp.eq, 1).toObject();
      const r = new Query('t_ygxxcx').field(['f_id', 'f_name'], EFieldMode.inclusion).get();
      r.should.deepEqual({
        options: {
          headers: { appId: '123', appKey: 'abc' },
          params: { query: '{"className":"t_ygxxcx","fields":["f_id","f_name"],"fieldMode":1}' }
        }
      });
    });
    it(`test where`, () => {
      const r = new Query('table').where(new Cond().add('f_id', EOp.eq, 1)).get();
      r.should.deepEqual({
        options: {
          headers: { appId: '123', appKey: 'abc' },
          params: { query: '{"className":"table","cond":{"$and":[{"f_id":{"$eq":1}}]}}' }
        }
      });
    });
    it(`test ol`, () => {
      const r = new Query('table').ol(100, 20).get();
      r.should.deepEqual({
        options: {
          headers: { appId: '123', appKey: 'abc' },
          params: { query: '{"className":"table","skip":100,"limit":20}' }
        }
      });
    });
    it(`test all`, () => {
      const r = new Query('table')
        .field(['f_id'], EFieldMode.exclusion)
        .where(
          Cond.or(new Cond({ f_name: 'gzq' }), new Cond().add('f_id', EOp.nin, [1, 3, 5]).add('f_id', EOp.exists, true))
        )
        .ol(80, 10)
        .get();
      r.should.deepEqual({
        options: {
          headers: { appId: '123', appKey: 'abc' },
          params: {
            query:
              '{"className":"table","fields":["f_id"],"fieldMode":0,"cond":\
{"$and":[{"$or":[{"$and":[{"f_name":"gzq"}]},{"$and":[{"f_id":{"$nin":[1,3,5]}},\
{"f_id":{"$exists":true}}]}]}]},"skip":80,"limit":10}'
          }
        }
      });
    });
  });
});
