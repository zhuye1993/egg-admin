"use strict";
const Service = require("egg").Service;
class UserService extends Service {
  async find(params) {
    // app.mongoose.Types.ObjectId('5da034149b6e823ca2ea809d')
    const { ctx } = this;
    try {
      console.log(params, "params");
      const results = await ctx.model.User.findOne({ email: params.email });

      return results;
    } catch (err) {
      console.log(err, "err");
      ctx.body = JSON.stringify(err);
    }
  }

  async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User(Object.assign({}, params)).save();
      return results;
    } catch (err) {
      ctx.body = JSON.stringify(err);
    }
  }

  async update(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.updateOne(
        {
          _id: ctx.app.mongoose.Types.ObjectId(params._id),
        },
        Object.assign({}, params)
      );
      return results;
    } catch (err) {
      ctx.body = JSON.stringify(err);
    }
  }

  async delete(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.deleteOne({
        // _id: ctx.app.mongoose.Types.ObjectId(params._id),
        _id: params._id,
      });
      return results;
    } catch (err) {
      console.log(err, "eeeaasa");
      ctx.body = JSON.stringify(err);
    }
  }
}
module.exports = UserService;
