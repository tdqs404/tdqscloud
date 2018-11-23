/*
 * @Author: gzq
 * @Date: 2018-11-23 10:12:36
 * @Last Modified by: gzq
 * @Last Modified time: 2018-11-23 16:35:16
 */

import { IRequest } from './request';
import { setHeader } from './tdqs';
import { Cond } from './where';
/**
 * 字段模式
 */
export enum EFieldMode {
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
  private className: string;
  private fields: string[];
  private fieldMode: EFieldMode;
  private limit: number;
  private skip: number;
  private cond: object;

  constructor(className: string) {
    this.className = className;
  }

  /**
   * 查询
   * todo 加密
   */
  public get(): IRequest {
    return {
      options: {
        headers: setHeader(),
        params: { query: this.toJson() }
      }
    };
  }

  /**
   * 设置查询字段（仅最后一次有效）
   * @param fields 字段数组
   * @param mode  模式
   */
  public field(fields: string[], mode: EFieldMode) {
    this.fields = fields;
    this.fieldMode = mode;
    return this;
  }

  /**
   * 设置条件（仅最后一次有效）
   * @param cond
   */
  public where(cond: Cond) {
    this.cond = cond.toObject();
    return this;
  }

  /**
   * 格式化输出
   */
  public toJson() {
    return JSON.stringify(this);
  }

  /**
   * 分页
   * @param offset 偏移
   * @param limit 限制
   */
  public ol(offset: number, limit: number) {
    this.skip = offset;
    this.limit = limit;
    return this;
  }
}
