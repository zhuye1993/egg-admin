"use strict";
const Service = require("egg").Service;
class TagsService extends Service {
  async index(params = {}) {
    const { ctx } = this;
    try {
      const page = params.page * 1;
      const pageSize = params.pageSize * 1;
      const queryCon = params.name
        ? {
            name: {
              $regex: new RegExp(params.name, "i"),
            },
          }
        : {};
      const totalCount = await ctx.model.Tags.find(queryCon).countDocuments();
      const results = await ctx.model.Tags.find(queryCon)
        .sort({
          updateTime: -1,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        data: {
          page,
          pageSize,
          totalCount,
          list: results,
        },
      };
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error),
      };
    }
  }

  async find(params = {}) {
    try {
      const { ctx } = this;
      const results = await ctx.model.Tags.find(params);
      return results;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error),
      };
    }
  }

  async create(params) {
    try {
      const { ctx } = this;
      const results = await ctx.model.Tags.create(Object.assign({}, params));
      return results;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error),
      };
    }
  }

  async update(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Tags.updateOne(
        {
          _id: params._id,
        },
        Object.assign({}, params)
      );
      return results;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error),
      };
    }
  }

  async destroy(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Tags.deleteOne({
        _id: params.id,
      });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
}
module.exports = TagsService;
