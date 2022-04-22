"use strict";

const { app, assert } = require("egg-mock/bootstrap");

describe("test/app/controller/home.test.js", () => {
  it("should assert", () => {
    const pkg = require("../../../package.json");
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it("should GET /", () => {
    return app
      .httpRequest()
      .get("/")
      .expect(
        '<h2>傻子把。。。</h2><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091207%2Fsp1mf5mygu5sp1mf5mygu5.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652681531&t=d5efe63b3927fba8132c8e96ab81ed46" />'
      )
      .expect(200);
  });
});
