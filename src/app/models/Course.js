const mongoose = require("mongoose");
const slugify = require("slugify");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;
const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
// Tự động tạo slug trước khi lưu
Course.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Course", Course);
