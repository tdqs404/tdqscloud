/*
 * @Author: gzq
 * @Date: 2018-11-23 14:28:04
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 16:09:45
 * ref: http://www.mongoing.com/docs/reference/operator/query.html
 */

/**
 * 条件操作枚举
 */
export enum EOp {
  /**
   * Matches values that are equal to a specified value.
   * @alias ==
   */
  eq = '$eq',
  /**
   * Matches values that are greater than a specified value.
   * @alias >
   */
  gt = '$gt',
  /**
   * Matches values that are greater than or equal to a specified value.
   * @alias >=
   */
  gte = '$gte',
  /**
   * Matches values that are less than a specified value.
   * @alias <
   */
  lt = '$lt',
  /**
   * Matches values that are less than or equal to a specified value.
   * @alias <=
   */
  lte = '$lte',
  /**
   * Matches all values that are not equal to a specified value.
   * @alias !=
   */
  ne = '$ne',
  /**
   * Matches any of the values specified in an array.
   * @alias in
   * @type array
   */
  in = '$in',
  /**
   * Matches none of the values specified in an array.
   * @alias not in
   * @type array
   */
  nin = '$nin',
  /**
   * Matches documents that have the specified field.
   * @type boolean
   */
  exists = '$exists',
  /**
   * Selects documents if a field is of the specified type.
   * @type EType
   */
  type = '$type'
  // TODO
}

/**
 * 条件
 */
export class Cond {
  /**
   * 或操作
   */
  public static or(...Conds: Cond[]) {
    const res = [];
    Conds.map((o: Cond) => {
      res.push(o.toObject());
    });
    return new Cond({ $or: res });
  }
  private conds: object[];

  constructor(obj?: object) {
    this.conds = obj ? [obj] : [];
  }

  /**
   * 添加条件
   * @param key 键
   * @param op 操作
   * @param value 值
   */
  public add(key: string, op: EOp, value: any) {
    const o = {};
    const o1 = {};
    o1[op] = value;
    o[key] = o1;
    this.conds.push(o);
    return this;
  }

  /**
   * 输出对象
   */
  public toObject() {
    return { $and: this.conds };
  }
}
