"use strict";

const { app, assert } = require("egg-mock/bootstrap");

describe("test/app/controller/test.test.js", () => {
  it("should GET /", () => {
    return app.httpRequest().get("/test").expect("test").expect(200);
  });
});
