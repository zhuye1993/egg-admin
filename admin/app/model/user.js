module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema(
    {
      // _id: {
      //   type: Schema.ObjectId,
      //   ref: "Tags",
      //   required: true,
      // },
      // user_id: {
      //   type: String,
      //   unique: true,
      // },
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      name: {
        type: String,
        required: true,
      },
    },
    { versionKey: false }
  );
  return mongoose.model("User", UserSchema, "user");
  // User是指定查找的入口，随便取；UserSchema是参数；user是你数据集合表的名称
};
