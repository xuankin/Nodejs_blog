const mongoose = require("mongoose");
const slugify = require("slugify");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
// Tự động tạo slug trước khi lưu
CourseSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
CourseSchema.plugin(AutoIncrement);

// custom query helpers
CourseSchema.query.sortable = function (req) {
  if ("_sort" in req.query) {
    const isValidType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : "desc",
    });
  } else return this;
};
module.exports = mongoose.model("Course", CourseSchema);
