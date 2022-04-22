"use strict";

const Controller = require("egg").Controller;
const gravatar = require("gravatar");
const utility = require("utility");
class UserController extends Controller {
  // 规则
  get createRule() {
    return {
      username: {
        type: "string",
        min: 5,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
      },
      password: {
        type: "password",
        // compare: "re-password",
        min: 6,
        max: 20,
        format: /^[A-Za-z0-9_]{6,20}$/,
      },
    };
  }
  async register() {
    const { ctx } = this;
    const body = Object.assign({}, ctx.request.body);
    let user = await ctx.service.user.find(body);
    ctx.validate(this.createRule);
    if (user && user.email) {
      ctx.helper.success({ msg: "邮箱已被注册" });
      return;
    }
    body.password = utility.md5(body.password);
    body.avatar = gravatar.url(body.email, { s: "200", r: "pg", d: "mm" });
    const res = await ctx.service.user.create(body);
    ctx.body = res;
  }

  async update() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const res = await ctx.service.user.update(ctx.request.body);
    ctx.body = res;
  }

  async delete() {
    const { ctx } = this;
    const res = await ctx.service.user.delete(ctx.request.body);
    ctx.body = res;
  }

  async login() {
    const { ctx, app } = this;
    const body = Object.assign({}, ctx.request.body);
    ctx.validate(this.createRule);
    let user = await ctx.service.user.find(body);
    if (user && user.password === utility.md5(body.password)) {
      const token = app.jwt.sign(
        { username: body.username },
        app.config.jwt.secret,
        {
          expiresIn: "1h",
        }
      );
      ctx.helper.success({
        msg: "登录成功",
        data: { token, username: body.username },
      });
      return;
    }
    ctx.helper.success({ msg: "邮箱或密码错误" });
  }
}

module.exports = UserController;
