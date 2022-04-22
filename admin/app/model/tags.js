module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TagsSchema = new Schema(
    {
      name: {
        type: String,
        min: 2,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
      createTime: {
        type: Date,
        default: Date.now(),
      },
      updateTime: {
        type: Date,
        default: Date.now(),
      },
      avatar: {
        type: String,
      },
      articleNum: {
        type: "number",
        default: 0,
      },
      status: {
        type: "boolean",
        default: true,
      },
    },
    { versionKey: false }
  );
  return mongoose.model("Tags", TagsSchema, "tags");
  // Tags是指定查找的入口，TagsSchema是参数；tags是你数据集合表的名称
};
