/*
 * @Author: gzq
 * @Date: 2018-11-23 10:12:36
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 11:02:35
 */

/**
 * 字段模式
 */
export enum fieldMode {
  /**
   * 不包含
   */
  exclusion,
  /**
   * 包含
   */
  inclusion
}

/**
 * 基础查询
 */
export class Query {
  className: string;
  fields: string[];
  fieldMode: fieldMode;

  constructor(className: string) {
    this.className = className;
  }

  /**
   * 设置查询字段（仅最后一次有效）
   * @param fields 字段数组
   * @param mode  模式
   */
  public field(fields: string[], mode: fieldMode) {
    this.fields = fields;
    this.fieldMode = mode;
    return this;
  }
}
