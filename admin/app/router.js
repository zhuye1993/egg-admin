"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;

  const baseRouter = app.config.baseRouter; // /api/v1
  router.get("/hello", jwt, controller.home.index);
  router.post(baseRouter + "/register", controller.user.register);
  router.post(baseRouter + "/update", controller.user.update);
  router.post(baseRouter + "/delete", controller.user.delete);
  router.post(baseRouter + "/login", controller.user.login);

  // 标签
  router.resources("tags", baseRouter + "/tags", jwt, controller.tags);
};
