const Course = require("../models/Course");

class CourseController {
  //[GET]/search
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }
  //[GET]/courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  //[POST]/courses/store
  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDGzeson_3R5LD5tdzOOJrSCLptew`;
      const course = new Course(formData);
      await course.save();
      res.redirect("/me/stored/courses");
    } catch (err) {
      console.error(err);
    }
  }
  //[GET]/courses/:id/edit
  edit(req, res, next) {
    Course.findOne({ _id: req.params.id })
      .lean()
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch(next);
  }
  //[PUT]/course/:id
  async update(req, res, next) {
    try {
      await Course.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/me/stored/courses");
    } catch (err) {
      next(err);
    }
  }
  //[DELETE] /course/:id
  async destroy(req, res, next) {
    try {
      await Course.delete({ _id: req.params.id });
      res.redirect("/me/stored/courses");
    } catch (err) {
      next(err);
    }
  }
  //[DELETE] /course/:id/force
  async forceDestroy(req, res, next) {
    try {
      await Course.deleteOne({ _id: req.params.id });
      res.redirect("/me/trash/courses");
    } catch (err) {
      next(err);
    }
  }

  //[PATCH] /course/:id/restore\
  async restore(req, res, next) {
    try {
      await Course.restore({ _id: req.params.id });
      res.redirect("/me/trash/courses");
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new CourseController();
