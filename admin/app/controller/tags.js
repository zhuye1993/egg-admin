"use strict";

const Controller = require("egg").Controller;
class TagsController extends Controller {
  get createRule() {
    return {
      name: {
        type: "string",
        min: 2,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
  }
  // 条件查询
  async index() {
    const { ctx } = this;
    const { pageSize = 10, page = 1, name = "" } = ctx.query || {};
    const res = await ctx.service.tags.index({ page, pageSize, name });
    if (res.code === 500) {
      return ctx.helper.error(res);
    }
    ctx.helper.success({ res });
  }

  // /tags/:id 查询
  async show() {
    const { ctx } = this;
    const { pageSize = 10, page = 1, name = "" } = ctx.query || {};
    const res = await ctx.service.tags.index({ page, pageSize, name });
    if (res.code === 500) {
      return ctx.helper.error(res);
    }
    ctx.helper.success({ res });
  }

  async hasTag() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    let tag = await ctx.service.tags.find({ name: ctx.request.body.name });
    if (tag.length) {
      ctx.helper.success({ msg: "该标签已存在" });
      return true;
    }
    return false;
  }

  // 创建
  async create() {
    const { ctx } = this;
    if (await this.hasTag()) return;
    let res = await ctx.service.tags.create(ctx.request.body);
    if (res.code === 500) {
      return ctx.helper.error(res);
    }
    ctx.helper.success({ res });
  }

  // 	/tags/:id 更新
  async update() {
    const { ctx } = this;
    if (await this.hasTag()) return;
    let res = await ctx.service.tags.update({
      ...ctx.request.body,
      updateTime: Date.now(),
      _id: ctx.params.id,
    });
    if (res.code === 500) {
      return ctx.helper.error(res);
    }
    ctx.helper.success({ res });
  }

  // 销毁
  async destroy() {
    const { ctx } = this;
    const res = await ctx.service.tags.destroy(ctx.params);
    if (res.code === 500) {
      return ctx.helper.error(res);
    }
    ctx.helper.success({ res });
  }
}

module.exports = TagsController;
