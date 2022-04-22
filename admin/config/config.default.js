/* eslint valid-jsdoc: "off" */

"use strict";
const userConfig = require("./config.user");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1650088885763_3971";

  // add your middleware config here
  config.middleware = ["errorHandler"];

  // CSRF
  config.security = {
    csrf: {
      enable: false,
    },
  };

  exports.validate = {
    // convert: false,
    // validateRoot: false,
  };

  config.jwt = {
    secret: userConfig.userName,
  };

  // 连接数据数据库
  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/test", // test为数据库的名称
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // add your user config here
  // const userConfig = {
  // myAppName: 'egg',
  // };

  return {
    ...config,
    ...userConfig,
  };
};
