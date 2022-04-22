module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);
      let status = err.status || 500;
      if (err.message === "No authorization token was found") {
        status = 401;
      }
      // 生产环境时 500错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
    // 发生错误时 捕获异常
  };
};
