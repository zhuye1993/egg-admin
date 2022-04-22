module.exports = {
  _callService() {
    const { ctx } = this;
    ctx.body = 123;
    // return "123";
  },
  success(res = null) {
    const { ctx } = this;
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0代表成功，其他代表失败
      msg: res.msg ? res.msg : "请求成功",
    };
  },
  error(res) {
    const { ctx } = this;
    ctx.status = 500;
    ctx.body = {
      ...res,
      data: null,
    };
  },
};
